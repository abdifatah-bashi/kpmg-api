const express = require("express");
const router = express.Router();
const Agenda = require("../models/agenda");
const upload = require("../middleware/upload");

// Create a new agenda with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const agenda = new Agenda({
      date: req.body.date,
      time: req.body.time,
      room: req.body.room,
      title: req.body.title,
    });
    await agenda.save();
    res.status(201).send(agenda);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all agendas
router.get("/", async (req, res) => {
  try {
    const agendas = await Agenda.find();
    res.status(200).send(agendas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a agenda by ID
router.get("/:id", async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id);
    if (!agenda) {
      return res.status(404).send();
    }
    res.status(200).send(agenda);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a agneda by ID
router.delete("/:id", async (req, res) => {
  try {
    const agenda = await Agenda.findByIdAndDelete(req.params.id);
    if (!agenda) {
      return res.status(404).send();
    }
    res.status(200).send(agenda);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
