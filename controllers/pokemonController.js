const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const interval = {
      limit: 793,
      offset: 1,
    };
    const allPokemon = await P.getPokemonsList(interval);
    res.render("pokemon/index", {
      pokemon: allPokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/kanto", async (req, res) => {
  try {
    const kantoPokemon = await P.getPokedexByName("kanto");
    res.render("pokemon/pokedex", {
      pokedex: kantoPokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/johto", async (req, res) => {
  try {
    const Pokemon = await P.getPokedexByName("updated-johto");
    res.render("pokemon/pokedex", {
      pokedex: Pokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/hoenn", async (req, res) => {
  try {
    const Pokemon = await P.getPokedexByName("updated-hoenn");
    res.render("pokemon/pokedex", {
      pokedex: Pokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/sinnoh", async (req, res) => {
  try {
    const Pokemon = await P.getPokedexByName("extended-sinnoh");
    res.render("pokemon/pokedex", {
      pokedex: Pokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/unova", async (req, res) => {
  try {
    const Pokemon = await P.getPokedexByName("updated-unova");
    res.render("pokemon/pokedex", {
      pokedex: Pokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/kalos", async (req, res) => {
  try {
    const kalosCentralPokemon = await P.getPokedexByName("kalos-central");
    const kalosCoastalPokemon = await P.getPokedexByName("kalos-coastal");
    const kalosMountainPokemon = await P.getPokedexByName("kalos-mountain");
    res.render("pokemon/kalos", {
      kalosCentralPokedex: kalosCentralPokemon,
      kalosCoastalPokedex: kalosCoastalPokemon,
      kalosMountainPokedex: kalosMountainPokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const foundPokemon = await P.getPokemonByName(`${req.params.name}`);
    res.render("pokemon/show", {
      pokemon: foundPokemon,
    });
  } catch (err) {
    return res.send(err);
  }
});

module.exports = router;
