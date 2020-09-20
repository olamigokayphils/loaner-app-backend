const router = require("express").Router();
const User = require("../models/User");
const { registerValidationSchema, loginValidationSchema } = require("../validations/validations");
const bcrpyt = require("bcrypt");
//const jsonwebtoken = require("jsonwebtoken");

const redis = require("redis");
const JWTR = require("jwt-redis").default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);

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
        // ASSIGN A TOKEN TO USER
        const token = await jwtr.sign(
          {
            _id: existingUser._id,
            fullname: existingUser.fullname,
          },
          process.env.JSON_WEB_TOKE_KEY
        );
        return res.header("Authorization-Token", token).json({ status: "success", token: token });
      } else {
        return res.status(400).send("Email and/or Password is wrong");
      }
    } else {
      res.status(400).send("Email and/or Password is wrong");
    }
  }
});

router.get("/user", async (req, res) => {
  const token = req.header("Authorization-Token");
  if (!token) return res.status(401).json({ message: "Unauthorized resource" });

  try {
    const verified = jwtr.verify(token, process.env.JSON_WEB_TOKE_KEY);
    res.json({ user: verified });
  } catch (err) {
    res.status(400).send("Invalid Authorization details");
  }
});

router.post("/logout", async (req, res) => {
  const token = req.header("Authorization-Token");
  if (!token) return res.status(401).json({ message: "Unauthorized resource" });

  try {
    // VERFIY TOKEN
    const verified = await jwtr.decode(token, process.env.JSON_WEB_TOKE_KEY);
    await jwtr.destroy(verified.jti);
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(400).send("Invalid Authorization details");
  }
});

module.exports = router;
