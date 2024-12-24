import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonModal from './PokemonModal';

const PokemonCard = ({ pokemon }) => {
    const [details, setDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await axios.get(pokemon.url);
            setDetails(response.data);
        };

        fetchDetails();
    }, [pokemon.url]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="pokemon-card" onClick={handleOpenModal}>
            <h3>{pokemon.name}</h3>
            {details && (
                <img
                    src={details.sprites.front_default}
                    alt={pokemon.name}
                />
            )}
            {details && (
                <PokemonModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    details={details}
                />
            )}
        </div>
    );
};

export default PokemonCard;
