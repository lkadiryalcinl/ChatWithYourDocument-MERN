const File = require("../models/File");

const files = [
  {
    _id: "65b8e564ea5ce114184ccb9b",
    docName: "Lecture Notes",
    lecture: "65b8e564ea5ce114184ccb99",
    content: [
      { pageNum: 1, text: "Introduction to Algorithms" },
      { pageNum: 2, text: "Sorting and Searching" },
    ],
  },
  {
    _id: "65b8e564ea5ce114184ccb9c",
    docName: "Database Basics",
    lecture: "65b8e564ea5ce114184ccb9a",
    content: [
      { pageNum: 1, text: "Introduction to Databases" },
      { pageNum: 2, text: "Normalization" },
    ],
  },
];

exports.seedFiles = async () => {
  try {
    await File.insertMany(files);
    console.log("Files seeded successfully.");
  } catch (error) {
    console.error("Error seeding files:", error);
  }
};
