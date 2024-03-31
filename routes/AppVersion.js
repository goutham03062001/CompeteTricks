const express = require("express");
const router = express.Router();
const AppVersion = require("../models/AppVersion")


router.get("/getAppVersion",async(req,res)=>{
    try {
        const currentAppVersion = await AppVersion.find();
        return res.send(currentAppVersion)
    } catch (error) {
     return res.send("Error Occurred"+error.message)   
    }
})
module.exports = router;