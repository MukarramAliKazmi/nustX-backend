const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: Date, required: true },
    discipline: { type: Schema.Types.ObjectId, ref: "Discipline", required: true },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
