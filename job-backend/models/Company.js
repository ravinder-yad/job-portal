const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        logo: {
            type: String,
            default: "",
        },

        website: {
            type: String,
            default: "",
        },

        location: {
            type: String,
            required: true,
        },

        industry: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        size: {
            type: String, // 1-10, 10-50, etc
        },

        foundedYear: {
            type: Number,
        },

        // ⭐ Rating system
        rating: {
            type: Number,
            default: 0,
        },

        totalReviews: {
            type: Number,
            default: 0,
        },

        // 👤 Owner (Recruiter)
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // ❤️ Followers
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // 💼 Jobs
        jobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Company", companySchema);