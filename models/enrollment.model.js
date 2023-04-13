const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },
    grade: {
      type: String,
      enum: ["A", "B+", "B", "C+", "C", "D+", "D", "F"],
    },
    status: {
      type: String,
      enum: ["enrolled", "dropped", "completed"],
      required: true,
      default: "enrolled",
    },
  },
  {
    timestamps: true,
  }
);

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

module.exports = Enrollment;
