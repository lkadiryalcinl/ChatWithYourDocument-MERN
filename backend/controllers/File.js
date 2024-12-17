const fs = require("fs");
const { processFile } = require("../utils/FileReader")
const File = require("../models/File");


exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user._id;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { content } = await processFile(file);

    const newFile = new File({
      docName: file.originalname,
      content,
      uploadedBy: userId,
    });

    await newFile.save();
    fs.unlinkSync(file.path);

    res.status(201).json(newFile);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to process file", error: error.message });
  }
};


exports.uploadMultipleFiles = async (req, res) => {
  try {
    const files = req.files;
    const userId = req.user._id;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const { content } = await processFile(file);

    const newFile = new File({
      docName: file.originalname,
      content,
      uploadedBy: userId,
    });

      await newFile.save();
      uploadedFiles.push(newFile);

      fs.unlinkSync(file.path);
    }

    res.status(201).json(uploadedFiles);
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    res.status(500).json({ message: "Failed to process files", error: error.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find().populate("uploadedBy", "name email");
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Failed to fetch files", error: error.message });
  }
};

exports.getFileById = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId).populate("uploadedBy", "name email");

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    res.status(500).json({ message: "Failed to fetch file", error: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    await File.deleteOne({ _id: fileId });
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Failed to delete file", error: error.message });
  }
};