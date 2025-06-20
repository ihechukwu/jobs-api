const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name"],
      maxlength: 40,
    },
    position: {
      type: String,
      required: [true, "please provide a position"],
      maxlength: 30,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined", "offered"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide a user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Job", JobSchema);
