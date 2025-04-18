const mongoose = require("mongoose");
const productListSchema = require("./ProductList").schema; 

const ordersSchema = new mongoose.Schema({
	orderId: { type: String, required: true },
	productLists: [productListSchema],
	userEmail: { type: String, required: true },
	date: { type: String, required: true }, // e.g., "2025.05.06"
	time: { type: String, required: true }, // e.g., "09:35 AM"
	subtotal: { type: Number, required: true }, // total before shipping
	shippingFee: { type: Number, required: true },
	total: { type: Number, required: true }, // total = subtotal + shippingFee
	refundable: { type: Boolean, default: false },
});

const Orders = mongoose.model("Orders", ordersSchema);