const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path : "./.env"});
const port =  process.env.PORT || 5000 ;
const Connection = require("./connection/Connection");
const Auth = require("./routes/Auth");
const QuizRouter = require("./routes/QuizRouter")
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/Auth",Auth);
app.use("/api/Quiz/upload",QuizRouter);
app.listen(port,()=>{console.log("Server Running on port : "+port)})