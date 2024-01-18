const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post("/Signup",AuthController.Signup);
router.post("/Login",AuthController.Login);
router.put("/forgotPassword",AuthController.ForgotPassword);
router.delete("/deleteAccount",AuthController.removeAccount);
router.get("/currentPerson/:id",AuthController.getAccountDetails)
module.exports = router;