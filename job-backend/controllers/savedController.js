const SavedJob = require("../models/SavedJob");

// ❤️ SAVE JOB
const saveJob = async (req, res) => {
    try {
        const { job, note, priority, reminderDate } = req.body;

        if (!job) {
            return res.status(400).json({ message: "Job ID required" });
        }

        // 🔥 check duplicate
        const alreadySaved = await SavedJob.findOne({
            user: req.user.id,
            job,
        });

        if (alreadySaved) {
            return res.status(400).json({ message: "Job already saved" });
        }

        const savedJob = await SavedJob.create({
            user: req.user.id, // 🔥 FIXED
            job,
            note,
            priority,
            reminderDate,
        });

        res.status(201).json({
            message: "Job saved successfully",
            savedJob,
        });
    } catch (error) {
        console.error("Error in saveJob:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 📄 GET SAVED JOBS
const getSavedJobs = async (req, res) => {
    try {
        const savedJobs = await SavedJob.find({ user: req.user.id })
            .populate("job", "title company location salary jobType")
            .sort({ createdAt: -1 });

        res.json(savedJobs);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ❌ UNSAVE JOB (SECURE)
const unsaveJob = async (req, res) => {
    try {
        const savedJob = await SavedJob.findById(req.params.id);

        if (!savedJob) {
            return res.status(404).json({ message: "Saved job not found" });
        }

        // 🔐 owner check
        if (savedJob.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await savedJob.deleteOne();

        res.json({ message: "Job removed from saved" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    saveJob,
    getSavedJobs,
    unsaveJob,
};