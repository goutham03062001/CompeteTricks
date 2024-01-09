const express = require("express");

const router = express();
const Stripe = require("stripe");
const stripe = Stripe(process.env.SECRET_KEY,{
    apiVersion:"2023-10-16"
})
router.post("/create-payment-intent",async(req,res)=>{
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount : 1099,
             currency:"usd",
             automatic_payment_methods: {
                enabled: true,
              },
        });
        const clientSecret = paymentIntent.client_secret;
        return res.send(clientSecret)
    } catch (error) {
        return res.send(error)
    }
})

module.exports = router;