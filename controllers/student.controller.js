const Student = require("../models/student.model");

// Create a new student
exports.studentCreate = async (req, res) => {
  try {
    const { name, username, password, gender, dateOfBirth, discipline, semester, cgpa } = req.body;
    
    if ( !name || !username || !password || !gender || !dateOfBirth || !discipline || !semester || !cgpa ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const student = new Student({
      name,
      username,
      password,
      gender,
      dateOfBirth,
      discipline,
      semester,
      cgpa,
    });

    await student.save();

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all students
exports.studentList = async (req, res) => {
  try {
    const students = await Student.find();

    res
      .status(200)
      .json({ message: "Students retrieved successfully", students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by id
exports.studentDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student retrieved successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student by id
exports.studentUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a student by id
exports.studentDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
