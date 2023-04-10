const Course = require("../models/course.model");
const Discipline = require("../models/discipline.model");

// Create a new course
exports.courseCreate = async (req, res) => {
  try {
    const { name, creditHours, discipline, semester, teacher, students } =
      req.body;

    if (!name || !creditHours || !discipline || !semester) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = new Course({
      name,
      creditHours,
      discipline,
      semester,
      teacher,
      students,
    });

    await course.save();

    // update the discipline document
    await Discipline.updateOne(
      { _id: discipline }, // find by ID
      { $push: { courses: course._id } } // push the new course's ID
    );

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
exports.courseList = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("discipline")
      .populate("teacher")
      .populate("students");

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

    const course = await Course.findById(id)
      .populate("discipline")
      .populate("teacher")
      .populate("students");

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

    const course = await Course.findByIdAndUpdate(id, req.body, { new: true })
      .populate("discipline")
      .populate("teacher")
      .populate("students");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // update the discipline document if the discipline field has changed
    if (req.body.discipline && req.body.discipline !== course.discipline._id) {
      // pull the old course's ID from the old discipline document
      await Discipline.updateOne(
        { _id: course.discipline._id }, // find by old discipline field
        { $pull: { courses: course._id } } // pull the old course's ID
      );
      // push the new course's ID to the new discipline document
      await Discipline.updateOne(
        { _id: req.body.discipline }, // find by new discipline field
        { $push: { courses: course._id } } // push the new course's ID
      );
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

    // update the discipline document
    await Discipline.updateOne(
      { _id: course.discipline }, // find by discipline field
      { $pull: { courses: course._id } } // pull the deleted course's ID
    );

    res.status(200).json({ message: "Course deleted successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
