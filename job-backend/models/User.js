const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
    // 🔥 New Profile Fields
    profileImage: { type: String, default: "" },
    resume: { type: String, default: "" },
    resumeName: { type: String, default: "" },
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    
    skills: [{ type: String }],
    
    experience: [
      {
        company: { type: String },
        role: { type: String },
        duration: { type: String }, // e.g., "Jan 2022 - Present"
        description: { type: String },
      }
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: { type: String },
    otpExpiry: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);