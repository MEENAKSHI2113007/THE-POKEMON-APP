const express = require('express');
const Pokemon = require('../models/Pokemon');

const router = express.Router();

// Get paginated Pokémon
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, search, type, height, weight, sort } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { id: parseInt(search) || 0 },
    ];
  }
  if (type) filter.type = { $regex: type, $options: 'i' };
  if (height) filter.height = height;
  if (weight) filter.weight = weight;

  try {
    let pokemons = Pokemon.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    if (sort) {
      const [field, order] = sort.split('_');
      pokemons = pokemons.sort({ [field]: order === 'asc' ? 1 : -1 });
    }

    const results = await pokemons;
    const total = await Pokemon.countDocuments(filter);

    res.json({
      data: results,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a Pokémon by ID and find similar Pokémon
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await Pokemon.findOne({ id });
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    // Function to find Pokémon with combined matching criteria
    const findSimilar = async (criteria) => {
      return await Pokemon.find({
        ...criteria,
        id: { $ne: pokemon.id }, // Exclude the current Pokémon
      }).limit(3);
    };

    // 1. Match by type, height, and weight
    let similarPokemons = await findSimilar({
      type: { $regex: pokemon.type.split(',')[0], $options: 'i' },
      height: { $gte: pokemon.height - 5, $lte: pokemon.height + 5 },
      weight: { $gte: pokemon.weight - 20, $lte: pokemon.weight + 20 },
    });

    // 2. Match by type and height
    if (similarPokemons.length < 3) {
      similarPokemons = similarPokemons.concat(
        await findSimilar({
          type: { $regex: pokemon.type.split(',')[0], $options: 'i' },
          height: { $gte: pokemon.height - 5, $lte: pokemon.height + 5 },
        })
      );
    }

    // 3. Match by type and weight
    if (similarPokemons.length < 3) {
      similarPokemons = similarPokemons.concat(
        await findSimilar({
          type: { $regex: pokemon.type.split(',')[0], $options: 'i' },
          weight: { $gte: pokemon.weight - 20, $lte: pokemon.weight + 20 },
        })
      );
    }

    // 4. Match by height and weight
    if (similarPokemons.length < 3) {
      similarPokemons = similarPokemons.concat(
        await findSimilar({
          height: { $gte: pokemon.height - 5, $lte: pokemon.height + 5 },
          weight: { $gte: pokemon.weight - 20, $lte: pokemon.weight + 20 },
        })
      );
    }

    // 5. Match by only height, weight, or type (fallback)
    if (similarPokemons.length < 3) {
      similarPokemons = similarPokemons.concat(
        await findSimilar({ height: { $gte: pokemon.height - 5, $lte: pokemon.height + 5 } })
      );
    }
    if (similarPokemons.length < 3) {
      similarPokemons = similarPokemons.concat(
        await findSimilar({ weight: { $gte: pokemon.weight - 20, $lte: pokemon.weight + 20 } })
      );
    }
    if (similarPokemons.length < 3) {
      similarPokemons = similarPokemons.concat(
        await findSimilar({ type: { $regex: pokemon.type.split(',')[0], $options: 'i' } })
      );
    }

    // Ensure exactly 3 similar Pokémon are returned
    similarPokemons = similarPokemons.slice(0, 3);

    res.json({ pokemon, similarPokemons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

