const express = require("express")
const {loginHandler} = require("../controlers/authRouter.js")




const router = express.Router()





router.post("/login",loginHandler)

module.exports = router