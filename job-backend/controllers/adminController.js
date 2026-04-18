const User = require("../models/User");
const Job = require("../models/Job");
const Company = require("../models/Company");
const Application = require("../models/Application");

// 📊 ADMIN DASHBOARD STATS
const adminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalCompanies = await Company.countDocuments();
        
        // Get some growth metrics (e.g., posted in last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const newJobs = await Job.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
        const newUsers = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        res.json({
            totalUsers,
            totalJobs,
            totalCompanies,
            newJobs,
            newUsers,
            growth: "24%", // Placeholder for actual calculation
            status: "Healthy"
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
};

// 👥 GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

// 💼 GET ALL JOBS
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "name email");
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs" });
    }
};

// 🏢 GET ALL COMPANIES
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate("createdBy", "name email");
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching companies" });
    }
};

// 🔐 DELETE USER
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        
        // Prevent admin from deleting themselves
        if (user.email === "ravinderyadav092007@gmail.com") {
            return res.status(400).json({ message: "Root admin cannot be deleted" });
        }

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};

// 🔐 DELETE ANY JOB
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json({ message: "Job deleted by administrator" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting job" });
    }
};

// 🔐 DELETE ANY COMPANY
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) return res.status(404).json({ message: "Company not found" });
        res.json({ message: "Company deleted by administrator" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting company" });
    }
};

// 📊 DETAILED ANALYTICS (Charts & Trends)
const getAnalyticsData = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalCompanies = await Company.countDocuments();
        const totalApplications = await Application.countDocuments();

        // 📈 USER GROWTH Aggregation (Last 7 Days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const userGrowth = await User.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // 💼 JOB TRENDS Aggregation (Last 7 Days)
        const jobTrends = await Job.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // 🥧 APPLICATION Breakdown
        const applicationStats = await Application.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // 🕒 RECENT ACTIVITY
        const recentUsers = await User.find().select("name email createdAt").sort({ createdAt: -1 }).limit(5);
        const recentJobs = await Job.find().select("title createdAt").sort({ createdAt: -1 }).limit(5);
        const recentCompanies = await Company.find().select("name createdAt").sort({ createdAt: -1 }).limit(5);

        res.json({
            stats: { totalUsers, totalJobs, totalCompanies, totalApplications },
            charts: { userGrowth, jobTrends, applicationStats },
            recent: { recentUsers, recentJobs, recentCompanies }
        });
    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ message: "Error fetching analytics" });
    }
};

module.exports = {
    adminDashboard,
    getAnalyticsData,
    getAllUsers,
    getAllJobs,
    getAllCompanies,
    deleteUser,
    deleteJob,
    deleteCompany
};
