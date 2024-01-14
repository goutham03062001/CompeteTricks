const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path : "./.env"});
const port =  process.env.PORT || 5000 ;
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe("")
const Connection = require("./connection/Connection");
const Auth = require("./routes/Auth");
const QuizRouter = require("./routes/QuizRouter");
const PaymentRouter = require("./routes/Payment");

app.use("/api/payment/webhook",express.raw({type:"*/*"}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/Auth",Auth);
app.use("/api/Quiz/upload",QuizRouter);
app.use("/api/payment",PaymentRouter);

  
app.listen(port,()=>{console.log("Server Running on port : "+port)}) 