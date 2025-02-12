const express = require("express");
const sequelize = require("./sequelize.js");
const notes = require("./models/notes.js");
const user = require("./models/user.js");
const authRouter = require("./routes/authroute.js");
const noteRouter = require("./routes/notes.js");
const cors = require("cors");
const app = express();

app.use(cors("*"));
app.use(express.json());

user.hasMany(notes);
notes.belongsTo(user);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", noteRouter);
//
(async () => {
  try {
    const response = await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
})();
//
app.listen(8000, () => {
  console.log("server is runninig");
});
