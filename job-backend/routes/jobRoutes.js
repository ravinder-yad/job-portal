const express = require("express");
const {
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
} = require("../controllers/jobController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// order important
router.get("/search", searchJobs);
router.get("/all", getAllJobs);
router.get("/:id", getJobById);

router.post("/add", protect, authorizeRoles('admin'), addJob);
router.put("/:id", protect, authorizeRoles('admin'), updateJob);
router.delete("/:id", protect, authorizeRoles('admin'), deleteJob);

module.exports = router;