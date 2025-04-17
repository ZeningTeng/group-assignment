const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post(
  "/create",
  [
    check("email").isEmail().normalizeEmail(),
    check("fullName").matches(/^[A-Za-z\s]+$/),
    check("password").isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    check("role").isIn(["admin", "customer"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        error: "Validation failed/required fields are missing",
      });
    }

    try {
      const { fullName, email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const newUser = new User({
        fullName,
        email,
        password,
        role,
      });

      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error("Creation error:", err);
      res.status(500).json({
        error: "User creation failed",
        details: err.message,
      });
    }
  }
);

router.put(
  "/edit",
  [
    check("fullName").matches(/^[A-Za-z\s]+$/),
    check("password").isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed/required fields are missing",
      });
    }

    try {
      const { fullName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.fullName = fullName;
      existingUser.password = hashedPassword;

      await existingUser.save();

      res.status(200).json({ message: "User updated successfully." });
    } catch (err) {
      console.error("Updation error:", err);
      res.status(500).json({
        error: "User Updation failed",
        details: err.message,
      });
    }
  }
);

router.delete(
  "/delete",
  [check("email").isEmail().normalizeEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed/required fields are missing",
      });
    }

    try {
      const { email } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      await existingUser.deleteOne();

      res.status(200).json({ message: "User deletion successful." });
    } catch (err) {
      console.error("deletion error:", err);
      res.status(500).json({
        error: "User deletion failed",
        details: err.message,
      });
    }
  }
);

router.get("/getAll", async (req, res) => {
  try {
    const users = await User.find({}, "fullName email role");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log(password, existingUser.password, isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = await existingUser.generateAuthToken();
    console.log("Token generated:", token);

    return res.status(200).json({
      message: "Login successful",
      token,
      role: existingUser.role,
      name: existingUser.fullName,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "An error occurred during login",
    });
  }
});

module.exports = router;
