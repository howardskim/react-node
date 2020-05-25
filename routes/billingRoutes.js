const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin'); 
module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
       await stripe.charges.create(
          {
            amount: 500,
            currency: "usd",
            source: "tok_visa",
            description: "$5 for 5 credits",
            source: req.body.id
          }
        );
        console.log('REQ... ', req)
        req.user.credits += 5;
        const user = await req.user.save();
        console.log('user ', user)
        res.send(user);
    })
}