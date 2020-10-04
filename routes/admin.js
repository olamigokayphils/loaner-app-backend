const router = require("express").Router();
const { isAdminAuthenticated } = require("../validations/adminAuth");

//LANDING
router.get("/home", (req, res) => {
  return res.render("landing");
});

//DASHBOARD
router.get("/dashboard", isAdminAuthenticated, (req, res) => {
  return res.render("dashboard");
});

// ADMIN LOGIN HANDLER
router.post("/login", (req, res, next) => {
  //
});

module.exports = router;
