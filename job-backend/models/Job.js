const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    company: {
      name: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        required: true,
      },
    },

    salary: {
      min: Number,
      max: Number,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Internship"],
      required: true,
    },

    experience: {
      type: String,
      enum: ["Fresher", "1-3 years", "3-5 years", "5+ years"],
      default: "Fresher",
    },

    skills: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
      },
    ],

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    applicantsCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    deadline: {
      type: Date,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
jobSchema.index({ 
  title: 'text', 
  description: 'text', 
  "company.name": 'text',
  skills: 'text', 
  tags: 'text' 
});

module.exports = mongoose.model("Job", jobSchema);