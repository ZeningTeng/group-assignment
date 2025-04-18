const mongoose = require("mongoose");

const productListSchema = new mongoose.Schema({
	productId: { type: String, required: true },
	count: { type: Number, required: true },
	productName: { type: String, required: true },
	price: { type: Number, required: true },
});
