// SearchBar.js
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SearchBar({ searchTerm, onInputChange, onSearch, hasError }) {
  return (
    <>
      <TextField
        id="search"
        label="Pokémon name or number"
        variant="outlined"
        value={searchTerm}
        onChange={onInputChange}
        onKeyUp={(e) => e.key === 'Enter' && onSearch()}
        error={hasError} 
        helperText={hasError ? 'Not a valid Pokémon name or number.' : ''} 
      />
      <Button variant="contained" onClick={onSearch}>
        Search
      </Button>
    </>
  );
}

export default SearchBar;
