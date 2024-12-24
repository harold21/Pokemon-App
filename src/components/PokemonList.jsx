import React, { useState, useEffect } from 'react';
import { fetchPokemonList } from '../utils/api';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadPokemon();
    }, []);

    const loadPokemon = async (url) => {
        setLoading(true);

        try {
            const data = await fetchPokemonList(url);

            setPokemonList(data.results);
            setNextUrl(data.next);
            setPrevUrl(data.previous);
        } catch (error) {
            console.error('Error loading Pokémon:', error);
        }

        setLoading(false);
    };

    const filteredPokemon = pokemonList.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Pokémon List</h2>
            {loading && <p>Loading...</p>}
            <input
                type="search"
                className="search-bar"
                placeholder="Search Pokémon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pokemon-grid">
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon} />
                ))}
            </div>
            <div>
                <button onClick={() => loadPokemon(prevUrl)} disabled={!prevUrl}>
                    Previous
                </button>
                <button onClick={() => loadPokemon(nextUrl)} disabled={!nextUrl}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PokemonList;
