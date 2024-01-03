const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://gouthamp0306:"+process.env.MONGODB_PASS+"@cluster0.eqm6bjv.mongodb.net/").then((data)=>{console.log("Connected to Database")}).catch((err)=>{
    console.log("Connection Error while Connecting to db"+err.message);
});