const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.js");

const jwtSiginIn = (obj) => {
  const token = jwt.sign(obj, "tokenforbiryaniandsamosawithinhundread");
  return token;
};

exports.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findAll({ where: { email } });
    if (user.length == 0) {
      throw {
        status: 401,
        message: "Invalid email or password.",
      };
    }

    const savedPassword = user[0].password;
    const id = user[0].id;
    const compare = await bcrypt.compare(password, savedPassword);

    if (!compare) {
      throw {
        status: 401,
        message: "Invalid email or password.",
      };
    }

    const token = jwtSiginIn({ id });
    const data = {
      user: user[0],
      token,
    };

    res.status(200).json({
      code: 1,
      data,
      message: "you logedin successfully",
    });

    console.log("yessssssssss", user);
    return;
  } catch (error) {
    res.status(error.status || 500).json({
      code: 0,
      data: null,
      message: error.message || "SOMETHING WENT WRONG",
    });
  }
};

exports.protect = async function (req, res, next) {
  // 1)check if token is present in request or not
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log("yyyyyyyyyyyyyyyyyyyyy 75");
      token = req.headers.authorization.split(" ")[1];
      console.log(req.headers.authorization.split(" ")[1]);
    }
    console.log(token, 5555555555555555);
    if (!token) {
      throw {
        message: "you are not logged in please login to get access",
        status: 401,
      };
    }

    //  2)verificaion of token

    const decoded = await promisify(jwt.verify)(
      token,
      "tokenforbiryaniandsamosawithinhundread"
    );
    console.log(decoded, "decoded");

    //  3)  check if user still exist or not

    const currentUser = await User.findByPk(decoded.id);
    console.log("currentUser", currentUser);
    if (!currentUser) {
      console.log("user does not exist");
      throw {
        status: 401,
        message: "User Not Found",
      };
    }

    req.user = currentUser;
    console.log("passing to next middleware");
    next();
  } catch (error) {
    res.status(error.status || 500).json({
      status: "fail",
      message: error.message,
    });
    return;
  }
};
