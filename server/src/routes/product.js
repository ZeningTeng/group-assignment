const express = require("express");
const Product = require("../models/Product");

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
    });

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
