const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Birthday = mongoose.model("Birthday", birthdaySchema);
module.exports = Birthday;
