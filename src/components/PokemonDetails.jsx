// PokemonDetails.js
import React from 'react';

function PokemonDetails({ pokemonData }) {
  const toCamelCase = (text) => {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="pokemon-screen">
      <h3>{toCamelCase(pokemonData.name)}</h3>

      <div className="sprites">
        <img
          src={pokemonData.sprites.front_default}
          alt={`${pokemonData.name} normal`}
          className="sprite"
        />
        <img
          src={pokemonData.sprites.front_shiny}
          alt={`${pokemonData.name} shiny`}
          className="sprite"
        />
      </div>

      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <p>
        Types: {pokemonData.types.map((typeInfo) => toCamelCase(typeInfo.type.name)).join(', ')}
      </p>
      <ul className="stat-list">
        {pokemonData.stats.map((statInfo) => (
          <li key={statInfo.stat.name}>
            {toCamelCase(statInfo.stat.name)}: {statInfo.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDetails;
