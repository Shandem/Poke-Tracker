const mongoose = require("mongoose");
const TrainerSchema = new mongoose.Schema({
  trainerName: String,
  favPokemon: {
    type: String,
  },
  goTeam: {
    type: String,
  },
  aboutMe: String,
  pokemon: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Trainer = mongoose.model("Trainer", TrainerSchema);

module.exports = Trainer;
