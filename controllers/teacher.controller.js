const Teacher = require("../models/teacher.model");

// Create a new teacher
exports.teacherCreate = async (req, res) => {
  try {
    const { name, username, password, gender, dateOfBirth, discipline } =
      req.body;

    if (
      !name ||
      !username ||
      !password ||
      !gender ||
      !dateOfBirth ||
      !discipline
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const teacher = new Teacher({
      name,
      username,
      password,
      gender,
      dateOfBirth,
      discipline,
    });

    await teacher.save();

    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all teachers
exports.teacherList = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("discipline");

    res
      .status(200)
      .json({ message: "Teachers retrieved successfully", teachers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single teacher by id
exports.teacherDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id).populate("discipline");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res
      .status(200)
      .json({ message: "Teacher retrieved successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a teacher by id
exports.teacherUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a teacher by id
exports.teacherDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
