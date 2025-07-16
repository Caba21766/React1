// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import Category from './components/Category';
import Pelicula from './components/Pelicula';
import Player from './components/Player';
import Favoritos from './components/Favoritos';
import NotFound from './components/NotFound';

function App() {
  return (
    <div
      style={{
        backgroundImage: 'url("/fondo.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {/* 1. Barra de navegación */}
        <Navbar />

        {/* 2. Header con imagen de Unsplash */}
        <Header />

        {/* 3. Contenido según la ruta */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/pelicula/:id" element={<Pelicula />} />
          <Route path="/pelicula/:id/play" element={<Player />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
