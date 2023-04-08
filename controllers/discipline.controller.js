const Discipline = require("../models/discipline.model");

// Get all disciplines
exports.disciplineList = async (req, res, next) => {
  try {
    const disciplines = await Discipline.find().sort("name").exec();
    res.json(disciplines);
  } catch (err) {
    next(err);
  }
};

// Get a specific discipline by id
exports.disciplineDetail = async (req, res, next) => {
  try {
    const discipline = await Discipline.findById(req.params.id);
    if (!discipline)
      return res.status(404).json({ message: "Discipline not found" });
    res.json(discipline);
  } catch (err) {
    next(err);
  }
};

// Add a new discipline
exports.disciplineCreate = async (req, res, next) => {
  try {
    const discipline = new Discipline({
      name: req.body.name,
      semesters: req.body.semesters,
    });
    await discipline.save();
    res.status(201).json({ message: "Discipline created successfully" });
  } catch (err) {
    next(err);
  }
};

// Update an existing discipline by id
exports.disciplineUpdate = async (req, res, next) => {
  try {
    const discipline = new Discipline({
      name: req.body.name,
      semesters: req.body.semesters,
      _id: req.params.id,
    });
    await Discipline.findByIdAndUpdate(req.params.id, discipline, {});
    if (!discipline)
      return res.status(404).json({ message: "Discipline not found" });
    res.json({ message: "Discipline updated successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete an existing discipline by id
exports.disciplineDelete = async (req, res, next) => {
  try {
    await Discipline.findByIdAndRemove(req.params.id);
    res.json({ message: "Discipline deleted successfully" });
  } catch (err) {
    next(err);
  }
};
