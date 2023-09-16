const Customer = require("../models/CustomerModel");
const Merchant = require("../models/MerchantModel");
const bcrypt = require("bcrypt");

module.exports = {
  createCustomer: CustomerSignUp,
  createMerchant: MerchantSignUp,
}

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
    res.status(200).json({ message: "Customer's account created successfully. Please log in to proceed." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function MerchantSignUp (req, res) {
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
    res.status(200).json({ message: "Merchant's account created successfully. Please log in to proceed." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error." });
  }
}