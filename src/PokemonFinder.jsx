// PokemonFinder.jsx
import React, { useState, useEffect } from 'react';
import 'mdb-ui-kit';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonDropdown from './components/PokemonDropdown';
import PokemonDetails from './components/PokemonDetails';
import PokemonTeamBuilder from './components/PokemonTeamBuilder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PokemonFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');
  const [pokemonNames, setPokemonNames] = useState([]);
  const [chosenTeam, setChosenTeam] = useState([]);

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
        if (!response.ok) throw new Error('Failed to fetch Pokémon names');
        const data = await response.json();
        setPokemonNames(data.results.map(pokemon => pokemon.name));
      } catch (error) {
        toast.error('Failed to fetch Pokémon names.');
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
      if (!pokemonName.trim()) throw new Error('Pokémon name cannot be empty.');

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokémon not found');

      const data = await response.json();
      setPokemonData(data);
      setError('');
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
      setPokemonData(null);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.warn('Please enter a Pokémon name.');
      return;
    }
    await fetchPokemon(searchTerm.trim());
    setSearchTerm('');
  };

  const handleSelectChange = async (event) => {
    const selectedPokemon = event.target.value;
    await fetchPokemon(selectedPokemon);
  };

  const handleTeamAdd = () => {
    if (chosenTeam.length >= 6) {
      toast.warn('Cannot add more than 6 to your team!');
      return;
    } else if (pokemonData && !chosenTeam.some(pokemon => pokemon.id === pokemonData.id)) {
      const newTeam = structuredClone(chosenTeam);
      newTeam.push(pokemonData);
      setChosenTeam(newTeam);
    } else {
      toast.warn('This Pokémon is already in your team!');
    }
  };

  const handleTeamRemove = (pokemonId) => {
    const newTeam = chosenTeam.filter(pokemon => pokemon.id !== pokemonId);
    setChosenTeam(newTeam);
  };

  const toPascalCase = (text) => {
    return text
      .toLowerCase()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
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
            hasError={!!error}
          />
          <PokemonDropdown
            searchTerm={searchTerm}
            pokemonNames={pokemonNames}
            onSelectChange={handleSelectChange}
          />
        </div>

        {pokemonData && <PokemonDetails pokemonData={pokemonData} />}
      </div>
      
      <PokemonTeamBuilder
        pokemonData={pokemonData}
        chosenTeam={chosenTeam}
        onAddToTeam={handleTeamAdd}
        onRemoveFromTeam={handleTeamRemove}
        toPascalCase={toPascalCase}
      />
      
      <ToastContainer />
    </div>
  );
}

export default PokemonFinder;
