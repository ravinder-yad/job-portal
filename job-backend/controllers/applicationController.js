const Application = require("../models/Application");
const Job = require("../models/Job");
const SavedJob = require("../models/SavedJob");
const User = require("../models/User");
const { createAdminNotification } = require("./notificationController");

// ✅ APPLY FOR A JOB
const applyJob = async (req, res) => {
  try {
    const { jobId, fullName, email, phone, resume, coverLetter } = req.body;
    
    // Check if already applied
    const existing = await Application.findOne({ job: jobId, applicant: req.user.id });
    if (existing) return res.status(400).json({ message: "Already applied for this job" });

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      fullName: fullName || req.user.name,
      email: email || req.user.email,
      phone: phone || "",
      resume: resume || "",
      coverLetter: coverLetter || "",
      status: "Applied"
    });

    // Notify Admin
    const job = await Job.findById(jobId);
    await createAdminNotification({
      content: `New application for ${job?.title || 'a job'} by ${fullName || req.user.name}`,
      type: "job",
      link: "/admin/applications"
    });

    res.status(201).json({ message: "Applied successfully", application });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ message: "Error applying for job" });
  }
};

// ✅ GET USER APPLICATIONS (For Applicants)
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate({
        path: "job",
        populate: { path: "company", select: "name logo location" }
      })
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// ✅ ADMIN: GET ALL APPLICATIONS
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job")
      .populate("applicant", "name email profileImage phone")
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all applications" });
  }
};

// ✅ ADMIN: UPDATE APPLICATION STATUS
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: "Status updated", application });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};

// ✅ ADMIN: GET USER FULL ACTIVITY (Investigative View)
const getAdminUserStats = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const appliedJobs = await Application.find({ applicant: userId }).populate("job");
    const savedJobs = await SavedJob.find({ user: userId }).populate("job");

    res.json({
      user,
      appliedCount: appliedJobs.length,
      savedCount: savedJobs.length,
      applications: appliedJobs,
      saved: savedJobs
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user activity" });
  }
};

const getUserStats = async (req, res) => {
  try {
    const appliedCount = await Application.countDocuments({ applicant: req.user.id });
    const savedCount = await SavedJob.countDocuments({ user: req.user.id });
    res.json({ appliedCount, savedCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

module.exports = { 
  applyJob, 
  getUserApplications, 
  getAllApplications,
  updateApplicationStatus,
  getAdminUserStats,
  getUserStats 
};
