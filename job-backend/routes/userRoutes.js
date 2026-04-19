const express = require("express");
const router = express.Router();
const multer = require("multer");
const { 
  getProfile, 
  updateProfile, 
  uploadProfileImage, 
  uploadResume 
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// All routes are protected
router.use(protect);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/upload-image", upload.single("image"), uploadProfileImage);
router.post("/upload-resume", upload.single("resume"), uploadResume);

module.exports = router;
