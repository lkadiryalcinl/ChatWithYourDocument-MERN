const multer = require("multer");

// Multer storage yapılandırması (Memory Storage)
const storage = multer.memoryStorage();

// Multer dosya yükleme ayarları (PDF ve 1MB limit)
const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 }, // 50MB sınır
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      const error = new Error("Sadece PDF dosyaları yüklenebilir!");
      error.code = "INVALID_FILE_TYPE";
      return cb(error, false);
    }
    cb(null, true);
  },
});

// Multer hata yönetim middleware'i
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.code) {
    let message;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "Dosya boyutu maksimum 50MB olabilir!";
        break;
      case "INVALID_FILE_TYPE":
        message = "Sadece PDF dosyaları kabul edilmektedir!";
        break;
      default:
        message = err.message || "Dosya yüklenirken bir hata oluştu!";
    }

    return res.status(400).json({ success: false, message });
  }

  next();
};

module.exports = { upload, multerErrorHandler };
