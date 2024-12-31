const express = require('express');
const router = express.Router();
const lectureController = require("../controllers/Lecture")
const { verifyToken } = require('../middleware/VerifyToken');

router
  .post("/", verifyToken, lectureController.createLecture)
  .patch("/:id", verifyToken, lectureController.updateLecture)
  
  .get("/", verifyToken, lectureController.getLectures)
  .get("/:id", verifyToken, lectureController.getLectureById)
  .delete("/:id", verifyToken, lectureController.deleteLecture)

module.exports = router;
