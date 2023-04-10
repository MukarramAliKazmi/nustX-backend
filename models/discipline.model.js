const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DisciplineSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    semesters: { type: Number, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
  }
);

const Discipline = mongoose.model("Discipline", DisciplineSchema);

module.exports = Discipline;
