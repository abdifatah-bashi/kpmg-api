const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");

router.post("/", async (req, res) => {
  try {
    const menu = new Menu({
      meal: req.body.meal,
      description: req.body.description,
    });
    await menu.save();
    res.status(201).send(menu);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).send(menus);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).send();
    }
    res.status(200).send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a agneda by ID
router.delete("/:id", async (req, res) => {
  try {
    const menus = await Menu.findByIdAndDelete(req.params.id);
    if (!menus) {
      return res.status(404).send();
    }
    res.status(200).send(menus);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
