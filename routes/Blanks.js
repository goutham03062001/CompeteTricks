const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const BlanksController = require("../controllers/BlanksController")
router.post("/uploadNew/:BlankPaperType",upload.single("file"),BlanksController.uploadNewBlankPaper);
router.get("/allBlanks",BlanksController.getAllBlanks);
router.get("/getBlankById/:BlankPaperId",BlanksController.getBlankById);
router.delete("/deleteBlankPaper/:BlankPaperId",BlanksController.removeBlankById)
module.exports = router;