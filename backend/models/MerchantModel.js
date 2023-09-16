const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required."],
  },
  email: {
    type: String,
    required: [true, "Your email address is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  store_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Merchant", merchantSchema);