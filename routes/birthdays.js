const express = require("express");
const router = express.Router();
const Birthday = require("../models/birthday");
const upload = require("../middleware/upload");

// Create a new birthday with image upload
router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const birthday = new Birthday({
      date: req.body.date,
      name: req.body.name,
      message: req.body.message,
      image: req.file ? req.file.path : null, // Save image path
    });
    await birthday.save();
    res.status(201).send(birthday);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all birthday
router.get("/", async (req, res) => {
  try {
    const birthdays = await Birthday.find();
    res.status(200).send(birthdays);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a birthday by ID
router.get("/:id", async (req, res) => {
  try {
    const birthday = await Birthday.findById(req.params.id);
    if (!birthday) {
      return res.status(404).send();
    }
    res.status(200).send(birthday);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a agneda by ID
router.delete("/:id", async (req, res) => {
  try {
    const birthday = await Birthday.findByIdAndDelete(req.params.id);
    if (!birthday) {
      return res.status(404).send();
    }
    res.status(200).send(birthday);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
