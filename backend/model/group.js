const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
  groupName: { type: String, required: true },
  // memberIds: [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
  }
);

module.exports = mongoose.model('Group', groupSchema);
