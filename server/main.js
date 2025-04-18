require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const cors = require("cors");

const app = express();
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// app.use(express.static(path.join(__dirname, "../my-app/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
// });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static("images")); // make Express server expose the images folder

app.use("/assets", express.static(path.join(__dirname, "../assets")));
mongoose.connect(
	"mongodb+srv://t15998627020:6150finalproject@6150project.kikhcmw.mongodb.net/ourDataBase?retryWrites=true&w=majority&appName=6150project",
	{}
);
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	image: { type: String },
	type: { type: String },
});

const productSchema = new mongoose.Schema({
	id: { type: String },
	name: { type: String },

	originalPrice: { type: String },
	count: { type: String },
	weight: { type: String },
	material: { type: String },
	description: { type: String },
	imagePath: { type: String },
	discountedPrice: { type: String },
});
const productSchema1 = new mongoose.Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },

	originalPrice: { type: String, required: true },
	count: { type: String, required: true },
	weight: { type: String, required: true },
	material: { type: String, required: true },
	description: { type: String, required: true },
	imagePath: { type: String },
	discountedPrice: { type: String, required: true },
});

const productListSchema = new mongoose.Schema({
	productId: { type: String, required: true },
	count: { type: Number, required: true },
	productName: { type: String, required: true },
	price: { type: Number, required: true },
});

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

const User = mongoose.model("User", userSchema);
const Products = mongoose.model("Product", productSchema);
const Orders = mongoose.model("Orders", ordersSchema);

let emailRegex = /^[a-zA-Z0-9]+@northeastern\.edu$/;
let namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;

let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

// payment gateway api (stripe)
const checkoutRoutes = require("./routes/checkout");
app.use("/api", checkoutRoutes);

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Register a user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John D"
 *               email:
 *                 type: string
 *                 example: "johnD@northeastern.edu"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd1"
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation failed
 */

app.post("/createU", async (req, res) => {
	const { name, email, password, type } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({
		name,
		email,
		password: hashedPassword,
		type,
	});

	await newUser.save();
	return res.status(201).json({ message: "User created successfully." });
});

app.post("/createP", async (req, res) => {
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
	});

	await newUser.save();
	return res.status(201).json({ message: "User created successfully." });
});

// get all

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: edit a user
 *     description: Register a user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *               email:
 *                 type: string
 *                 example: "johnD@northeastern.edu"
 *               password:
 *                  type: string
 *
 *     responses:
 *       200:
 *          description: success
 *
 *
 *
 *       404:
 *         description: notfound
 *
 */
app.put("/updateU", async (req, res) => {
	const { name } = req.body;

	const user = await User.findOne({ name: name });
	if (!user) {
		return res.status(404).json({ error: "User not found." });
	}

	user.name = name;

	await user.save();
	return res.status(200).json({ message: " updated successfully." });
});
app.put("/updateP", async (req, res) => {
	const { name, originalPrice } = req.body;

	const user = await Products.findOne({ name: name });
	if (!user) {
		return res.status(404).json({ error: "User not found." });
	}

	user.name = name;
	user.originalPrice = originalPrice;

	await user.save();
	return res.status(200).json({ message: " updated successfully." });
});
app.get("/searchU", async (req, res) => {
	const { name } = req.query;

	const user = await User.findOne({ name: name });
	return res.status(200).json({ user });
});
app.get("/searchP", async (req, res) => {
	const { name } = req.query;
	console.log("jdioa");
	const product = await Products.findOne({ name: name });
	return res.status(200).json({ product });
});

