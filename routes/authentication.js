const router = require("express").Router();
const User = require("../models/User");
const Joi = require("@hapi/joi");
const { schema } = require("../models/User");

//REGISTRATION VALIDATION
const registerValidationSchema = Joi.object({
  phoneNumber: Joi.string().min(11).max(11).required(),
  fullname: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  state: Joi.string().min(3).required(),
  dob: Joi.date().required(),
  password: Joi.string().min(6),
});

router.post("/register", async (req, res) => {
  //VALIDATE USERS' REQUEST
  const { error } = registerValidationSchema.validate(req.body);
  if (error) {
    res.send(error.details[0].message);
  } else {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.send("User email already registered");
    } else {
      const user = new User({
        phoneNumber: req.body.phoneNumber,
        fullname: req.body.fullname,
        email: req.body.email,
        state: req.body.state,
        dob: req.body.dob,
        password: req.body.password,
      });
      try {
        // Save User to Database
        const savedUser = await user.save();
        res.send(savedUser);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
});

module.exports = router;
