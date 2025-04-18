const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User");

const router = express.Router();

const staticImageURL =
  "https://m.media-amazon.com/images/I/81qyWFH1lWL._AC_UY1000_.jpg";

router.post("/create", async (req, res) => {
  try {
    const {
      id,
      name,
      originalPrice,
      count,
      weight,
      material,
      description,
      imagePath,
      discountedPrice,
      suppliermail,
      type,
    } = req.body;

    const newUser = new Products({
      id,
      name,
      originalPrice,
      count,
      weight,
      material,
      description,
      imagePath,
      discountedPrice,
      suppliermail,
      type,
    });

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

app.get("/searchP", async (req, res) => {
  const { name } = req.query;
  console.log("jdioa");
  const product = await Products.findOne({ name: name });
  return res.status(200).json({ product });
});

app.get("/products", async (req, res) => {
  try {
    console.log("🔍 Fetching all products...");
    const products = await Products.find();

    const transformedProducts = products.map((product) => {
      const obj = product.toObject();
      obj.id = obj._id;
      delete obj._id;
      return obj;
    });

    return res.status(200).json({ products: transformedProducts }); // use plural for clarity
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// get all orders based on user email
app.get("/orders", async (req, res) => {
  const email = req.query.email;
  console.warn("get orders");
  const orders = await Orders.find({ userEmail: email });
  return res.status(200).json(orders);
});

// add a new order based on user email into order history
app.post("/create/order", async (req, res) => {
  try {
    const {
      productLists,
      userEmail,
      date,
      time,
      refundable,
      shippingFee,
      subtotal,
      total,
      orderId,
    } = req.body;

    // Basic validation
    if (
      !userEmail ||
      !productLists ||
      !Array.isArray(productLists) ||
      productLists.length === 0 ||
      !orderId
    ) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const newOrder = new Orders({
      productLists,
      userEmail,
      date,
      time,
      refundable,
      shippingFee,
      subtotal,
      total,
      orderId,
    });

    await newOrder.save();

    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// update refundable in past order based on user email
app.put("/update/refund", async (req, res) => {
  try {
    const { email, orderId, refundable } = req.body;

    if (!email || !orderId || typeof refundable !== "boolean") {
      return res.status(400).json({
        error: "Email, orderId and valid refundable value are required",
      });
    }

    const result = await Orders.updateOne(
      { userEmail: email, orderId: orderId }, // ✅ search by both
      { $set: { refundable: refundable } } // update value
    );

    return res.status(200).json({
      message: `Refundable status updated to ${refundable}`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("❌ Error updating refundable:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/* api upload image - begin */
// Use multer storage to store image in specified folder
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); // folder for saving images (cb: callback, null: indicate no error)
  },
  filename: (req, file, cb) => {
    // Create a unique filename with a timestamp
    cb(null, file.originalname);
  },
});

// File filter to accept only JPEG, PNG, and GIF formats
const imgFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // indicate no error and accepted
  } else {
    cb(
      new Error("Invalid file format. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

// const uploadImg = multer({ imgStorage, imgFilter });
const uploadImg = multer({
  storage: imgStorage, // ✅ correct key is 'storage'
  fileFilter: imgFilter, // ✅ correct key is 'fileFilter'
});

// Endpoint: POST /user/uploadImage
app.post("/uploadImage", (req, res) => {
  console.log("receiving uploadImage");

  // Use multer to process a single file with the field name "image"
  uploadImg.single("image")(req, res, async (err) => {
    // err: capture any error from the file upload process (e.g., file validation errors).
    if (err) {
      // If file validation fails, respond with error (400)
      return res.status(400).json({ error: err.message });
    }

    // const { email } = req.body;

    // Check if the file was uploaded (should be file format, not plain text)
    if (!req.file) {
      return res.status(400).json({
        error: "Image file is required. It should be file format.",
      });
    }
    console.log("Saved image to:", req.file.path);

    try {
      // Find the user by email
      // const user = await Sample.findOne({ email });

      // Save the file path in the user's record
      // user.image = req.file.path; // req.file.path: Multer adds a file object containing file path to the request.
      // await user.save();

      res.status(201).json({
        message: "Image uploaded successfully.",
        filePath: req.file.path,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
});
module.exports = router;
