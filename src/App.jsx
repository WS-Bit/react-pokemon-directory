import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import 'mdb-ui-kit'
import './App.css'


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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
    <ThemeProvider theme={theme}>
    <div>
      <h2>Pokémon Finder</h2>
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
        <div class='pokemon-screen'>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <img src={pokemonData.sprites.front_shiny} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Types: {pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          <ul class="stat-list">
            {pokemonData.stats.map(statInfo => (
            <li key={statInfo.stat.name}>{statInfo.stat.name}: {statInfo.base_stat}</li>
            ))}
          </ul>

        </div>
      )}
    </div>
    </ThemeProvider>
  );
}
    


export default PokemonFinder;