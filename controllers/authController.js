const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const db = require("../models/index");

router.get("/register", (req, res) => {
  res.render("auth/register", {});
});

router.post("/register", async (req, res) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    if (user) {
      return res.send("<h1>Account exists<h1>");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userData = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    };
    await db.User.create(userData);
    res.redirect("/auth/login");
  } catch (err) {
    return console.log(err);
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    if (!user) {
      return res.render("auth/login", {
        error: "Invalid Login Credentials",
      });
    }

    const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordsMatch) {
      return res.render("auth/login", {
        error: "Invalid Login Credentials",
      });
    }
    req.session.currentUser = user._id;
    res.redirect("/trainer");
  } catch (err) {
    return console.log(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
