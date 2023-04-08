const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    creditHours: { type: Number, required: true },
    discipline: { type: String, required: true },
    semester: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
