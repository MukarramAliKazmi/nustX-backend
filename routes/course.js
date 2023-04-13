const express = require("express");
const router = express.Router();

const courseController = require("../controllers/course.controller");

router.post("/", courseController.courseCreate);
router.get("/", courseController.courseList);
router.get("/:id", courseController.courseDetail);
router.put("/:id", courseController.courseUpdate);
router.delete("/:id", courseController.courseDelete);

module.exports = router;
