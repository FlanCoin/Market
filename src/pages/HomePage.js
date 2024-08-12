// src/pages/HomePage.js

import React, { useState, useEffect } from "react";
import { NFTCard } from "./NFTCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaBuilding, FaDragon, FaPaw, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import './HomePage.css'; // Importa el archivo CSS aquí

const categories = [
  {
    id: 1,
    name: "Construcciones",
    icon: <FaBuilding className="text-green-400 text-6xl" />,
    image: "/images/construcciones.jpg",
  },
  {
    id: 2,
    name: "Monturas",
    icon: <FaDragon className="text-red-400 text-6xl" />,
    image: "/images/monturas.jpg",
  },
  {
    id: 3,
    name: "Mascotas",
    icon: <FaPaw className="text-yellow-400 text-6xl" />,
    image: "/images/mascotas.jpg",
  },
];

const nftData = {
  Construcciones: Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    image: `/images/nft${(index % 2) + 1}.png`,
    name: `Construcción ${index + 1}`,
    description: "Una construcción impresionante para tu mundo de Minecraft.",
    price: "100 FLAN",
    rarity: ["Common", "Uncommon", "Rare", "Epic", "Legendary"][Math.floor(Math.random() * 5)], // Asignar rarezas aleatorias
  })),
  Monturas: Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    image: `/images/nft${(index % 2) + 1}.png`,
    name: `Montura ${index + 1}`,
    description: "Una montura para volar sobre dragones.",
    price: "150 FLAN",
    rarity: ["Common", "Uncommon", "Rare", "Epic", "Legendary"][Math.floor(Math.random() * 5)], // Asignar rarezas aleatorias
  })),
  Mascotas: Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    image: `/images/nft${(index % 2) + 1}.png`,
    name: `Mascota ${index + 1}`,
    description: "Una mascota para tu aventura.",
    price: "80 FLAN",
    rarity: ["Common", "Uncommon", "Rare", "Epic", "Legendary"][Math.floor(Math.random() * 5)], // Asignar rarezas aleatorias
  })),
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Ajusta el tiempo de carga según sea necesario

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -50, rotate: -10 },
    visible: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: 50, rotate: 10 },
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Navbar />
      <main className="flex-1 p-4 relative flex items-center justify-center nft-background">
        {selectedCategory ? (
          <>
            <button
              onClick={handleBackToCategories}
              className="back-button"
            >
              <FaArrowLeft className="text-2xl" />
              Volver
            </button>
            <h1 className="section-title">{selectedCategory} NFTs</h1>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-xl"
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
              {nftData[selectedCategory].map((nft) => (
                <motion.div key={nft.id} variants={cardVariants}>
                  <NFTCard nft={nft} />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full max-w-screen-xl h-[70vh] flex items-center">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative flex flex-col items-center justify-center bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-transform transform hover:scale-105 overflow-hidden group h-[400px] md:h-[500px] lg:h-[600px] w-full"
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
                />
                <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 flex items-center justify-center w-full">
                    {category.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white uppercase">
                    {category.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
