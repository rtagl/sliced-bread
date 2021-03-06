const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //userID
  guests: String, //array of userIDs
  imgPath: String,
  receiptName: String,
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