const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const port = process.env.PORT || 3800;
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("dotenv").config();
const app = express();

const authController = require("./controllers/authController");
const trainerController = require("./controllers/trainerController");
const pokemonController = require("./controllers/pokemonController");
const berriesController = require("./controllers/berriesController");
const itemsController = require("./controllers/itemsController");

const db = require("./models");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(
  session({
    store: new MongoStore({
      url: process.env.MONGODB_URI || "mongodb://localhost:27017/poke-tracker",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authController);
app.use("/trainer", trainerController);
app.use("/pokemon", pokemonController);
app.use("/berries", berriesController);
app.use("/items", itemsController);

app.listen(process.env.PORT || 3800, () =>
  console.log(`Hey pokedex server is on at port: ${port} `)
);
// adding for commit
