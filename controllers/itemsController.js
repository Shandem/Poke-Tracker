const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const express = require("express");
const router = express.Router();

const db = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const items = await P.getItemsList();
    res.render("items/index", {
      items: items,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const item = await P.getItemByName(req.params.name);
    res.render("items/show", {
      item: item,
    });
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
