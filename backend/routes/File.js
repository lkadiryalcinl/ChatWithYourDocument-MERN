const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.join(__dirname, 'uploads'); 
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); 
//   }
// });

const upload = multer({ dest: path.join(__dirname, ".." ,'uploads') }); 

const fileController = require("../controllers/File");
const { verifyToken } = require('../middleware/VerifyToken');

router
  .post("/upload", verifyToken, upload.single('file'), fileController.uploadFile)
  .post("/upload-multiple", verifyToken, upload.array('files', 10), fileController.uploadMultipleFiles)
  
  .get("/", verifyToken, fileController.getFiles)
  .get("/:id", verifyToken, fileController.getFileById)
  .delete("/:id", verifyToken, fileController.deleteFile)

module.exports = router;
