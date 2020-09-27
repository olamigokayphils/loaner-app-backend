const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  requestDate: {
    type: Date,
    default: Date.now,
  },
  approvalDate: {
    type: Date,
  },
  maturityDate: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    default: "processing",
  },
});

module.exports = mongoose.model("Loan", loanSchema);
