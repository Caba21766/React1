// src/context/FavoritosContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Pelicula = {
  id: number;
  title: string;
  src: string;
};

type FavoritosContextType = {
  favoritos: Pelicula[];
  toggleFavorito: (pelicula: Pelicula) => void;
  isFavorito: (id: number) => boolean;
};

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<Pelicula[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoritos');
    if (stored) setFavoritos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (pelicula: Pelicula) => {
    setFavoritos((prev) =>
      prev.some((p) => p.id === pelicula.id)
        ? prev.filter((p) => p.id !== pelicula.id)
        : [...prev, pelicula]
    );
  };

  const isFavorito = (id: number) => favoritos.some((p) => p.id === id);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  return context;
}
