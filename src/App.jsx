import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('pikachu');
  const [memeText, setMemeText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemonName) return;

      setLoading(true);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  const handlePokemonNameChange = (event) => {
    setPokemonName(event.target.value.toLowerCase());
  };

  const handleMemeTextChange = (event) => {
    setMemeText(event.target.value);
  };

  const handleSearchClick = () => {
    setPokemonName(pokemonName.trim().toLowerCase());
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Pokémon Meme Generator</h1>
      <div className="input-container">
        <input
          type="text"
          value={pokemonName}
          onChange={handlePokemonNameChange}
          placeholder="Enter Pokémon name"
          className="input-field"
        />
        <button onClick={handleSearchClick} className="search-button">Search</button>
        <input
          type="text"
          value={memeText}
          onChange={handleMemeTextChange}
          placeholder="Enter meme text"
          className="input-field"
        />
      </div>
      {loading && <div className="loading">Loading...</div>}
      {pokemon && pokemon.sprites.front_default && !loading && (
        <div className="meme-container">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
          <div className="meme-text">{memeText}</div>
        </div>
      )}
    </div>
  );
};

export default App;
