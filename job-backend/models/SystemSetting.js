const mongoose = require("mongoose");

const systemSettingSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    allowPublicRegistration: {
      type: Boolean,
      default: true,
    },
    defaultJobStatus: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    newUserNotification: {
      type: Boolean,
      default: true,
    },
    newJobNotification: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SystemSetting", systemSettingSchema);
