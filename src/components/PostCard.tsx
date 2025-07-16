// src/components/PostCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import { useFavoritos, type Pelicula } from '../context/FavoritosContext';

type Props = {
  id: number;
  title: string;
  description: string;
  src: string;
  read: boolean;
};

const CardLink = styled(Link)`
  display: block;
  width: 180px;
  height: 280px;
  border-radius: 1.5rem;
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  padding: 2px;
  position: relative;
  box-shadow:
    6px 6px 12px rgba(0, 0, 0, 0.7),
    -6px -6px 12px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow:
      8px 8px 16px rgba(0, 0, 0, 0.8),
      -8px -8px 16px rgba(255, 255, 255, 0.15);
  }
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  background: #121212;
  border-radius: 1.3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Title = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e5e5e5;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  font-size: 0.85rem;
  text-align: center;
  line-height: 1.1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* máximo 2 líneas */
  -webkit-box-orient: vertical;
`;

const StarButton = styled.button<{ active: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ active }) => (active ? '#ffca28' : '#555')};
  transition: color 0.3s;
  z-index: 10;

  &:hover {
    color: #ffca28;
  }
`;

export default function PostCard({
  id,
  title,
  description,
  src,
  read,
}: Props) {
  const { toggleFavorito, isFavorito } = useFavoritos();
  const activo = isFavorito(id);

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const pelicula: Pelicula = { id, title, src };
    toggleFavorito(pelicula);
  };

  return (
    <CardLink to={`/pelicula/${id}`}>
      <StarButton active={activo} onClick={handleStarClick}>
        <StarIcon />
      </StarButton>
      <Inner>
        <Image src={src} alt={title} />
        <Title>{title}</Title>
      </Inner>
    </CardLink>
  );
}
