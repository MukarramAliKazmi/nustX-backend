const express = require("express");
const router = express.Router();

const disciplineController = require("../controllers/discipline.controller");
const courseController = require("../controllers/course.controller");

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

module.exports = router;
