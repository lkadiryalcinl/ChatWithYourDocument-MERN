const express=require('express')
const router=express.Router()
const aiController=require("../controllers/AI")
const { verifyToken } = require('../middleware/VerifyToken')

router
    .post("/generate",verifyToken,aiController.genAI)

module.exports=router