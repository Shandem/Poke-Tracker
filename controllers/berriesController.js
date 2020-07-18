const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const express = require("express");
const router = express.Router();

const db = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const berries = await P.getBerriesList();
    res.render("berries/index", {
      berries: berries,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const berry = await P.getBerryByName(req.params.name);
    res.render("berries/show", {
      berry: berry,
    });
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
