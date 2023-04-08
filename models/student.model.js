const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: Date, required: true },
    discipline: { type: String, required: true },
    semester: { type: Number, required: true },
    cgpa: { type: Number, min: 0, max: 4, required: true },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
