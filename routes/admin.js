const express = require("express");
const router = express.Router();

const disciplineController = require("../controllers/discipline.controller");

router.get("/disciplines", disciplineController.disciplineList);
router.get("/disciplines/:id", disciplineController.disciplineDetail);
router.post("/disciplines", disciplineController.disciplineCreate);
router.put("/disciplines/:id", disciplineController.disciplineUpdate);
router.delete("/disciplines/:id", disciplineController.disciplineDelete);

module.exports = router;
