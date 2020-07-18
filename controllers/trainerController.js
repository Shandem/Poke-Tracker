const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const express = require("express");
const router = express.Router();

const db = require("../models/index");

router.get("/", async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  try {
    const user = req.session.currentUser;
    const currentUser = await db.User.findById(user).populate("trainers");
    res.render("trainer/index", {
      user: currentUser,
    });
  } catch (err) {
    console.log(err);
    return res.render("auth/login", {
      error: "You are not logged in.",
    });
  }
});

router.get("/new", (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  res.render("trainer/new");
});

router.post("/", async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  try {
    const trainerData = {
      trainerName: req.body.trainerName,
      favPokemon: req.body.favPokemon,
      goTeam: req.body.goTeam,
      user: req.session.currentUser,
      aboutMe: req.body.aboutMe,
    };
    const newTrainer = await db.Trainer.create(trainerData);
    const foundUser = await db.User.findById(req.session.currentUser);
    await foundUser.trainers.push(newTrainer._id);
    foundUser.save();

    res.redirect("/pokemon");
  } catch (err) {
    return res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundTrainer = await db.Trainer.findById(req.params.id);
    res.render("trainer/show", {
      trainer: foundTrainer,
    });
  } catch (err) {
    console.log(err);
    return res.render("auth/login", {
      error: "You are not logged in.",
    });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    if (!req.session.currentUser) {
      return res.redirect("/auth/login");
    }
    const foundTrainer = await db.Trainer.findById(req.params.id);
    res.render("trainer/edit", {
      trainer: foundTrainer,
    });
  } catch (err) {
    console.log(err);
    return res.render("auth/login", {
      error: "You are not logged in.",
    });
  }
});

router.get("/:id/pokemon/add", async (req, res) => {
  try {
    const interval = {
      limit: 793,
      offset: 1,
    };
    const allPokemon = await P.getPokemonsList(interval);
    const foundTrainer = await db.Trainer.findById(req.params.id);
    res.render("trainer/add", {
      trainer: foundTrainer,
      pokemon: allPokemon,
    });
  } catch (err) {
    console.log(err);
    return res.render("auth/login", {
      error: "Please try again later",
    });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  try {
    const foundTrainer = await db.Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      res.redirect(`/trainer/${req.params.id}`)
    );
  } catch (err) {
    return res.send(err);
  }
});

router.put("/:id/pokemon", async (req, res) => {
  try {
    const foundTrainer = await db.Trainer.findById(req.params.id);
    if (typeof req.body.name !== "string") {
      req.body.name.forEach((name) => {
        foundTrainer.pokemon.push(name);
      });
    } else {
      foundTrainer.pokemon.push(req.body.name);
    }
    await foundTrainer.save();
    res.redirect(`/trainer/${req.params.id}`);
  } catch (err) {
    return res.render("auth/login", {
      error: "Please try again later",
    });
  }
});

router.delete("/", async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  try {
    const deletedTrainer = await db.Trainer.findByIdAndDelete(req.body.id);
    const foundUser = await db.User.findById(req.session.currentUser);
    foundUser.trainers.remove(deletedTrainer);
    foundUser.save();
    res.redirect("/trainer");
  } catch (err) {
    return res.render("auth/login", {
      error: "Please try again later",
    });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  try {
    const foundTrainer = await db.Trainer.findById(req.params.id);
    foundTrainer.pokemon.splice(parseInt(req.body.id), 1);
    await foundTrainer.save();
    res.redirect(`/trainer/${req.params.id}`);
  } catch (err) {
    return res.render("auth/login", {
      error: "Please try again later",
    });
  }
});

module.exports = router;
