const express = require("express");
const router = express.Router();
const Reminder = require("../models/reminder");
const upload = require("../middleware/upload");

// Create a new reminder with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const reminder = new Reminder({
      date: req.body.date,
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.path : null, // Save image path
    });
    await reminder.save();
    res.status(201).send(reminder);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).send(reminders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a reminder by ID
router.get("/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).send();
    }
    res.status(200).send(reminder);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a agneda by ID
router.delete("/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).send();
    }
    res.status(200).send(reminder);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
