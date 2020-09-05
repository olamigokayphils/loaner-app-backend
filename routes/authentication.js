const router = require("express").Router();
const User = require("../models/User");
const { registerValidationSchema, loginValidationSchema } = require("../validations/validations");
const { schema } = require("../models/User");
const bcrpyt = require("bcrypt");

router.post("/register", async (req, res) => {
  //VALIDATE USERS' REQUEST
  const { error } = registerValidationSchema.validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  } else {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User email already registered");
    } else {
      // HASH PASSWORD
      const salt = await bcrpyt.genSalt(10);
      const hashedPassword = await bcrpyt.hash(req.body.password, salt);

      const user = new User({
        phoneNumber: req.body.phoneNumber,
        fullname: req.body.fullname,
        email: req.body.email,
        state: req.body.state,
        dob: req.body.dob,
        password: hashedPassword,
      });
      try {
        // Save User to Database
        const savedUser = await user.save();
        return res.send(savedUser);
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  }
});

router.post("/login", async (req, res) => {
  // VALIDATE USERS' REQUEST
  const { error } = loginValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    //CHECK IF THE USER EXIST
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // CHECK USER PASSWORD
      const validPassword = await bcrpyt.compare(req.body.password, existingUser.password);
      if (validPassword) {
        return res.send("Login Success");
      } else {
        return res.status(400).send("Email and/or Password is wrong");
      }
    } else {
      res.status(400).send("Email and/or Password is wrong");
    }
  }
});

module.exports = router;
