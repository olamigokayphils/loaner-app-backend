const router = require("express").Router();
const verifyToken = require("../validations/webtoken");
const User = require("../models/User");

const { loanApplicationValidationSchema } = require("../validations/validations");

router.get("/dashboard", verifyToken, async (req, res) => {
  const existingUser = await User.findOne({ _id: req.user._id });

  res.json({
    fullname: req.user.fullname,
    balance: existingUser.balance,
    loans: existingUser.loans.reverse(),
  });
});

router.post("/request-loan", verifyToken, async (req, res) => {
  const existingUser = await User.findOne({ _id: req.user._id });

  const { error } = loanApplicationValidationSchema.validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  } else {
    // GET AMOUNT
    const loanAmount = req.body.amount;

    // CHECK IF USER HAS A PENDING/DEFAULTING LOAN

    // ADD LOAN TO USERS RECORD
    existingUser.loans.push({ amount: loanAmount });

    //SAVE USER RECORD
    await existingUser.save();
    res.json({ status: "success", message: "Request Successful" });
  }
});

module.exports = router;
