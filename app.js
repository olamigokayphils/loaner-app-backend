const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const SERVER_PORT_NO = process.env.PORT || 5500;

const startServer = async () => {
  await mongoose
    .connect(process.env.DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DataBase is connected"))
    .catch((err) => console.log(err));

  //NON-ROUTE MIDDLEWARE
  app.use(cors());
  app.use(express.json());

  //ROUTES MIDDLEWARE
  app.use("/auth", require("./routes/authentication"));
  app.use("/", require("./routes/main"));

  //START APP
  app.listen(SERVER_PORT_NO, () => console.log(`Server is running on Port: ${SERVER_PORT_NO}`));
};

startServer();
