const express = require("express");
const router = express.Router();
const { 
    adminDashboard, 
    getAllUsers, 
    getAllJobs, 
    getAllCompanies,
    deleteUser,
    deleteJob,
    deleteCompany,
    getAnalyticsData
} = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// All routes here are protected and restricted to Admin only
router.use(protect);
router.use(isAdmin);

router.get("/dashboard", adminDashboard);
router.get("/users", getAllUsers);
router.get("/jobs", getAllJobs);
router.get("/companies", getAllCompanies);
router.get("/analytics", getAnalyticsData);

router.delete("/users/:id", deleteUser);
router.delete("/jobs/:id", deleteJob);
router.delete("/companies/:id", deleteCompany);

module.exports = router;
