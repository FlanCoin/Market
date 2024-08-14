// src/pages/HomePage.js

import React, { useState, useEffect } from "react";
import NFTCard from './NFTCard';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaBuilding, FaDragon, FaPaw, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import nftData from '../data/nftData';
import RarityFilter from '../components/RarityFilter';
import './HomePage.css';

const categories = [
  {
    id: 1,
    name: "Construcciones",
    icon: <FaBuilding className="text-green-400 text-6xl" />,
    image: "/images/construcciones.jpg",
    clickable: false,
  },
  {
    id: 2,
    name: "Monturas",
    icon: <FaDragon className="text-red-400 text-6xl" />,
    image: "/images/monturas.jpg",
    clickable: true,
  },
  {
    id: 3,
    name: "Mascotas",
    icon: <FaPaw className="text-yellow-400 text-6xl" />,
    image: "/images/mascotas.jpg",
    clickable: false,
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    if (category.clickable) {
      setSelectedCategory(category.name);
      setSelectedRarity('');
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleRarityChange = (rarity) => {
    setSelectedRarity(rarity);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -50, rotate: -10 },
    visible: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: 50, rotate: 10 },
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const filteredNFTs = selectedCategory
    ? nftData[selectedCategory].filter(nft => selectedRarity === '' || nft.rarity === selectedRarity)
    : [];

  return (
    <div className="flex flex-col min-h-screen text-gray-200" style={{ backgroundColor: '#050D14' }}>
      <Navbar />
      <main className={`flex-1 ${selectedCategory ? 'overflow-hidden' : 'items-center justify-center'} p-4 relative`}>
        {selectedCategory ? (
          <>
            <button
              onClick={handleBackToCategories}
              className="back-button"
            >
              <FaArrowLeft className="text-2xl" />
              Volver
            </button>
            <div className="flex flex-row w-full max-w-screen-xl mx-auto">
              <div className="w-1/4 p-4" style={{ alignSelf: 'flex-start', marginTop: '95px' }}>
                <RarityFilter selectedRarity={selectedRarity} onRarityChange={handleRarityChange} />
              </div>
              <div className="w-3/4 p-4">
                <h1
                  className="section-title mb-4 text-center"
                  style={{
                    maxWidth: 'calc(100% - 1px)',
                    margin: '0 auto',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    padding: '10px 0',
                    textTransform: 'uppercase',
                    borderBottom: '3px solid #5E67EE',
                  }}
                >
                  {selectedCategory} NFTs
                </h1>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mx-auto"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    staggerChildren: 0.1,
                  }}
                >
                  {filteredNFTs.map((nft) => (
                    <motion.div key={nft.id} variants={cardVariants}>
                      <NFTCard nft={nft} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 w-full h-full max-w-screen-xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`relative flex flex-col items-center justify-center bg-gray-800 rounded-lg ${
                  category.clickable ? 'cursor-pointer hover:bg-gray-700' : 'pointer-events-none'
                } transition-transform transform hover:scale-105 overflow-hidden group`}
                onClick={() => handleCategoryClick(category)}
                style={{
                  height: 'calc(66vh)', // Aumenta la altura para que las imágenes no se recorten
                  maxHeight: '550px', // Ajusta la altura máxima
                  width: '100%', // Mantén el ancho completo de la columna
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
                />
                {category.clickable && (
                  <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-4 flex items-center justify-center w-full">
                      {category.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white uppercase">
                      {category.name}
                    </h2>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
