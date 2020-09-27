const router = require("express").Router();
const verifyToken = require("../validations/webtoken");
const User = require("../models/User");

router.get("/dashboard", verifyToken, async (req, res) => {
  const existingUser = await User.findOne({ _id: req.user._id });

  res.json({
    fullname: req.user.fullname,
    balance: existingUser.balance,
    loans: existingUser.loans,
  });
});

module.exports = router;
