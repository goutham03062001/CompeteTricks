const express = require("express");
const AuthModel = require("../models/Auth");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Authorized = require('../models/AuthorizedUsers')
const Unauth = require('../models/UnauthorizedUsers');
const UnauthorizedUsers = require("../models/UnauthorizedUsers");
// Example usage



const AuthController = {
    Signup:async (req,res)=>{
        const {name,email,password,mobile,address,deviceInfo} = req.body;
        try {
            // return res.send("Hello From Signup !")
            const isExisted = await AuthModel.findOne({mobile});
            if(isExisted){
                return res.send("Sorry! This Mobile is already in use");
            }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await  bcrypt.hash(password,salt);
                const newUser = new AuthModel({name, email, password:hashedPassword, mobile,address, deviceInfo:deviceInfo});
                
                await newUser.save();
                return res.json(newUser);
            }

        } catch (error) {
            return res.send("Error Occurred !")
        }
    },

    Login:async (req,res)=>{
        const {mobile,password,deviceInfo} = req.body;
        try {
            // return res.send("Hello From Login !")
            const isExisted = await AuthModel.findOne({mobile:mobile});
            if(isExisted){
                bcrypt.compare(password,isExisted.password,(err,success)=>{
                    if(err){
                        return res.send("Error Occurred!"+err);
                    }
                    if(success){
                        return res.json(isExisted);
                        // if(isExisted.deviceInfo.modelName === deviceInfo.modelName  && isExisted.deviceInfo.brand === deviceInfo.brand && isExisted.deviceInfo.deviceType === deviceInfo.deviceType){
                               
                        // }else{
                        //     return res.send("Permission Denied");
                        // }
            // return res.json(isExisted)
                    }else{
                        return res.send("Either mobile number or password is wrong");
                    }

                })
            }
            else{return res.send("This mobile number is not yet registered!")}
        } catch (error) {
            return res.send("Error Occurred !")
            
        }
    },
    ForgotPassword: async (req,res)=>{
        try {
            function generateOTP() {
                return Math.floor(100000 + Math.random() * 900000);
            }
           const otp = generateOTP();
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
                to: req.body.userEmail,   // Receiver address
                subject: 'Verification Email',  // Subject line
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
                        <h2>Verification OTP Email</h2>
                      </div>
              
                      <div class="content">
                        <p>Your OTP is ${otp}</p>
              
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
              
              // Send email
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error('Error:', error);
                  return res.send("Error Occurred")
                } else {
                  console.log('Email sent:', info.response);
                  return res.json({message : "OTP Sent Successfully",OTP:otp})
                }
              });
            
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },

    ResetPassword: async(req,res)=>{
        try {
            const{currentPassword,currentEmail} = req.body;
            const isExisted = await AuthModel.findOne({email : currentEmail}); 
            if(isExisted){
                //hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await  bcrypt.hash(currentPassword,salt); 
                const updatedUser = await AuthModel.findOneAndUpdate(
                    { email : currentEmail }, // Filter criteria: find user by Email
                    { $set: { password: hashedPassword } }, // Update the password field
                    { new: true } // Return the updated document
                );
                await updatedUser.save();
                return res.send("Password has updated");
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },
    AuthenticateMyAccount : async(req,res)=>{

        try {
            // const {amount,}
            //Implement payment gateway
        } catch (error) {
            return res.send("Error Occurred !")
            
        }

    },

    removeAccount : async (req,res)=>{
        try {
            const {mobile} = req.body;
            const deletedUser = await AuthModel.findOneAndDelete({mobile});
            if(deletedUser){

                return res.json({message : "User Deleted Successfully",deletedUser});
            }else{
                return res.send("No account found with current mobile");
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },

    getAccountDetails : async(req,res)=>{
        try {
            const {id} = req.params;
            const currentPerson = await AuthModel.findById({_id : id});
            return res.send(currentPerson);
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },
    getCurrentPersonDetails : async(userId)=>{
        try {
           
            const currentPerson = await AuthModel.findById({_id : userId});
            return currentPerson;
        } catch (error) {
            const responseString = "No Account Found!";
            return responseString;
            
        }
    },
    getSubscriptionDetails : async(req,res)=>{
        try {
            const isSubscribed = await Authorized.findOne({userId:req.params.userId});
            if(isSubscribed){
                console.log("You are subscribed person");
                return res.send(isSubscribed)
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },
    getAllMobileDetails: async(req,res)=>{
        try {
            
            const deleteUsers = await AuthModel.deleteMany({isAuthenticated:false});
            // try {
            //     // const unAuthUsers = await UnauthorizedUsers.insertMany(deleteUsers) ;
            // // return res.json({message : "Un authorized users data",unAuthUsers});
            

            // } catch (error) {
            //     return res.send("Error Occurred while inserting data of unAuth Users")
            // }

            return res.json({message : "Un Auth users deleted",deleteUsers});
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },
    getAllUsers : async(req,res)=>{
        try {
            const data = await AuthModel.find();
            return res.send(data);
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },
    getRecentAttempts: async(req,res)=>{
        try {
            const currentUser = await AuthModel.findOne({_id : req.params.userId});
            if(currentUser){
                //find the quizAttempts length
                const quizAttemptsLength = currentUser.quizAttempts.length;
                const recentAttempts = currentUser.quizAttempts.slice(quizAttemptsLength-5, quizAttemptsLength);
                return res.send(recentAttempts);
            }
            else{return res.send("No user found!")}
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    }
}

module.exports = AuthController