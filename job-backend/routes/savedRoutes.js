const express = require("express");
const router = express.Router();

const {
    saveJob,
    getSavedJobs,
    unsaveJob,
} = require("../controllers/savedController");

const { protect } = require("../middleware/authMiddleware");

// 🔥 clean routes
router.post("/", protect, saveJob);
router.get("/", protect, getSavedJobs);
router.delete("/:id", protect, unsaveJob);

module.exports = router;