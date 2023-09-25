const express = require("express");
const router = express();
const ExamController = require("../controllers/ExamsController");

router.post("/createNewExam", ExamController.CreateNewExam);
router.get("/getCurrentWeekExams",ExamController.CurrentWeekExams)
router.delete("/deleteExam/:examId", ExamController.DeleteExam);

module.exports = router;