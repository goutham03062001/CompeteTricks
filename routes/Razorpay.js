const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Auth = require("../models/Auth");
const AuthController = require("../controllers/AuthController");
const AuthorizedUsers = require("../models/AuthorizedUsers");
const Email = require("./Mail");

var instance = new Razorpay({ key_id: process.env.RAZORPAY_ID, key_secret: process.env.RAZORPAY_SECRET });
const generateUniqueToken = (userId) => {
  // Your secret key (keep it secure, and do not expose it)
  const secretKey = 'your_secret_key';

  // User-specific information (you can customize this based on your needs)
  const userInfo = {
    userId,
    timestamp: Date.now(),
  };

  // Create a unique token using HMAC (Hash-based Message Authentication Code)
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(JSON.stringify(userInfo));
  const token = hmac.digest('hex');

  return token;
};
router.post("/makeNewPayment",async(req,res)=>{
    try {
        instance.orders.create({
            "amount": 50000,
            "currency": "INR",
            "receipt": "receipt#1",
            "partial_payment": false,
            "notes": {
              "key1": "value3",
              "key2": "value2"
            }
          }).then((data)=>{return res.send(data)}).catch((err)=>{return res.send(err)})
        
    } catch (error) {
        return res.send("Error Occurred!"+error.message)
    }
})

router.put("/getData",async(req,res)=>{
  try {
    const {paymentId,userEmail,userMobile,userName,userId,successData} = req.body;
    const isExistedUser = AuthController.getCurrentPersonDetails(userId);
    if(isExistedUser._id){
      console.log("user id - ",userId);
      console.log("Payment Id - ",paymentId);
      console.log("successData - ");
      console.log("order Id",successData.razorpay_order_id);
      console.log("payment Id",successData.razorpay_payment_id);
      const payload = successData.razorpay_order_id + '|' + successData.razorpay_payment_id;
      // const generated_signature = hmac_sha256(successData.razorpay_order_id + "|" + successData.razorpay_payment_id, process.env.RAZORPAY_SECRET);
  
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
      hmac.update(payload);
      const generated_signature = hmac.digest('hex');
      
      // console.log('Generated Signature:',generated_signature);
  
      if(generated_signature === successData.razorpay_signature){
        isExistedUser.isAuthenticated = true;
        const uniqueToken = generateUniqueToken(userId);
        isExistedUser.uniqueToken = uniqueToken;
        await isExistedUser.save();
        console.log("Current Person Status - ",isExistedUser.isAuthenticated);

        const currentDate = new Date();
        const expireDate = new Date(currentDate);
        expireDate.setFullYear(currentDate.getFullYear() + 1);
        const newAuthorizedUser = new AuthorizedUsers({userId : userId,createdAt : currentDate,validUpto:expireDate});
        await newAuthorizedUser.save();
        Email.sendEmail(userEmail,1000,successData.razorpay_payment_id,userName,uniqueToken)
        return res.send("Payment Successful");
       
      }else{
        return res.send("Payment Unsuccessful")
      }
    }
  
  } catch (error) {
    return res.send("Error Occurred!"+error.message)
    
  }
})

module.exports = router;