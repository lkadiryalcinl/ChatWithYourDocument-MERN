const Lecture = require("../models/Lecture");
const File = require("../models/File");
const User = require("../models/User");

exports.createLecture = async (req, res) => {
  try {
    const { name, instructorId, studentIds, fileIds } = req.body;

    if (!name || !instructorId) {
      return res.status(400).json({ message: "Name and instructorId are required" });
    }

    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "Instructor") {
      return res.status(400).json({ message: "Invalid instructorId" });
    }

    const students = studentIds ? await User.find({ _id: { $in: studentIds }, role: "Student" }) : [];
    const files = fileIds ? await File.find({ _id: { $in: fileIds } }) : [];

    const newLecture = new Lecture({
      name,
      instructor: instructorId,
      students: students.map((s) => s._id),
      files: files.map((f) => f._id),
    });

    await newLecture.save();

    res.status(201).json(newLecture);
  } catch (error) {
    console.error("Error creating lecture:", error);
    res.status(500).json({ message: "Failed to create lecture", error: error.message });
  }
};

exports.getLectures = async (req, res) => {
  try {
    const {_id: userId, role} = req.user;

    let lectures;
    if (role === "Instructor") {
      lectures = await Lecture.find({ instructor: userId });

    } else if (role === "Student") {
      lectures = await Lecture.find({ students: userId });
    }

    res.status(200).json(lectures);
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ message: "Failed to fetch lectures", error: error.message });
  }
};

exports.getLectureById = async (req, res) => {
  try {
    const lectureId = req.params.id;

    const lecture = await Lecture.findById(lectureId)
      .populate("files", "docName content");

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json(lecture);
  } catch (error) {
    console.error("Error fetching lecture by ID:", error);
    res.status(500).json({ message: "Failed to fetch lecture", error: error.message });
  }
};

exports.updateLecture = async (req, res) => {
  try {
    const lectureId = req.params.id;
    const { name, studentIds, fileIds } = req.body;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    if (name) lecture.name = name;

    if (studentIds) {
      const students = await User.find({ _id: { $in: studentIds }, role: "Student" });
      lecture.students = students.map((s) => s._id);
    }

    if (fileIds) {
      const files = await File.find({ _id: { $in: fileIds } });
      lecture.files = files.map((f) => f._id);
    }

    await lecture.save();

    res.status(200).json(lecture);
  } catch (error) {
    console.error("Error updating lecture:", error);
    res.status(500).json({ message: "Failed to update lecture", error: error.message });
  }
};

exports.deleteLecture = async (req, res) => {
    try {
      const lectureId = req.params.id;
  
      const lecture = await Lecture.findById(lectureId);
  
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }
  
      if (lecture.instructor.toString() !== req.user._id) {
        return res.status(403).json({ message: "You are not authorized to delete this lecture" });
      }
  
      await Lecture.deleteOne({ _id: lectureId });
  
      res.status(200).json({ message: "Lecture deleted successfully" });
    } catch (error) {
      console.error("Error deleting lecture:", error);
      res.status(500).json({ message: "Failed to delete lecture", error: error.message });
    }
  };
  
