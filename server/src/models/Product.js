const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	id: { type: String},
	name: { type: String },
	originalPrice: { type: String},
	count: { type: String},
	weight: { type: String},
	material: { type: String },
	description: { type: String },
	imagePath: { type: String },
	discountedPrice: { type: String },
  suppliermail: { type: String },
  type: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
