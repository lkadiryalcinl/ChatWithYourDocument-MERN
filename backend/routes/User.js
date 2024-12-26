const express=require("express")
const userController=require("../controllers/User")
const router=express.Router()
const { verifyToken } = require('../middleware/VerifyToken')

router
    .get("/getAllStudents",verifyToken, userController.getAllStudents)
    .get("/:id",userController.getById)
    .patch("/:id",userController.updateById)

module.exports=router