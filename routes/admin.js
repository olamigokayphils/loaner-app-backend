const router = require("express").Router();
const passport = require("passport")
const { isAdminAuthenticated } = require("../validations/adminAuth");
const Loan = require("../models/Loan")

//LANDING
router.get("/home", (req, res) => {
  return res.render("landing");
});

//DASHBOARD
router.get("/dashboard", isAdminAuthenticated, async(req, res) => {
  return res.render("dashboard");
});

// ADMIN LOGIN HANDLER
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/home",
    failureFlash: true
  })(req, res, next)
});

// GET LOAN APPLICATION
// This includes all loans applications that haven't been attended to i.e neither approved or rejected.
router.get("/loan-applications", isAdminAuthenticated, async(req, res)=> {
  const loanRecord = await Loan.find({status: "processing"}).sort({requestDate: -1})
  const result = loanRecord.map((loan, index) => {return {
    id: index + 1 ,
    userName: loan.user.fullname,
    userID: loan.user._id,
    loanID: loan._id,
    loanAmount: loan.amount,
    requestDate: new Date(loan.requestDate).toDateString(),
    loanStatus: loan.status
  }
})
  return res.json({
    total: result.length,
    totalNotFiltered: result.length,
    rows: result
  })
})

module.exports = router;
