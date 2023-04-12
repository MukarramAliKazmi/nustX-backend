const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    creditHours: { type: Number, required: true },
    semester: { type: Number, required: true },
    discipline: { type: Schema.Types.ObjectId, ref: "Discipline", required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
