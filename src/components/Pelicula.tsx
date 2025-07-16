import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post } from '../data/posts';
import { categories } from '../data/posts';
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

// Fondo oscuro con Tailwind y styled-components
const PageContainer = styled.div`
  min-height: 100vh;
  background: #0f0f0f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
`;

// Card central con sombra suave y borde redondeado
const StyledCard = styled(Card)`
  max-width: 320px;
  background-color: #1f1f1f !important;
  border-radius: 1.5rem !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

export default function Pelicula() {
  const { id } = useParams<{ id: string }>();
  const allPosts: Post[] = Object.values(categories).flatMap((c) => c.posts);
  const peli = allPosts.find((p) => p.id === Number(id));

  if (!peli) {
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
            image={peli.src}
            alt={peli.titulo}
          />
          <CardContent sx={{ px: 3, pt: 2, pb: 1 }}>
            <Typography variant="h6" gutterBottom color="#fff">
              {peli.titulo}
            </Typography>
            <Typography variant="body2" color="gray">
              {peli.descripcion}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', pr: 2, pb: 2 }}>
            <Button
              component={Link}
              to={`/pelicula/${peli.id}/play`}
              variant="contained"
              startIcon={<PlayArrowIcon />}
              size="medium"
            >
              Reproducir Trailer
            </Button>
          </CardActions>
        </StyledCard>
      </Box>
    </PageContainer>
  );
}
