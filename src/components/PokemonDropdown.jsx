// PokemonDropdown.js
import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function PokemonDropdown({ searchTerm, pokemonNames, onSelectChange }) {
  return (
    <Select
      value={searchTerm}
      onChange={onSelectChange}
      displayEmpty
    >
      <MenuItem value="" disabled>
        Select a Pokémon
      </MenuItem>
      {pokemonNames.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default PokemonDropdown;
