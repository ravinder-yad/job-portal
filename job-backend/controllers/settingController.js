const SystemSetting = require("../models/SystemSetting");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ✅ Get all settings (Global + User Profile)
const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    let system = await SystemSetting.findOne();
    
    // Create default settings if first time
    if (!system) {
      system = await SystemSetting.create({});
    }

    res.json({ user, system });
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings" });
  }
};

// ✅ Update Admin Profile
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { name }, 
      { new: true }
    ).select("-password");
    
    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// ✅ Update Security (Password)
const updateSecurity = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating security" });
  }
};

// ✅ Update System Settings
const updateSystemSettings = async (req, res) => {
  try {
    const system = await SystemSetting.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true
    });
    res.json({ message: "System settings updated", system });
  } catch (error) {
    res.status(500).json({ message: "Error updating system settings" });
  }
};

module.exports = { 
  getSettings, 
  updateProfile, 
  updateSecurity, 
  updateSystemSettings 
};
