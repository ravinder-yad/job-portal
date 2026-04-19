const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const uploadDirs = ["uploads/avatars", "uploads/resumes"];
uploadDirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "uploads/avatars");
    } else if (file.fieldname === "resume") {
      cb(null, "uploads/resumes");
    } else {
      cb(null, "uploads");
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false);
    }
  } else if (file.fieldname === "resume") {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF or DOC files are allowed!"), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

module.exports = upload;
