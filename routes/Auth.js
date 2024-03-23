const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post("/Signup",AuthController.Signup);
router.post("/Login",AuthController.Login);
router.post("/forgotPassword",AuthController.ForgotPassword);
router.post("/resetPassword",AuthController.ResetPassword);
router.delete("/deleteAccount",AuthController.removeAccount);
router.get("/currentPerson/:id",AuthController.getAccountDetails);
router.get("/getInfo/:userId",AuthController.getSubscriptionDetails)
module.exports = router;