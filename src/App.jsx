import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import 'mdb-ui-kit'
import './App.css'

function PokemonFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!searchTerm) {
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

  const handleKeyUp = async (event) => {
    if (event.key === 'Enter') {
      try {
        if (!searchTerm) {
          throw new Error('Pokémon not found');
        }
        await fetchPokemon();
      } catch (error) {
        setError(error.message);
        setPokemonData(null);
      }
    }
  };
  
  

  return (
    <div>
      <h1>Pokémon Finder</h1>
      <TextField 
        id="outlined-basic"
        label="Pokemon name or ID" 
        variant="outlined"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
        error={!!error}
        helperText={error}
      />
      <Button 
      id="search"
      variant='contained' 
      color='primary' 
      onClick={fetchPokemon}>Search
      </Button>

      
      {pokemonData && (
        <div className='pokemon-screen'>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <img src={pokemonData.sprites.front_shiny} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Types: {pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          <ul className="stat-list">
            {pokemonData.stats.map(statInfo => (
            <li key={statInfo.stat.name}>{statInfo.stat.name}: {statInfo.base_stat}</li>
            ))}
          </ul>

        </div>
      )}
    </div>
  );
}
    


export default PokemonFinder;