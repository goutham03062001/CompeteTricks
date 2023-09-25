const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://CompeteTricks:CompeteTricks@cluster0.qjay0vb.mongodb.net/?retryWrites=true&w=majority").then((data)=>{console.log("Connected to Database")}).catch((err)=>{
    console.log("Connection Error while Connecting to db"+err.message);
});