const mongoose = require('mongoose');
const axios = require('axios');
const Pokemon = require('./models/Pokemon');

const MONGO_URI = 'mongodb://localhost:27017/pokemon';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error(err));

const seedPokemon = async () => {
  try {
    await Pokemon.deleteMany();

    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
    const results = response.data.results;

    const pokemons = [];
    for (const result of results) {
      const details = await axios.get(result.url);
      pokemons.push({
        id: details.data.id,
        name: details.data.name,
        type: details.data.types.map((t) => t.type.name).join(', '),
        height: details.data.height,
        weight: details.data.weight,
        image: details.data.sprites.front_default,
      });
    }

    await Pokemon.insertMany(pokemons);
    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedPokemon();

