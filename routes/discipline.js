const express = require("express");
const router = express.Router();

const disciplineController = require("../controllers/discipline.controller");

router.post("/", disciplineController.disciplineCreate);
router.get("/", disciplineController.disciplineList);
router.get("/:id", disciplineController.disciplineDetail);
router.put("/:id", disciplineController.disciplineUpdate);
router.delete("/:id", disciplineController.disciplineDelete);
router.get("/:id/courses", disciplineController.courseListByDiscipline);
router.get("/:id/students", disciplineController.studentListByDiscipline);
router.get("/:id/teachers", disciplineController.teacherListByDiscipline);

module.exports = router;
