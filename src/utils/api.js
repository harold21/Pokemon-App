import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonList = async (url = API_BASE_URL) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
};

export const fetchPokemonDetails = async (pokemonUrl) => {
  try {
    const response = await axios.get(pokemonUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};
