const express = require("express");
const router = express.Router();
const { 
  getSettings, 
  updateProfile, 
  updateSecurity, 
  updateSystemSettings 
} = require("../controllers/settingController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// All settings routes restricted to Admin
router.use(protect, isAdmin);

router.get("/", getSettings);
router.put("/profile", updateProfile);
router.put("/security", updateSecurity);
router.put("/system", updateSystemSettings);

module.exports = router;
