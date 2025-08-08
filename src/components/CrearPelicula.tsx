import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../data/movieService';
import {
  Container,
  Paper,
  Typography,
  Stack,
  TextField,
  Button
} from '@mui/material';

export default function CrearPelicula() {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [genre, setGenre] = useState('');
  const [plot, setPlot] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validación del tráiler
    if (
      !trailerUrl.startsWith('https://') ||
      !trailerUrl.includes('youtube.com/watch?v=')
    ) {
      alert('El tráiler debe comenzar con https:// y ser un enlace válido de YouTube');
      return;
    }

    // Guarda la película
    await movieService.createMovie({
      id: `local-${Date.now()}`,
      title,
      poster,
      genre: genre.trim(), // ✅ debe ser string simple
      plot,
      trailer: trailerUrl  // ✅ usar la misma key que movieService espera
    });

    alert('🎉 Película creada con éxito');

    // Redirige a la categoría si existe
    const categoria = genre.toLowerCase();
    const categoriasValidas = ['infantiles', 'accion', 'suspenso', 'musicales'];

    if (categoriasValidas.includes(categoria)) {
      const categoriaCapitalizada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
      navigate(`/?categoria=${categoriaCapitalizada}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, backgroundColor: '#dfdedeff', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          🎬 Crear Nueva Película
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="URL de Imagen"
              helperText="Ej: /Infantil/Infantil1.jpeg"
              variant="outlined"
              fullWidth
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              required
            />
            <TextField
              label="Género"
              helperText="Ej: Infantiles, Suspenso, Musicales, Accion"
              variant="outlined"
              fullWidth
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
              required
            />
            <TextField
              label="URL del Tráiler"
              helperText="Ej: https://www.youtube.com/watch?v=xxxx"
              variant="outlined"
              fullWidth
              value={trailerUrl}
              onChange={(e) => setTrailerUrl(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Guardar Película
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
