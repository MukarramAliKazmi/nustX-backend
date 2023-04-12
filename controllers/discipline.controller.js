const Discipline = require("../models/discipline.model");
const Course = require("../models/course.model");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");

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

    res
      .status(201)
      .json({ message: "Discipline created successfully", discipline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all disciplines
exports.disciplineList = async (req, res) => {
  try {
    const disciplines = await Discipline.find().sort("name");

    res
      .status(200)
      .json({ message: "Disciplines retrieved successfully", disciplines });
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

    res
      .status(200)
      .json({ message: "Discipline retrieved successfully", discipline });
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

    res
      .status(200)
      .json({ message: "Discipline updated successfully", discipline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a discipline by id
exports.disciplineDelete = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if there are any courses, students, or teachers that reference the discipline id
    const courseExists = await Course.exists({ discipline: id });
    const studentExists = await Student.exists({ discipline: id });
    const teacherExists = await Teacher.exists({ discipline: id });

    if (courseExists || studentExists || teacherExists) {
      return res.status(404).json({
        message:
          "Cannot remove the discipline because it is referenced by some courses, students and teachers. Please remove them first before removing the discipline.",
      });
    }

    const discipline = await Discipline.findByIdAndDelete(id);

    if (!discipline) {
      return res.status(404).json({ message: "Discipline not found" });
    }

    res
      .status(200)
      .json({ message: "Discipline deleted successfully", discipline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses by discipline id
exports.courseListByDiscipline = async (req, res) => {
  try {
    const { id } = req.params;

    const courses = await Course.find().populate("discipline");

    // Filter by the discipline id
    const filteredCourses = courses.filter(
      (course) => course.discipline.id === id
    );

    res
      .status(200)
      .json({ message: "Courses retrieved successfully", filteredCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all students by discipline id
exports.studentListByDiscipline = async (req, res) => {
  try {
    const { id } = req.params;

    const students = await Student.find().populate("discipline");

    // Filter by the discipline id
    const filteredStudents = students.filter(
      (student) => student.discipline.id === id
    );

    res
      .status(200)
      .json({ message: "Students retrieved successfully", filteredStudents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all teachers by discipline id
exports.teacherListByDiscipline = async (req, res) => {
  try {
    const { id } = req.params;

    const teachers = await Teacher.find().populate("discipline");

    // Filter by the discipline id
    const filteredTeachers = teachers.filter(
      (teacher) => teacher.discipline.id === id
    );

    res
      .status(200)
      .json({ message: "Teachers retrieved successfully", filteredTeachers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
