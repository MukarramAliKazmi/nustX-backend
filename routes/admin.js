const express = require("express");
const router = express.Router();

const disciplineController = require("../controllers/discipline.controller");
const courseController = require("../controllers/course.controller");
const studentController = require("../controllers/student.controller");
const teacherController = require("../controllers/teacher.controller");
const classController = require("../controllers/class.controller");

router.post("/disciplines", disciplineController.disciplineCreate);
router.get("/disciplines", disciplineController.disciplineList);
router.get("/disciplines/:id", disciplineController.disciplineDetail);
router.put("/disciplines/:id", disciplineController.disciplineUpdate);
router.delete("/disciplines/:id", disciplineController.disciplineDelete);

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

router.post("/classes", classController.classCreate);
router.get("/classes", classController.classList);
router.get("/classes/:id", classController.classDetail);
router.put("/classes/:id", classController.classUpdate);
router.delete("/classes/:id", classController.classDelete);

module.exports = router;
