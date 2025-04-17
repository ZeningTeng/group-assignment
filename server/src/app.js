const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require("dotenv").config();
const productRoutes = require("./routes/product");

const cors = require("cors");
const app = express();
console.log("process.env.CLIENT_URL", process.env.CLIENT_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/user", userRoutes);
app.use("/product", productRoutes);

module.exports = app;
