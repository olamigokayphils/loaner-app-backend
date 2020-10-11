const mongoose = require("mongoose");
const userSchema = require("./User").schema;

const loanSchema = new mongoose.Schema({
  user: userSchema,
  requestDate: {
    type: Date,
    default: Date.now,
  },
  approvalDate: {
    type: Date,
    default: "",
  },
  maturityDate: {
    type: Date,
    default: "",
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
