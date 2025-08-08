import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Typography, Box } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { useFavoritos } from '../context/FavoritosContext';
import PostCard from './PostCard';

const fadeIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Container = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1c1c1c);
  padding: 2rem;
`;

const Card = styled(Paper)`
  padding: 2rem;
  background-color: #1f1f1f !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  animation: ${fadeIn} 0.5s ease-out;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  text-transform: none !important;
  font-weight: 500;
  margin-top: 2rem;
`;

export default function Favoritos() {
  const { favoritos } = useFavoritos();

  return (
    <Container>
      <Card>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          style={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}
        >
          Mis películas favoritas
        </Typography>

        {favoritos.length === 0 ? (
          <Typography variant="body1" style={{ color: '#cccccc', textAlign: 'center' }}>
            Aún no agregaste ninguna película a favoritos.
          </Typography>
        ) : (
          <Grid>
            {favoritos.map((p) => (
              <PostCard key={p.id} {...p} />
            ))}
          </Grid>
        )}

        <Box textAlign="center">
          <StyledButton
            as={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            ← Volver al inicio
          </StyledButton>
        </Box>
      </Card>
    </Container>
  );
}
