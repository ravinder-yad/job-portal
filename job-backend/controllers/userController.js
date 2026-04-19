const User = require("../models/User");
const { cloudinary, isConfigured } = require("../config/cloudinary");

// ✅ Helper to calculate completion percentage
const calculateCompletion = (user) => {
  const fields = [
    user.name,
    user.profileImage,
    user.resume,
    user.phone,
    user.bio,
    user.location,
    user.skills && user.skills.length > 0,
    user.experience && user.experience.length > 0
  ];
  const completed = fields.filter(f => !!f).length;
  return Math.round((completed / fields.length) * 100);
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const completion = calculateCompletion(user);
    res.json({ ...user._doc, completion });
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, bio, phone, location, skills, experience } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (skills) user.skills = skills;
    if (experience) user.experience = experience;

    await user.save();
    
    const completion = calculateCompletion(user);
    res.json({ message: "Profile updated", user, completion });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image provided" });
    
    // Construct local URL
    const imageUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true }
    );

    const completion = calculateCompletion(user);
    res.json({ message: "Photo uploaded", profileImage: imageUrl, completion });
  } catch (error) {
    console.error("Local Upload Error:", error);
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No PDF provided" });

    // Construct local URL
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resume: resumeUrl, resumeName: req.file.originalname },
      { new: true }
    );

    const completion = calculateCompletion(user);
    res.json({ message: "Resume uploaded", resume: resumeUrl, completion });
  } catch (error) {
    console.error("Local Resume Upload Error:", error);
    res.status(500).json({ message: "Error uploading resume", error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
  uploadResume
};
