const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Customer", customerSchema);
