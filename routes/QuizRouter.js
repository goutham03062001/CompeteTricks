const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const QuizController = require("../controllers/QuizController")
router.post("/uploadQuiz",upload.single("file"),QuizController.upload);
router.put("/updateAttempts/user/:userId/quiz/:quizId",QuizController.updateQuizAttempt);
router.get("/getQuizDetails",QuizController.getAllQuiz);
router.get("/getQuizDetails/:quizId",QuizController.getQuizDetailsById);
router.delete("/removeQuiz/:quizId",QuizController.removeQuizById);
module.exports = router;    