import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/pokemons?page=${page}&search=${search}&type=${type}&height=${height}&weight=${weight}&sort=${sort}`
    )
      .then((response) => response.json())
      .then((data) => setPokemons(data.data))
      .catch((err) => console.error(err));
  }, [page, search, type, height, weight, sort]);

  const handleSearch = () => {
    setPage(1); // Reset to the first page on search
  };

  return (
    <div className="pokemon-list-container">
      {/* Controls Section */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <input
          type="text"
          placeholder="Filter by type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="height_asc">Height (Ascending)</option>
          <option value="height_desc">Height (Descending)</option>
          <option value="weight_asc">Weight (Ascending)</option>
          <option value="weight_desc">Weight (Descending)</option>
        </select>
      </div>

      {/* Pokémon Grid Section */}
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => (window.location.href = `/pokemon/${pokemon.id}`)}
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>Type: {pokemon.type}</p>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PokemonList;

