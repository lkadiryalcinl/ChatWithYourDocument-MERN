import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      const error = new Error("Only PDF, DOCX, PPTX, and XLSX files are allowed!");
      error.code = "INVALID_FILE_TYPE";
      return cb(error, false);
    }
    cb(null, true);
  },
});

export const multerErrorHandler = (err, req, res, next) => {
  if (err) {
    let errorMessage = "An unknown error occurred.";
    let statusCode = 400;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        errorMessage = "File size cannot exceed 10MB!";
        break;
      case "INVALID_FILE_TYPE":
        errorMessage = "Only PDF, DOCX, PPTX, and XLSX files are allowed!";
        break;
      default:
        errorMessage = err.message || "An unknown error occurred.";
    }

    return res.status(statusCode).json({ success: false, message: errorMessage });
  }
  
  next();
};
