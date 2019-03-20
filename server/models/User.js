const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    receipts: { type: mongoose.Schema.Types.ObjectId, ref: "Receipt" },
    avatar: {
      type: String
      // default: "../images/Happy-Minion-Icon.png"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
