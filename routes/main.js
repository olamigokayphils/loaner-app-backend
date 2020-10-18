const router = require("express").Router();
const verifyToken = require("../validations/webtoken");
const User = require("../models/User");
const Loan = require("../models/Loan")

const { loanApplicationValidationSchema } = require("../validations/validations");

// ROUTE TO REACT FRONT-END
router.get("/", (req, res)=>{
  return res.render("frontend")
})

router.get("/dashboard", verifyToken, async (req, res) => {
  const existingUser = await User.findOne({ _id: req.user._id });
  const userLoanRecord = await Loan.find({ user: existingUser })

  res.json({
    fullname: req.user.fullname,
    balance: existingUser.balance,
    loans: userLoanRecord,
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
    const existingLoanRecord = await Loan.find({ user: existingUser })

    if (existingLoanRecord.length > 0) {
      const lastLoan = existingLoanRecord[existingLoanRecord.length - 1];
      if (lastLoan.status !== "paid") {
        return res.json({ status: "failed", message: "Cannot request new Loan!. You have a pending payment" });
      }
    }

   const newLoanRecord = new Loan({
     user: existingUser,
     amount: loanAmount
   })

   try {
    // Save User to Database
    await newLoanRecord.save();
    res.json({ status: "success", message: "Request Successful" });
  } catch (err) {
    return res.status(500).send(err);
  }

  }
});

module.exports = router;
