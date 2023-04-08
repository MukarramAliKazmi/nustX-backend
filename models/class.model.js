const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    teacher: { type: String, required: true },
    discipline: { type: String, required: true },
    course: { type: String, required: true },
    inProgress: { type: Boolean, default: true },
    students: [
      {
        student: { type: String, required: true },
        assignmentsMarks: { type: Number },
        quizzesMarks: { type: Number },
        midtermMarks: { type: Number },
        finalMarks: { type: Number },
        grade: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
