const express = require('express');
const router = express.Router();

const { upload, multerErrorHandler } = require("../config/multer");
const fileController = require("../controllers/File");
const { verifyToken } = require('../middleware/VerifyToken');

router
  .post("/upload", verifyToken, upload.single('file'), multerErrorHandler, fileController.uploadFile)
  .post("/upload-multiple", verifyToken, upload.array('files', 10), multerErrorHandler, fileController.uploadMultipleFiles)
  
  .get("/", verifyToken, fileController.getFiles)
  .get("/:id", verifyToken, fileController.getFileById)
  .delete("/:id", verifyToken, fileController.deleteFile)

module.exports = router;
