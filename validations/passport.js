const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // CHECK IF USER ACCOUNT EXIST
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "Email not registered" });
        }
        // CHECK IF USER IS ADMIN
        if (!user.isAdmin) {
          return done(null, false, { message: "Administrative rights required" });
        }
        // CHECK PASSWORD
        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) throw error;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Email and/or Password combination error" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
