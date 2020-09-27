const mongoose = require("mongoose");

const loanSchema = require("./Loan").schema;

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    min: 11,
  },
  fullname: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  state: {
    type: String,
    required: true,
    min: 3,
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  loans: [loanSchema],
  balance: {
    type: Number,
    default: "0.00",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  dateRegistered: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
