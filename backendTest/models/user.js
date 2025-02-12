const {Sequelize,DataTypes}= require("sequelize");
const sequelize = require("../sequelize.js");

const user = sequelize.define("User",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    email:DataTypes.TEXT,
    password:DataTypes.TEXT

})

module.exports = user
