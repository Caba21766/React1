import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Post } from '../data/posts';
import { categories } from '../data/posts';
import { movieService } from '../data/movieService';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0f0f0f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
`;

const StyledCard = styled(Card)`
  max-width: 320px;
  background-color: #1f1f1f !important;
  border-radius: 1.5rem !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

export default function Pelicula() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // ✅ Necesario para navegar a /player
  const [pelicula, setPelicula] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buscarPelicula = async () => {
      const peliLocal = await movieService.getMovieById(id!);

      if (peliLocal) {
        setPelicula({
          id: peliLocal.id,
          titulo: peliLocal.title,
          descripcion: peliLocal.plot,
          src: peliLocal.poster,
          trailer: peliLocal.trailer,
          read: false,
        });
      } else {
        const allPosts: Post[] = Object.values(categories).flatMap((c) => c.posts);
        const peliEncontrada = allPosts.find((p) => p.id === Number(id));

        if (peliEncontrada) {
          setPelicula({
            id: peliEncontrada.id,
            titulo: peliEncontrada.titulo,
            descripcion: peliEncontrada.descripcion,
            src: peliEncontrada.src,
            trailer: peliEncontrada.trailer,
            read: peliEncontrada.read,
          });
        }
      }

      setIsLoading(false);
    };

    buscarPelicula();
  }, [id]);

  if (isLoading) {
    return <PageContainer><Typography color="gray">Cargando...</Typography></PageContainer>;
  }

  if (!pelicula) {
    return (
      <PageContainer>
        <Box textAlign="center">
          <IconButton component={Link} to="/" color="primary" sx={{ mb: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="#fff">
            Película no encontrada
          </Typography>
          <Typography variant="body2" color="gray">
            ID: {id}
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Box>
        <Box mb={2}>
          <IconButton component={Link} to="/" color="primary">
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Box>

        <StyledCard elevation={4}>
          <CardMedia
            component="img"
            height="200"
            image={pelicula.src}
            alt={pelicula.titulo}
          />
          <CardContent sx={{ px: 3, pt: 2, pb: 1 }}>
            <Typography variant="h6" gutterBottom color="#fff">
              {pelicula.titulo}
            </Typography>
            <Typography variant="body2" color="gray">
              {pelicula.descripcion}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', pr: 2, pb: 2 }}>
            {pelicula.trailer && (
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                size="medium"
                onClick={() => navigate(`/player/${pelicula.id}`)} // ✅ Navegación interna
              >
                Reproducir Trailer
              </Button>
            )}
          </CardActions>
        </StyledCard>
      </Box>
    </PageContainer>
  );
}
