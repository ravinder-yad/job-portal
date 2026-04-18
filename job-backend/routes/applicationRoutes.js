const express = require("express");
const router = express.Router();
const { applyJob, getUserApplications, getUserStats } = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/apply", applyJob);
router.get("/user", getUserApplications);
router.get("/stats", getUserStats);

module.exports = router;
