const Application = require("../models/Application");
const Job = require("../models/Job");
const { createAdminNotification } = require("./notificationController");

// ✅ APPLY FOR A JOB
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    
    // Check if already applied
    const existing = await Application.findOne({ job: jobId, applicant: req.user.id });
    if (existing) return res.status(400).json({ message: "Already applied for this job" });

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      status: "Applied"
    });

    // Notify Admin
    const job = await Job.findById(jobId);
    await createAdminNotification({
      content: `New application for ${job?.title || 'a job'}`,
      type: "job",
      link: "/admin/jobs"
    });

    res.status(201).json({ message: "Applied successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Error applying for job" });
  }
};

// ✅ GET USER APPLICATIONS
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate({
        path: "job",
        populate: { path: "postedBy", select: "name" }
      })
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// ✅ GET USER STATS (Applied, Saved Count)
// Note: Saved count will be handled by calling savedController or via aggregation here
const getUserStats = async (req, res) => {
  try {
    const appliedCount = await Application.countDocuments({ applicant: req.user.id });
    // Saved logic is in savedController, but for UI we might aggregate
    res.json({ appliedCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

module.exports = { 
  applyJob, 
  getUserApplications, 
  getUserStats 
};
