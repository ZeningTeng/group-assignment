require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const CLIENT_URL = process.env.CLIENT_URL;

const stripe = Stripe(STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { items, email } = req.body;

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // 美分為單位
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer_email: email, // ✅ this sets the email
    success_url: CLIENT_URL + "/success",
    cancel_url: CLIENT_URL + "/cancel",
  });

  res.json({ id: session.id });
});

module.exports = router;
