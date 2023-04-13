const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");

router.post("/", teacherController.teacherCreate);
router.get("/", teacherController.teacherList);
router.get("/:id", teacherController.teacherDetail);
router.put("/:id", teacherController.teacherUpdate);
router.delete("/:id", teacherController.teacherDelete);

module.exports = router;
