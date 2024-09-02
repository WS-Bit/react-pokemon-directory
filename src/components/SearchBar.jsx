// SearchBar.js
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SearchBar({ searchTerm, onInputChange, onSearch }) {
  return (
    <>
      <TextField
        id="search"
        label="Search Pokémon"
        variant="outlined"
        value={searchTerm}
        onChange={onInputChange}
        onKeyUp={(e) => e.key === 'Enter' && onSearch()}
      />
      <Button variant="contained" onClick={onSearch}>
        Search
      </Button>
    </>
  );
}

export default SearchBar;
