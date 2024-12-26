const Lecture = require("../models/Lecture");

const lectures = [
  {
    _id: "65b8e564ea5ce114183ccb99",
    name: "Advanced Algorithms",
    instructor: "65b8e564ea5ce114184ccb98", 
    students: ["65b8e564ea5ce114184ccb99", "65b8e564ea5ce114184ccb9a"],
    files: ["65b8e564ea5ce114182ccb9b", "65b8e564ea5ce114182ccb9c"], 
  },
  {
    _id: "65b8e564ea5ce114183ccb9a",
    name: "Database Management",
    instructor: "65b8e564ea5ce114184ccb98",
    students: ["65b8e564ea5ce114184ccb99", "65b8e564ea5ce114184ccb9a"],
    files: ["65b8e564ea5ce114182ccb9d", "65b8e564ea5ce114182ccb9e"],
  },
  {
    _id: "65b8e564ea5ce114183ccb9b",
    name: "Computer Networks",
    instructor: "65b8e564ea5ce114184ccb98",
    students: ["65b8e564ea5ce114184ccb99", "65b8e564ea5ce114184ccb9b"],
    files: ["65b8e564ea5ce114182ccb9f", "65b8e564ea5ce114182ccc00"],
  },
  {
    _id: "65b8e564ea5ce114183ccb9c",
    name: "Software Engineering",
    instructor: "65b8e564ea5ce114184ccb98",
    students: ["65b8e564ea5ce114184ccb99", "65b8e564ea5ce114184ccb9b"],
    files: ["65b8e564ea5ce114182ccc01", "65b8e564ea5ce114182ccc02"],
  },
  {
    _id: "65b8e564ea5ce114183ccb9d",
    name: "Machine Learning",
    instructor: "65b8e564ea5ce114184ccb98",
    students: ["65b8e564ea5ce114184ccb99", "65b8e564ea5ce114184ccb9b"],
    files: ["65b8e564ea5ce114182ccc03", "65b8e564ea5ce114182ccc04"],
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
