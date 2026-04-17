const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
  {
    // 👤 User reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 💼 Job reference
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // 📌 Optional note
    note: {
      type: String,
      default: "",
    },

    // ⭐ Optional priority
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    // 🔔 Reminder date
    reminderDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // 🔥 important (savedAt automatically)
  }
);

module.exports = mongoose.model("SavedJob", savedJobSchema);