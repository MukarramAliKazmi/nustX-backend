const Enrollment = require("../models/enrollment.model");

// Create a new enrollment
exports.enrollmentCreate = async (req, res) => {
  try {
    const { student, course, teacher } = req.body;

    if (!student || !course || !teacher) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      student,
      course,
      teacher,
    });

    // If it does, return an error message
    if (existingEnrollment) {
      return res.status(400).json({
        message: "This enrollment already exists",
      });
    }

    const enrollment = new Enrollment({
      student,
      course,
      teacher,
    });

    await enrollment.save();

    res
      .status(201)
      .json({ message: "Enrollment created successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all enrollments
exports.enrollmentList = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "name email")
      .populate("course", "title code")
      .populate("teacher", "name email");

    res
      .status(200)
      .json({ message: "Enrollments retrieved successfully", enrollments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single enrollment by id
exports.enrollmentDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findById(id)
      .populate("student", "name email")
      .populate("course", "title code")
      .populate("teacher", "name email");

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res
      .status(200)
      .json({ message: "Enrollment retrieved successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an enrollment by id
exports.enrollmentUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("student", "name email")
      .populate("course", "title code")
      .populate("teacher", "name email");

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res
      .status(200)
      .json({ message: "Enrollment updated successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an enrollment by id
exports.enrollmentDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByIdAndDelete(id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res
      .status(200)
      .json({ message: "Enrollment deleted successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all the students in a particular course by course id
exports.enrollmentStudentsByCourse = async (req, res) => {
  try {
    // Get the course id from the request params
    const { courseId } = req.params;

    // Find all the enrollments with the given course id and populate the student field
    const enrollments = await Enrollment.find({ course: courseId }).populate(
      "student",
      "name email"
    );

    // If there are no enrollments, return a not found message
    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found" });
    }

    // Map the enrollments array to get only the student objects
    const students = enrollments.map((enrollment) => enrollment.student);

    // Return a success message and the students array
    return res.status(200).json({
      message: "Students retrieved successfully",
      students: students,
    });
  } catch (error) {
    // If there is an error, return a server error message and the error details
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get all the teachers in a particular course by course id
exports.enrollmentTeachersByCourse = async (req, res) => {
  try {
    // Get the course id from the request params
    const { courseId } = req.params;

    // Find all the enrollments with the given course id and populate the teacher field
    const enrollments = await Enrollment.find({ course: courseId }).populate(
      "teacher",
      "name email"
    );

    // If there are no enrollments, return a not found message
    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found" });
    }

    // Map the enrollments array to get only the teacher objects
    const teachers = enrollments.map((enrollment) => enrollment.teacher);

    // Return a success message and the teachers array
    return res.status(200).json({
      message: "Teachers retrieved successfully",
      teachers: teachers,
    });
  } catch (error) {
    // If there is an error, return a server error message and the error details
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get all the courses taken by a particular student by student id
exports.enrollmentCoursesByStudent = async (req, res) => {
  try {
    // Get the student id from the request params
    const { studentId } = req.params;

    // Find all the enrollments with the given student id and populate the course field
    const enrollments = await Enrollment.find({ student: studentId }).populate(
      "course",
      "title code"
    );

    // If there are no enrollments, return a not found message
    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found" });
    }

    // Map the enrollments array to get only the course objects
    const courses = enrollments.map((enrollment) => enrollment.course);

    // Return a success message and the courses array
    return res.status(200).json({
      message: "Courses retrieved successfully",
      courses: courses,
    });
  } catch (error) {
    // If there is an error, return a server error message and the error details
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get all the courses taught by a particular teacher by teacher id
exports.enrollmentCoursesByTeacher = async (req, res) => {
  try {
    // Get the teacher id from the request params
    const { teacherId } = req.params;

    // Find all the enrollments with the given teacher id and populate the course field
    const enrollments = await Enrollment.find({ teacher: teacherId }).populate(
      "course",
      "title code"
    );

    // If there are no enrollments, return a not found message
    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found" });
    }

    // Map the enrollments array to get only the course objects
    const courses = enrollments.map((enrollment) => enrollment.course);

    // Return a success message and the courses array
    return res.status(200).json({
      message: "Courses retrieved successfully",
      courses: courses,
    });
  } catch (error) {
    // If there is an error, return a server error message and the error details
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
