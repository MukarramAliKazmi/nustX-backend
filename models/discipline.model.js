const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DisciplineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    semesters: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Discipline = mongoose.model("Discipline", DisciplineSchema);

module.exports = Discipline;
