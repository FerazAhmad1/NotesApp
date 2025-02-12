const {Sequelize,DataTypes}=require("sequelize");
const mySql = require("mysql2")
const sequelize = new Sequelize("master-works","root","F@khan1995",{
    host:"localhost",
    dialect:"mysql"
});
(async()=>{
    try {
       const response = await sequelize.authenticate();
       console.log(response,"response")
    } catch (error) {
        console.log(error)
    }
})();



module.exports = sequelize