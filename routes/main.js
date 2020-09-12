const router = require("express").Router();
const verifyToken = require("../validations/webtoken");

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    user: {
      fullname: req.user.fullname,
      balance: "5000.68",
    },
    loans: [],
  });
});

module.exports = router;
