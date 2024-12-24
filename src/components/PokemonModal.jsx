import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Necessary for accessibility

const PokemonModal = ({ isOpen, onRequestClose, details }) => {

    const [moveLimit, setMoveLimit] = useState(5);
    const loadMoreMoves = () => {
        setMoveLimit((prevLimit) => prevLimit + 5);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Pokemon Details"
        >
            <h2>{details.name}</h2>
            <img src={details.sprites.front_default} alt={details.name} />
            <h3>Abilities</h3>
            <ul>
                {details.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>
            <h3>Forms</h3>
            <ul>
                {details.forms.map((form) => (
                    <li key={form.name}>{form.name}</li>
                ))}
            </ul>
            <h3>Moves</h3>
            <ul>
                {details.moves.slice(0, moveLimit).map((move) => (
                    <li key={move.move.name}>{move.move.name}</li>
                ))}
            </ul>
            <ul>
                {moveLimit < details.moves.length && (
                    <span onClick={loadMoreMoves}>Load more...</span>
                )}
            </ul>

            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default PokemonModal;
