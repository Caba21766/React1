import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavoritos, type Pelicula } from '../context/FavoritosContext';
import { movieService } from '../data/movieService';

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
  height: 310px;
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
  -webkit-line-clamp: 2;
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

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0.3rem;
  margin-top: 2px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: white;
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
  const navigate = useNavigate();
  const activo = isFavorito(id);

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const pelicula: Pelicula = { id, title, src };
    toggleFavorito(pelicula);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/editar/${id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmar = confirm('¿Estás seguro que querés eliminar esta película?');
    if (!confirmar) return;
    await movieService.deleteMovie(id);
    alert('Película eliminada');
    window.location.reload();
  };

  return (
    <CardLink to={`/pelicula/${id}`}>
      <StarButton active={activo} onClick={handleStarClick}>
        <StarIcon />
      </StarButton>
      <Inner>
        <Image src={src} alt={title} />
        <Title>{title}</Title>
        <Actions>
          <ActionButton onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </ActionButton>
          <ActionButton onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </ActionButton>
        </Actions>
      </Inner>
    </CardLink>
  );
}
