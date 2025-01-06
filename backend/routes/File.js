const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 
const upload = multer(); 

const fileController = require("../controllers/File");
const { verifyToken } = require('../middleware/VerifyToken');

router
  .post("/upload", verifyToken, upload.single('file'), fileController.uploadFile)
  .post("/upload-multiple", verifyToken, upload.array('files', 10), fileController.uploadMultipleFiles)
  
  .get("/", verifyToken, fileController.getFiles)
  .get("/:id", verifyToken, fileController.getFileById)
  .delete("/:id", verifyToken, fileController.deleteFile)

module.exports = router;