// get all products
app.get("/products", async (req, res) => {
	try {
		console.log("🔍 Fetching all products...");
		const products = await Products.find();

		const transformedProducts = products.map((product) => {
			// change _id into id
			const obj = product.toObject(); // convert Mongoose doc to plain JS object
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
			new Error(
				"Invalid file format. Only JPEG, PNG, and GIF are allowed."
			),
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
/* api upload image - end */

// app.put("/user/edit", async (req, res) => {
// 	const { name } = req.body;

// 	const user = await User.findOne({ email });
// 	if (!user) {
// 		return res.status(404).json({ error: "User not found." });
// 	}

// 	if (!namePattern.test(name)) {
// 		return res.status(400).json({ error: "Validation failed." });
// 	}
// 	user.name = name;

// 	if (!passPattern.test(password)) {
// 		return res.status(400).json({ error: "Validation failed." });
// 	}
// 	user.password = await bcrypt.hash(password, 10);

// 	await user.save();
// 	return res.status(200).json({ message: "User updated successfully." });
// });
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.sendStatus(401);
	}

	jwt.verify(token, "auth", (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}

		req.userId = decoded.id;
		next();
	});
};

app.get("/profile", authenticateToken, async (req, res) => {
	const user = await User.findById(req.userId);
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	res.status(200).json({
		user,
	});
});
app.post("/Login", async (req, res) => {
	const { name, password } = req.body;

	const user = await User.findOne({ name });
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(401).json({ error: "invalid password" });
	}

	const token = jwt.sign({ id: user._id, name: user.name }, "auth", {
		expiresIn: "1h",
	});
	return res.status(200).json({
		token,
		user: {
			id: user._id,
			name: user.name,
			type: user.type,
		},
	});
});

/**

app.put("/user/edit", async (req, res) => {
	const { email, name, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({ error: "User not found." });
	}

	if (!namePattern.test(name)) {
		return res.status(400).json({ error: "Validation failed." });
	}
	user.name = name;

	if (!passPattern.test(password)) {
		return res.status(400).json({ error: "Validation failed." });
	}
	user.password = await bcrypt.hash(password, 10);

	await user.save();
	return res.status(200).json({ message: "User updated successfully." });
});
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.sendStatus(401);
	}

	jwt.verify(token, "auth", (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}

		req.userId = decoded.id;
		next();
	});
};

app.get("/profile", authenticateToken, async (req, res) => {
	const user = await User.findById(req.userId);
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	res.status(200).json({
		user,
	});
});

app.post("/Login", async (req, res) => {
	const { name, password } = req.body;

	const user = await User.findOne({ name });
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(401).json({ error: "invalid password" });
	}
});
/**

 * @swagger
 * /user/delete:
 *   delete:
 *     summary: delete a user
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *
 *               email:
 *                 type: string
 *                 example: "johnD@northeastern.edu"
 *
 *
 *     responses:
 *       200:
 *          description: success
 *
 *
 *
 *       404:
 *         description: notfound
 */

app.delete("/deleteU", async (req, res) => {
	const { name } = req.body;
	const user = await User.findOneAndDelete({ name: name });
	if (!user) {
		return res.status(404).json({ error: "User not found." });
	}
	return res.status(200).json({ message: "User deleted successfully." });
});
app.delete("/deleteP", async (req, res) => {
	const { name } = req.body;
	const user = await Products.findOneAndDelete({ name: name });
	if (!user) {
		return res.status(404).json({ error: "User not found." });
	}
	return res.status(200).json({ message: "User deleted successfully." });
});

/**

 * @swagger
 * /user/getall:
 *   get:
 *     summary: get All users
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *
 *
 *
 *     responses:
 *       200:
 *          description: success
 *
 *
 *
 *
 */
// app.get("/user/getAll", async (req, res) => {
// 	const users = await Product.find({}, { name: 1, email: 1, passoword: 1 });
// 	return res.status(200).json({ users });
// });
const storage = multer.diskStorage({
	destination: (req, file, call) => {
		call(null, "image/");
	},
	filename: (req, file, call) => {
		call(null, req.body.email + path.extname(file.originalname));
	},
});
app.get("/search", async (req, res) => {
	const { name } = req.query;
	console.log(name + " dwiadjoawjdwiao");

	const products = await Products.find({ name: new RegExp(name, "i") });

	return res.status(200).json({ products });
});

const fileFilter = (req, file, call) => {
	const correct = /jpeg|jpg|png|gif/;
	const extname = correct.test(path.extname(file.originalname).toLowerCase());

	if (extname) {
		call(null, true);
	} else {
		call(
			new Error(
				"Invalid file format. Only JPEG, PNG, and GIF are allowed."
			)
		);
	}
};

const upload = multer({ storage, fileFilter });

/**
 * @swagger
 * /user/de:
 *   post:
 *     summary: upload file
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                image:
 *                 type: string
 *                 example: "johnD@northeastern.edu"
 *                email:
 *                 type: string
 *                 example: "temp/file.jpg"
 *
 *
 *
 *     responses:
 *       201:
 *          description: success
 *
 *
 *
 *
 */
app.post("/user/uploadImage", upload.single("image"), async (req, res) => {
	const { email } = req.body;
	console.log("req.body:", req.body);
	console.log("req.file:", req.file);

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({ error: "User not found." });
	}

	if (user.image) {
		return res
			.status(400)
			.json({ error: "Image already exists for this user." });
	}

	user.image = req.file.path;
	await user.save();
	return res.status(201).json({
		message: "Image uploaded successfully.",
		filePath: req.file.path,
	});
});

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Assignment 8 API",
			version: "1.0.0",
			description: "API documentation for Assignment 8",
		},
	},
	apis: ["./main.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/swag", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
