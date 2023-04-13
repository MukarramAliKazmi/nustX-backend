const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/enrollment.controller");

router.post("/", enrollmentController.enrollmentCreate);
router.get("/", enrollmentController.enrollmentList);
router.get("/:id", enrollmentController.enrollmentDetail);
router.put("/:id", enrollmentController.enrollmentUpdate);
router.delete("/:id", enrollmentController.enrollmentDelete);
router.get("/:courseId/students", enrollmentController.enrollmentStudentsByCourse);
router.get("/:courseId/teachers", enrollmentController.enrollmentTeachersByCourse);
router.get("/:teacherId/courses", enrollmentController.enrollmentCoursesByTeacher);
router.get("/:studentId/courses", enrollmentController.enrollmentCoursesByStudent);

module.exports = router;
