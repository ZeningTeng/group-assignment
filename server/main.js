const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.DB_URL, {});
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  count: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const User = mongoose.model("User", userSchema);
const Products = mongoose.model("Product", productSchema);
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;


app.post("/user/create", async (req, res) => {
  const { name, email, password } = req.body;
  if (
    !emailRegex.test(email) ||
    !namePattern.test(name) ||
    !passPattern.test(password)
  ) {
    return res.status(400).json({ error: "Validation failed." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return res.status(201).json({ message: "User created successfully." });
});

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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (password !== user.password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
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

app.delete("/user/delete", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndDelete({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  return res.status(200).json({ message: "User deleted successfully." });
});

app.get("/user/getAll", async (req, res) => {
  const users = await Product.find({}, { name: 1, email: 1, passoword: 1 });
  return res.status(200).json({ users });
});
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
      new Error("Invalid file format. Only JPEG, PNG, and GIF are allowed.")
    );
  }
};

const upload = multer({ storage, fileFilter });



app.listen(process.env.PORT, () => {});
