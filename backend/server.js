const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = 'mongodb://localhost:27017/pokemon';
const PORT = 5000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/pokemons', pokemonRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

