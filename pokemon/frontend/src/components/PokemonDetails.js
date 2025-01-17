import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [similarPokemons, setSimilarPokemons] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pokemons/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.pokemon);
        setSimilarPokemons(data.similarPokemons);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="pokemon-details">
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="pokemon-info">
        <img src={pokemon.image} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
        <p>Type: {pokemon.type}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
      </div>

      <h3>Similar Pokémon</h3>
      <div className="similar-pokemon-grid">
        {similarPokemons.map((similar) => (
          <div
            key={similar.id}
            className="pokemon-card"
            onClick={() => navigate(`/pokemon/${similar.id}`)}
          >
            <img src={similar.image} alt={similar.name} />
            <h4>{similar.name}</h4>
            <p>Type: {similar.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetails;

