const express = require("express");

const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.SECRET_KEY,{
    apiVersion:"2023-10-16"
})
router.post("/create-payment-intent",async(req,res)=>{
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount : Math.round(10*100),
             currency:"INR",
             automatic_payment_methods: {
                enabled: true,
              },
            //   payment_method_types:["card"],
              metadata:{name:"Goutham"}
        });
        const clientSecret = paymentIntent.client_secret;
        return res.json({clientSecret : clientSecret})
    } catch (error) {
        return res.send(error)
    }
})

module.exports = router;