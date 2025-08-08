import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/posts';
import { movieService } from '../data/movieService';
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


// ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ AGREGÁ ESTA FUNCIÓN ACÁ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️
function getEmbedUrl(url: string) {
  if (!url) return '';

  // Intenta extraer el ID de video de cualquier tipo de URL
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return '';
}
// ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ FIN DE LA FUNCIÓN ⬆️ ⬆️ ⬆️ ⬆️ ⬆️




const Container = styled(Box)`
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 900px;
  background-color: #1e1e1e;
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [peli, setPeli] = useState<any>(null);

  useEffect(() => {
    const cargarPelicula = async () => {
      // 🔍 Buscar en las categorías precargadas
      const fromCategories = Object.values(categories)
        .flatMap(c => c.posts)
        .find(p => String(p.id) === id);

      if (fromCategories) {
        setPeli(fromCategories);
        return;
      }

      // 🔍 Si no está, buscar en localStorage
      const local = await movieService.getMovieById(id!);
      setPeli(local);
    };

    cargarPelicula();
  }, [id]);

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
        {peli.trailer || peli.trailerUrl ? (
          

          <Box sx={{ position: 'relative', height: '360px', width: '100%' }}>
            <StyledIframe
              src={getEmbedUrl(peli.trailer || peli.trailerUrl)}
              title={peli.title || peli.titulo}
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
            Reproduciendo: {peli.title || peli.titulo}
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
