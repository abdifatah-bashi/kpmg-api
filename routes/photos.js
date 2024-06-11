const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');
const upload = require('../middleware/upload');

// Create a new photo with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const photo = new Photo({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      image: req.file ? req.file.path : null, // Save image path
    });
    await photo.save();
    res.status(201).send(photo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all photo
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).send(photos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a photo by ID
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).send();
    }
    res.status(200).send(photo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a photo by ID
router.delete('/:id', async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).send();
    }
    res.status(200).send(photo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
