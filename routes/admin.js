const express = require("express");
const router = express.Router();

const disciplineController = require("../controllers/discipline.controller");
const courseController = require("../controllers/course.controller");
const studentController = require("../controllers/student.controller");
const teacherController = require("../controllers/teacher.controller");

router.post("/disciplines", disciplineController.disciplineCreate);
router.get("/disciplines", disciplineController.disciplineList);
router.get("/disciplines/:id", disciplineController.disciplineDetail);
router.put("/disciplines/:id", disciplineController.disciplineUpdate);
router.delete("/disciplines/:id", disciplineController.disciplineDelete);
router.get("/disciplines/:id/courses", disciplineController.courseListByDiscipline);
router.get("/disciplines/:id/students", disciplineController.studentListByDiscipline);
router.get("/disciplines/:id/teachers", disciplineController.teacherListByDiscipline);

router.post("/courses", courseController.courseCreate);
router.get("/courses", courseController.courseList);
router.get("/courses/:id", courseController.courseDetail);
router.put("/courses/:id", courseController.courseUpdate);
router.delete("/courses/:id", courseController.courseDelete);

router.post("/students", studentController.studentCreate);
router.get("/students", studentController.studentList);
router.get("/students/:id", studentController.studentDetail);
router.put("/students/:id", studentController.studentUpdate);
router.delete("/students/:id", studentController.studentDelete);

router.post("/teachers", teacherController.teacherCreate);
router.get("/teachers", teacherController.teacherList);
router.get("/teachers/:id", teacherController.teacherDetail);
router.put("/teachers/:id", teacherController.teacherUpdate);
router.delete("/teachers/:id", teacherController.teacherDelete);

module.exports = router;
