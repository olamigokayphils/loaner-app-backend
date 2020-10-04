const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");

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

const startServer = async () => {
  await mongoose
    .connect(process.env.DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DataBase is connected"))
    .catch((err) => console.log(err));

  //NON-ROUTE MIDDLEWARE
  app.use(cors());
  app.use(express.json());

  //ROUTES MIDDLEWARE
  app.use("/admin", require("./routes/admin"));
  app.use("/auth", require("./routes/authentication"));
  app.use("/", require("./routes/main"));

  //START APP
  app.listen(SERVER_PORT_NO, () => console.log(`Server is running on Port: ${SERVER_PORT_NO}`));
};

startServer();
