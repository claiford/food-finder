const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique
  },
  password: {
    type: String,
    required: true,
  },
  groups_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group', // Reference to the Group model (if needed)
    },
  ],
});

module.exports = mongoose.model('Customer', customerSchema);
