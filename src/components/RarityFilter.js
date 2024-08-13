// src/components/RarityFilter.js

import React from 'react';

// Estilos de rareza para el filtro
const rarityStyles = {
  Common: {
    backgroundColor: '#cccccc',
    color: '#000000',
  },
  Uncommon: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
  },
  Rare: {
    backgroundColor: '#2196f3',
    color: '#ffffff',
  },
  Epic: {
    backgroundColor: '#9c27b0',
    color: '#ffffff',
  },
  Legendary: {
    backgroundColor: '#ff9800',
    color: '#ffffff',
  },
};

const RarityFilter = ({ selectedRarity, onRarityChange }) => {
  return (
    <div className="rarity-filter">
      <h2 className="text-xl font-bold text-white mb-4">Filtrar por Rareza</h2>
      <div className="rarity-buttons">
        {Object.keys(rarityStyles).map((rarity) => (
          <button
            key={rarity}
            className={`rarity-button ${selectedRarity === rarity ? 'selected' : ''}`}
            style={rarityStyles[rarity]}
            onClick={() => onRarityChange(rarity)}
          >
            {rarity}
          </button>
        ))}
        <button
          className={`rarity-button ${selectedRarity === '' ? 'selected' : ''}`}
          style={{ backgroundColor: '#333333', color: '#ffffff' }}
          onClick={() => onRarityChange('')}
        >
          Todos
        </button>
      </div>
    </div>
  );
};

export default RarityFilter;
