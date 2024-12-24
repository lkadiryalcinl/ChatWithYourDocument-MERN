const Lecture = require("../models/Lecture");

const lectures = [
  {
    _id: "65b8e564ea5ce114184ccb99",
    name: "Advanced Algorithms",
    instructor: "65b8e564ea5ce114184ccb97",
    students: ["65b8e564ea5ce114184ccb98"],
  },
  {
    _id: "65b8e564ea5ce114184ccb9a",
    name: "Database Management",
    instructor: "65b8e564ea5ce114184ccb97",
    students: ["65b8e564ea5ce114184ccb98"],
  },
];

exports.seedLectures = async () => {
    try {
      await Lecture.insertMany(lectures);
      console.log("Lectures seeded successfully");
    } catch (error) {
      console.log(error);
    }
  };