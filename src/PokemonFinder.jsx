// PokemonFinder.js
import React, { useState, useEffect } from 'react';
import 'mdb-ui-kit';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonDropdown from './components/PokemonDropdown';
import PokemonDetails from './components/PokemonDetails';

function PokemonFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');
  const [pokemonNames, setPokemonNames] = useState([]);

  //! Fetch list of Pokémon names
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

  return (
    <div id="root">
      <div className="pokemon-finder">
        <h1 className="finder-title">Pokémon Finder</h1>
        <div className="search-container">
          <SearchBar
            searchTerm={searchTerm}
            onInputChange={handleInputChange}
            onSearch={handleSearch}
          />
          <PokemonDropdown
            searchTerm={searchTerm}
            pokemonNames={pokemonNames}
            onSelectChange={handleSelectChange}
          />
        </div>

        {pokemonData && <PokemonDetails pokemonData={pokemonData} />}
        {error && <p className="error">{error}</p>}
      </div>
      <div className='pokemon-team-maker'>
        <h1 className='maker-title'>Pokémon Team Maker</h1>




      </div>
    </div>
  );
}

export default PokemonFinder;
