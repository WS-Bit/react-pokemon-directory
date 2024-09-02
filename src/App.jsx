import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'mdb-ui-kit';
import './App.css';

function PokemonFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');
  const [pokemonNames, setPokemonNames] = useState([]);

  
  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
        const data = await response.json();
        setPokemonNames(data.results.map((pokemon) => pokemon.name));
      } catch (error) {
        setError('Failed to fetch Pokémon names.');
      }
    };
    fetchPokemonNames();
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchPokemon = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!pokemonName) {
        throw new Error('Pokémon not found');
      } else if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      setPokemonData(data);
      setError('');
      setSearchTerm('');
    } catch (error) {
      setError(error.message);
      setPokemonData(null);
    }
  };

  const handleSearch = async () => {
    await fetchPokemon(searchTerm);
  };

  const handleSelectChange = async (event) => {
    const selectedPokemon = event.target.value;
    await fetchPokemon(selectedPokemon);
  };

  const toCamelCase = (text) => {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  //! The return below:

  return (
    <div id="root" className="pokemon-finder">
      <h1>Pokémon Finder</h1>

      <div className="search-container">
        <TextField
          id="search"
          label="Search Pokémon"
          variant="outlined"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Select
          value={searchTerm}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value="" disabled>Select a Pokémon</MenuItem>
          {pokemonNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>

    
      {pokemonData && (
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
          <p>Types: {pokemonData.types.map((typeInfo) => toCamelCase(typeInfo.type.name)).join(', ')}</p>
          <ul className="stat-list">
            {pokemonData.stats.map((statInfo) => (
              <li key={statInfo.stat.name}>
                {toCamelCase(statInfo.stat.name)}: {statInfo.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}

      
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default PokemonFinder;
