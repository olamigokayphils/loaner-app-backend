const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
//const session = require("express-session");
const session = require("cookie-session");

const passport = require("passport");
const flash = require("connect-flash")

const SERVER_PORT_NO = process.env.PORT || 5500;

//EJS
app.use(expressLayout);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// EXPRESS SESSIONS
app.use(
  session({
    secret: "loanerSecret",
    resave: true,
    saveUninitialized: true,
  })
);

// PASSPORT INIT
require("./validations/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());


// SETUP CONNECT FLASH
app.use(flash())

//GLOBAL FLASH MESSAGES == > Errors
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  next()
})

const startServer = async () => {
  await mongoose
    .connect(process.env.DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DataBase is connected"))
    .catch((err) => console.log(err));

  //NON-ROUTE MIDDLEWARE
  app.use(cors());
  // BODY PARSER => application/json
  app.use(express.json());
  // BODY PARSER => application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));


  //ROUTES MIDDLEWARE
  app.use("/admin", require("./routes/admin"));
  app.use("/auth", require("./routes/authentication"));
  app.use("/", require("./routes/main"));

  //START APP
  app.listen(SERVER_PORT_NO, () => console.log(`Server is running on Port: ${SERVER_PORT_NO}`));
};

startServer();
