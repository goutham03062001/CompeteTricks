const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const QuizController = require("../controllers/QuizController")
router.post("/uploadQuiz",upload.single("file"),QuizController.upload);
router.post("/modelPaper/uploadModelPaper",upload.single("file"),QuizController.uploadModelPapers)
router.put("/updateAttempts/user/:userId/quiz/:quizId",QuizController.updateQuizAttempt);
router.get("/getQuizDetails",QuizController.getAllQuiz);
router.get("/modelPaper/getAllModelPapers",QuizController.getAllModelPapers);
router.get("/modelPaper/getAllModelPapers/:ModelPaperId",QuizController.getModelPaperById);
router.get("/getQuizDetails/:quizId",QuizController.getQuizDetailsById);
router.delete("/removeQuiz/:quizId",QuizController.removeQuizById);
router.delete("/modelPaper/removeModelPaper/:ModelPaperId",QuizController.deleteModelPaperById);
module.exports = router;    