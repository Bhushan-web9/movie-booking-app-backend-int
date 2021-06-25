const mongoose = require("mongoose");
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  userid: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  first_name: String,
  last_name: String,
  username: {
    type: String,
    unique: true,
  },
  contact: {
    type: String,
    validate: {
      validator: function (v) {
        if(v.length===10) return v
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  password: String,
  role: String,
  isLoggedIn: Boolean,
  uuid: String,
  accesstoken: String,
  coupens: Array,
  bookingRequests: Array,
});

userSchema.pre("save", async function (next) {
  this.username = this.first_name + "." + this.last_name;
  if (!this.userid) {
    this.userid = Math.floor(1000 + Math.random() * 9000);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
