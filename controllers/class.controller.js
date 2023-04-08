const Class = require("../models/class.model");

// Create a new class
exports.classCreate = async (req, res) => {
  try {
    const { teacher, discipline, course, inProgress, students } = req.body;

    if (!teacher || !discipline || !course || !inProgress || !students) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const clas = new Class({
      teacher,
      discipline,
      course,
      inProgress,
      students,
    });

    await clas.save();

    res.status(201).json({ message: "Class created successfully", clas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all classes
exports.classList = async (req, res) => {
  try {
    const classes = await Class.find();

    res.status(200).json({ message: "Classes retrieved successfully", classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single class by id
exports.classDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const clas = await Class.findById(id);

    if (!clas) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class retrieved successfully", clas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a class by id
exports.classUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const clas = await Class.findByIdAndUpdate(id, req.body, { new: true });

    if (!clas) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class updated successfully", clas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a class by id
exports.classDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const clas = await Class.findByIdAndDelete(id);

    if (!clas) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully", clas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
