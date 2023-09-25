const Customer = require("../models/CustomerModel");
const Merchant = require("../models/MerchantModel");
const bcrypt = require("bcrypt");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

module.exports = {
  createCustomer: CustomerSignUp,
  createMerchant: MerchantSignUp,
  customerLogin: CustomerLogin,
  Logout,
};

async function CustomerSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in db
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer info into db
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
    });
    await newCustomer.save();
    res.status(200).json({
      message:
        "Customer's account created successfully. Please log in to proceed.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function MerchantSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in db
    const existingUser = await Merchant.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer info into db
    const newMerchant = new Merchant({
      name,
      email,
      password: hashedPassword,
    });
    await newMerchant.save();
    res.status(200).json({
      message:
        "Merchant's account created successfully. Please log in to proceed.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function CustomerLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if email exists in db
    const existingUser = await Customer.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    // Store user data in the session
    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
    };
    console.log("req.session.user => ", req.session.user);

    // After successful authentication
    res.cookie("user", JSON.stringify(req.session.user)); // Set a "user" cookie with the session data
    res.status(200).json({
      message: "Login successful",
      customer: {
        id: existingUser._id,
        email: existingUser.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function Logout(req, res) {
  req.logout();
  res.send("Goodbye.");
}
