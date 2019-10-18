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
  },
  followers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  following: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  savedReviews: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' } ],
  savedGames: [ Number ]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;