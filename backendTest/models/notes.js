const {Sequelize,DataTypes}= require("sequelize");
const sequelize = require("../sequelize.js");

const notes = sequelize.define("Note", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    note: {
      type: DataTypes.STRING(200),  
      allowNull: false,  
      validate: {
        notEmpty: true,  
        len: [1, 200],  
      },
    },
  });

module.exports = notes