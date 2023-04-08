const Course = require("../models/course.model");

// Create a new course
exports.courseCreate = async (req, res) => {
  try {
    const { name, creditHours, discipline, semester } = req.body;

    if (!name || !creditHours || !discipline || !semester) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = new Course({
      name,
      creditHours,
      discipline,
      semester,
    });

    await course.save();

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
exports.courseList = async (req, res) => {
  try {
    const courses = await Course.find();

    res
      .status(200)
      .json({ message: "Courses retrieved successfully", courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single course by id
exports.courseDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course retrieved successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course by id
exports.courseUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course by id
exports.courseDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
