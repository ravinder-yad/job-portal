const express = require("express");
const router = express.Router();
const { 
  applyJob, 
  getUserApplications, 
  getUserStats, 
  getAllApplications, 
  updateApplicationStatus, 
  getAdminUserStats 
} = require("../controllers/applicationController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// All routes require login
router.use(protect);

// 👤 User Routes
router.post("/apply", applyJob);
router.get("/user", getUserApplications);
router.get("/stats", getUserStats);

// 👑 Admin Routes
router.get("/admin/all", isAdmin, getAllApplications);
router.put("/admin/status/:id", isAdmin, updateApplicationStatus);
router.get("/admin/user-stats/:userId", isAdmin, getAdminUserStats);

module.exports = router;
