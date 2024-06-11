const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const agendasRouter = require("./routes/agendas");
const remindresRouter = require("./routes/reminders");
const birthdaysRouter = require("./routes/birthdays");
const menusRouter = require("./routes/menus");
const photosRouter = require("./routes/photos");
const path = require("path");

require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/users", usersRouter);
app.use("/agendas", agendasRouter);
app.use("/reminders", remindresRouter);
app.use("/birthdays", birthdaysRouter);
app.use("/menus", menusRouter);
app.use("/photos", photosRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

module.exports = app;
