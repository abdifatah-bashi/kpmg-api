const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
