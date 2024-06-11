const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
});

const Agenda = mongoose.model("Agenda", agendaSchema);

module.exports = Agenda;
