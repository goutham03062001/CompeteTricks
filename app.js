const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path : "./.env"});
const port =  process.env.PORT || 5000 ;
const cors = require("cors");
const Stripe = require("stripe");
const nodemailer = require('nodemailer');

const Connection = require("./connection/Connection");
const Auth = require("./routes/Auth");
const QuizRouter = require("./routes/QuizRouter");
const PaymentRouter = require("./routes/Payment");
const BlanksRouter = require("./routes/Blanks");
const RazorpayRouter = require("./routes/Razorpay");
const EnglishMethod = require("./routes/EnglishMethods");
const AppVersion = require("./routes/AppVersion")
app.use("/api/payment/webhook",express.raw({type:"*/*"}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/Auth",Auth);
app.use("/api/Quiz/upload",QuizRouter);
app.use("/api/payment",PaymentRouter);
app.use("/api/blanks",BlanksRouter)
app.use("/api/razorpay",RazorpayRouter);
app.use("/api/Methods",EnglishMethod);
app.use("/api/appVersion",AppVersion);
app.get("/api/sendEmail",async(req,res)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'gouthamp0306@gmail.com',  // Your Gmail email address
              pass: process.env.GOOGLE_MAIL_PASSWORD,  // Your Gmail password or an application-specific password
            },
          });

          // Email options with HTML content
const mailOptions = {
    from: 'gouthamp0306@gmail.com',  // Sender address
    to: "gouthamkumarpolapally@gmail.com",   // Receiver address
    subject: 'Payment Successful',  // Subject line
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <!-- Include your styles here -->
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="your_logo.png" alt="Your Logo">
            <h2>Payment Successful</h2>
          </div>
  
          <div class="content">
            <p class="message">Dear Goutham,</p>
            <p class="message">We are pleased to inform you that your payment was successful.</p>
  
  
          </div>
  
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; 2024 EnglishWallah</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  
    } catch (error) {
        return res.send("Error Occurred while sending email")
    }


    
})
app.listen(port,()=>{console.log("Server Running on port : "+port)}) 