const mongoose = require("mongoose");
const File = require("../models/File");

const files = [
  {
    docName: "Document1.pdf",
    pageNum: 5,
    text: "This is the text of the first document.",
    uploadedBy: "65b8e564ea5ce114184ccb96",  // ID of a user who uploaded this document
  },
  {
    docName: "Document2.pptx",
    pageNum: 10,
    text: "This is the text of the second document.",
    uploadedBy: "65b8e564ea5ce114184ccb96",  // Use the same user or different as needed
  },
  {
    docName: "Document3.txt",
    pageNum: 3,
    text: "This is the text of the third document.",
    uploadedBy: "65b8e564ea5ce114184ccb96",  // Use the same user or different as needed
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
