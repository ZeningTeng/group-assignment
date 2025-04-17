const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); //🔒 使用 .env 較安全 (secret_key)

router.post("/create-checkout-session", async (req, res) => {
	const { items } = req.body;

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
		success_url: "http://localhost:3000/success",
		cancel_url: "http://localhost:3000/cancel",
	});

	res.json({ id: session.id });
});

module.exports = router;
