const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  owner: String, //userID
  attendees: Array, //array of userIDs
  items: Array,
  paid: Boolean
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Receipt = mongoose.model('Receipt', receiptSchema);
module.exports = Receipt;