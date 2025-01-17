const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  height: { type: Number },
  weight: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model('Pokemon', pokemonSchema);

