module.exports = {
  isAdminAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      // SEND FLASH MESSSAGE TO CLIENT
      res.redirect("/admin/home");
    }
  },
};
