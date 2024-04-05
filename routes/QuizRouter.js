const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const QuizController = require("../controllers/QuizController")
router.post("/uploadQuiz",upload.single("file"),QuizController.upload);
router.post("/modelPaper/uploadModelPaper/:ModelPaperType",upload.single("file"),QuizController.uploadModelPapers);
router.post("/uploadEnglishPedagogy",upload.single("file"),QuizController.uploadEnglishPedagogy);
router.post("/uploadGeneralEnglish",upload.single("file"),QuizController.uploadGeneraEnglish);
router.put("/updateAttempts/user/:userId/quiz/:quizId",QuizController.updateQuizAttempt);
router.get("/getQuizDetails",QuizController.getAllQuiz);
router.get("/modelPaper/getAllModelPapers/:ModelPaperType",QuizController.getAllModelPapersByType);
router.get("/modelPaper/getAllModelPapers",QuizController.getAllModelPapers);
router.get("/modelPaper/getAllModelPapers/id/:ModelPaperId",QuizController.getModelPaperById);
router.put("/modelPaper/updateModelPaper/id/:ModelPaperId/user/:userId",QuizController.updateModelPaperAttempt);
router.get("/getQuizDetails/:quizId",QuizController.getQuizDetailsById);
router.delete("/removeQuiz/:quizId",QuizController.removeQuizById);
router.delete("/modelPaper/removeModelPaper/:ModelPaperId",QuizController.deleteModelPaperById);
router.get("/getAllEnglishPedagogy",QuizController.getAllEnglishPedagogyPapers);
router.get("/getEnglishPedagogyPaperById/:id",QuizController.getEnglishPedagogyPaperById);
router.get("/getAllGeneralEnglishPapers",QuizController.getAllGeneralEnglishPapers);
router.get("/getGeneralEnglishPaperById/:id",QuizController.getGeneralEnglishPaperById);
router.delete("/deleteEnglishPedagogyById/:id",QuizController.deleteEnglishPedagogyById);
router.delete("/deleteGeneralEnglishPaperById/:id",QuizController.deleteGeneralEnglishPaperById)
module.exports = router;    