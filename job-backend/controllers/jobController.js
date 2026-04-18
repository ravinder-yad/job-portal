const Job = require("../models/Job");
const { createAdminNotification } = require("./notificationController");

// ✅ CREATE JOB
const addJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      salary,
      location,
      jobType,
      experience,
      skills,
      tags,
      deadline,
    } = req.body;

    if (!title || !description || !company || !location || !jobType) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const job = await Job.create({
      title,
      description,
      company,
      salary,
      location,
      jobType,
      experience,
      skills,
      tags,
      deadline,
      postedBy: req.user.id, // 🔥 important
    });

    res.status(201).json({ message: "Job created", job });

    // ✅ Notify Admin
    await createAdminNotification({
      content: `New job posted: ${job.title}`,
      type: "job",
      link: "/admin/jobs"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL JOBS (FILTER + SEARCH + SORT)
const getAllJobs = async (req, res) => {
  try {
    const { 
      keyword, 
      location, 
      jobType, 
      experience, 
      minSalary, 
      maxSalary, 
      skills,
      sort 
    } = req.query;

    let query = {};

    // 1. Keyword Search (using text index)
    if (keyword) {
      query.$text = { $search: keyword };
    }

    // 2. Location Filter
    if (location && location !== 'All') {
      query.location = { $regex: location, $options: "i" };
    }

    // 3. Job Type Filter
    if (jobType && jobType !== 'All') {
      query.jobType = jobType;
    }

    // 4. Experience Filter
    if (experience && experience !== 'All') {
      query.experience = experience;
    }

    // 5. Salary Range Filter
    if (minSalary || maxSalary) {
      query["salary.min"] = { $gte: Number(minSalary) || 0 };
      if (maxSalary) {
        query["salary.max"] = { $lte: Number(maxSalary) };
      }
    }

    // 6. Skills Filter
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      query.skills = { $in: skillsArray.map(s => new RegExp(s, 'i')) };
    }

    // 7. Sorting Logic
    let sortOptions = {};
    if (sort === 'salary_high') {
      sortOptions = { "salary.max": -1 };
    } else if (sort === 'salary_low') {
      sortOptions = { "salary.min": 1 };
    } else if (sort === 'relevance' && keyword) {
      sortOptions = { score: { $meta: "textScore" } };
    } else {
      sortOptions = { createdAt: -1 }; // Default: Latest
    }

    const jobs = await Job.find(query)
      .sort(sortOptions)
      .populate("postedBy", "name email");

    res.json(jobs);
  } catch (error) {
    console.error("Fetch Jobs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET SINGLE JOB
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    // 🔐 only owner or admin can update
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized. You are not the owner or an admin." });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    // 🔐 only owner or admin can delete
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized. You are not the owner or an admin." });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ SEARCH JOBS
const searchJobs = async (req, res) => {
  try {
    const { query } = req.query;

    const jobs = await Job.find({
      $text: { $search: query },
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
};