const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    match: /^[A-Za-z\s]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "customer"],
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  console.log("Hashing password:", this.password);
  if (this.isModified("password")) {
    console.log("Hashing password:", this.password);
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id, email: this.email, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    console.error("Error generating auth token:", error);
    throw new Error("Token generation failed");
  }
};
module.exports = mongoose.model("User", userSchema);
