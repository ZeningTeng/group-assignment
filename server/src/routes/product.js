const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User");

const router = express.Router();

const staticImageURL =
  "https://m.media-amazon.com/images/I/81qyWFH1lWL._AC_UY1000_.jpg";

router.post("/create", async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      suppliermail: req.body.suppliermail,
    });

    const { suppliermail } = req.body.suppliermail;

    const existingUser = await User.findOne({ suppliermail });
    if (!existingUser) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    const productWithImage = {
      ...newProduct.toObject(),
      image: staticImageURL,
    };

    await Product.create(productWithImage);
    res.status(201).json({
      message: "Product created successfully!",
      product: productWithImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithImage = products.map((product) => ({
      ...product.toObject(),
      image: staticImageURL,
    }));

    res.status(200).json({ products: productsWithImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

router.get("/getProduct/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const supplier = await User.findOne({ email });

    if (!supplier || supplier.role !== "supplier") {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const products = await Product.find({ suppliermail: email });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while deleting the product." });
  }
});

module.exports = router;
