const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ["Active", "Pending"],
    default: "Pending"
  },
  passportProvider: {
    type: String,
    enum: ["Google", "Facebook", "Twitch", "Steam", "Local"],
    default: "Local"
  },
  googleID: String,
  facebookID: String,
  twitchID: String,
  steamID: String,
  confirmationToken: String,
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// TODO: Another option
// userSchema.statics.findUserByResetPasswordToken = function(resetPasswordToken) {
//   return this.findOne({
//     resetPasswordToken: resetPasswordToken,
//     resetPasswordExpires: { $gt: Date.now() }
//   });
// };

const User = mongoose.model('User', userSchema);
module.exports = User;