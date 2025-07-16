import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/posts';
import type { Post } from '../data/posts';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import styled from 'styled-components';

// Container principal en dark
const Container = styled(Box)`
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
`;

// Card del reproductor
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 900px;
  background-color: #1e1e1e;
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

// Estilo para el iframe
const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem 1rem 0 0;
`;

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const allPosts: Post[] = Object.values(categories).flatMap(c => c.posts);
  const peli = allPosts.find(p => p.id === Number(id));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!peli) {
    return (
      <Container>
        <StyledCard>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h6" color="white" gutterBottom>
              Reproductor: película no encontrada
            </Typography>
            <Typography variant="body2" color="gray">
              ID: {id}
            </Typography>
            <Box mt={3}>
              <Button variant="outlined" component={Link} to="/">
                ← Volver al inicio
              </Button>
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    );
  }

  return (
    <Container>
      <StyledCard>
        {peli.trailer ? (
          <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <StyledIframe
              src={peli.trailer}
              title={peli.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        ) : (
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="body1" color="white">
              No hay tráiler disponible.
            </Typography>
          </CardContent>
        )}

        <CardContent sx={{ backgroundColor: '#1e1e1e', textAlign: 'center' }}>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            color="white"
            gutterBottom
          >
            Reproduciendo: {peli.titulo}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to={`/pelicula/${peli.id}`}
            sx={{ mt: 2 }}
          >
            ← Volver a detalles
          </Button>
        </CardContent>
      </StyledCard>
    </Container>
  );
}
