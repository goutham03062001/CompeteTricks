const express = require("express");

const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.SECRET_KEY,{
    apiVersion:"2023-10-16"
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const AuthorizedUsers = require("../models/AuthorizedUsers")


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
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const {userId} = req.body;
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    async function addAuthorizedUser(userId){
        
        const currentDate = new Date().toLocaleDateString();
        const expireDate = new Date(currentDate).toLocaleDateString();
        expireDate.setFullYear(currentDate.getFullYear() + 1);
        const newAuthorizedUser = new AuthorizedUsers({userId : userId,createdAt : currentDate,validUpto:expireDate});
        await newAuthorizedUser.save();
        return res.json({message:"You are now authorized"});
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.created':const paymentIntentCreated = event.data.object;
        console.log("Payment created");
        return res.send("Payment Intent Created");
      
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log("Payment succeed");
        //make the current user as authorized person to access the quiz and make him authorized for one year
        addAuthorizedUser(userId);
        break;
        case 'payment_intent.failed':const paymentIntentFailed = event.data.object;
        console.log("Payment Failed");
        return res.send("Error Occurred - "+paymentIntentFailed)
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
        return res.send("Error Occurred");
    }
  
    // Return a 200 res to acknowledge receipt of the event
    return res.status(200).send({ok:true})
  });
module.exports = router;