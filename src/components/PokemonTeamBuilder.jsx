// components/PokemonTeamBuilder.jsx
import React from 'react';
import Button from '@mui/material/Button';

const PokemonTeamBuilder = ({ pokemonData, chosenTeam, onAddToTeam, onRemoveFromTeam, toPascalCase }) => {
  return (
    <div className='pokemon-team-builder'>
      <h1 className='builder-title'>Pokémon Team Builder</h1>
      <div className='team-grid'>
        {chosenTeam.map(pokemon => (
          <div key={pokemon.id} className='team-item'>
            <img
              src={pokemon.sprites.front_default}
              alt={`${pokemon.name} sprite`}
            />
            <h4>{toPascalCase(pokemon.name)}</h4>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onRemoveFromTeam(pokemon.id)} // Add the onClick handler for removal
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      {pokemonData && (
        <Button variant="contained" onClick={onAddToTeam}>Add to Team</Button>
      )}
    </div>
  );
};

export default PokemonTeamBuilder;
