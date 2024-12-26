const File = require("../models/File");

const files = [
  {
    _id: "65b8e564ea5ce114182ccb9b",
    docName: "Lecture Notes",
    content: [
      { pageNum: 1, text: "Introduction to Algorithms" },
      { pageNum: 2, text: "Sorting and Searching" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccb9c",
    docName: "Database Basics",
    content: [
      { pageNum: 1, text: "Introduction to Databases" },
      { pageNum: 2, text: "Normalization" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccb9d",
    docName: "Computer Networks",
    content: [
      { pageNum: 1, text: "OSI Model Overview" },
      { pageNum: 2, text: "TCP/IP Protocol Suite" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccb9e",
    docName: "Operating Systems",
    content: [
      { pageNum: 1, text: "Process Management" },
      { pageNum: 2, text: "Memory Management" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccb9f",
    docName: "Software Engineering",
    content: [
      { pageNum: 1, text: "Software Development Life Cycle (SDLC)" },
      { pageNum: 2, text: "Agile Methodology" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccc00",
    docName: "Machine Learning Basics",
    content: [
      { pageNum: 1, text: "Introduction to Machine Learning" },
      { pageNum: 2, text: "Supervised vs Unsupervised Learning" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccc01",
    docName: "Artificial Intelligence",
    content: [
      { pageNum: 1, text: "AI Applications in Real Life" },
      { pageNum: 2, text: "Introduction to Neural Networks" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccc02",
    docName: "Cybersecurity Fundamentals",
    content: [
      { pageNum: 1, text: "Understanding Threats and Vulnerabilities" },
      { pageNum: 2, text: "Encryption Basics" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccc03",
    docName: "Data Structures",
    content: [
      { pageNum: 1, text: "Introduction to Stacks and Queues" },
      { pageNum: 2, text: "Trees and Graphs Overview" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
  },
  {
    _id: "65b8e564ea5ce114182ccc04",
    docName: "Cloud Computing",
    content: [
      { pageNum: 1, text: "Introduction to Cloud Services" },
      { pageNum: 2, text: "Types of Cloud Computing (IaaS, PaaS, SaaS)" },
    ],
    uploadedBy: "65b8e564ea5ce114184ccb98"
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
