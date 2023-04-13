const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");

router.post("/", studentController.studentCreate);
router.get("/", studentController.studentList);
router.get("/:id", studentController.studentDetail);
router.put("/:id", studentController.studentUpdate);
router.delete("/:id", studentController.studentDelete);

module.exports = router;
