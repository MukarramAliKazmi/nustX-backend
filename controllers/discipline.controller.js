const Discipline = require("../models/discipline.model");

// Create a new discipline
exports.disciplineCreate = async (req, res) => {
  try {
    const { name, semesters } = req.body;

    if (!name || !semesters) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const discipline = new Discipline({
      name,
      semesters,
    });

    await discipline.save();

    res.status(201).json({ message: "Discipline created successfully", discipline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all disciplines
exports.disciplineList = async (req, res) => {
  try {
    const disciplines = await Discipline.find().sort("name");

    res.status(200).json({ message: "Disciplines retrieved successfully", disciplines });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single discipline by id
exports.disciplineDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const discipline = await Discipline.findById(id);

    if (!discipline) {
      return res.status(404).json({ message: "Discipline not found" });
    }

    res.status(200).json({ message: "Discipline retrieved successfully", discipline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a discipline by id
exports.disciplineUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const discipline = await Discipline.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!discipline) {
      return res.status(404).json({ message: "Discipline not found" });
    }

    res.status(200).json({ message: "Discipline updated successfully", discipline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a discipline by id
exports.disciplineDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const discipline = await Discipline.findByIdAndDelete(id);

    if (!discipline) {
      return res.status(404).json({ message: "Discipline not found" });
    }

    res.status(200).json({ message: "Discipline deleted successfully", discipline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
