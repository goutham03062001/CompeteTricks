const express = require("express");
const AuthModel = require("../models/Auth");
const bcrypt = require("bcryptjs")
const AuthController = {
    Signup:async (req,res)=>{
        const {name,email,password,mobile,address} = req.body;
        try {
            // return res.send("Hello From Signup !")
            const isExisted = await AuthModel.findOne({mobile});
            if(isExisted){
                return res.send("Sorry! This Mobile is already in use");
            }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await  bcrypt.hash(password,salt);
                const newUser = new AuthModel({name, email, password:hashedPassword, mobile,address});
                
                await newUser.save();
                return res.json(newUser);
            }

        } catch (error) {
            return res.send("Error Occurred !")
        }
    },

    Login:async (req,res)=>{
        const {mobile,password} = req.body;
        try {
            // return res.send("Hello From Login !")
            const isExisted = await AuthModel.findOne({mobile});
            if(isExisted){
                bcrypt.compare(password,isExisted.password,(err,success)=>{
                    if(err){
                        return res.send("Error Occurred!"+err);
                    }
                    if(success){
                        return res.json(isExisted)
                    }else{
                        return res.send("Either mobile number or password is wrong!");
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
            const {mobile,newPassword} = req.body;
            const isExisted = await AuthModel.findOne({mobile});
            if(isExisted){
                const newHashedPassword =  bcrypt.hashSync(newPassword,10);
                isExisted.password = newHashedPassword;
                await isExisted.save();
                return res.json({message:"Password Updated",isExisted});
            }else{
                return res.send("Something went wrong! we couldn't find your account");
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
    }
}

module.exports = AuthController