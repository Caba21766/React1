import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { movieService } from '../data/movieService';
import {
  Container,
  Paper,
  Typography,
  Stack,
  TextField,
  Button
} from '@mui/material';

export default function EditarPelicula() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [genre, setGenre] = useState('');
  const [plot, setPlot] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const cargarPelicula = async () => {
      const pelicula = await movieService.getMovieById(id);
      if (pelicula) {
        setTitle(pelicula.title || '');
        setPoster(pelicula.poster || pelicula.src || '');
        setGenre((pelicula.genre || [])[0] || '');
        setPlot(pelicula.plot || '');
        setTrailerUrl(pelicula.trailerUrl || pelicula.trailer || '');
      }
    };

    cargarPelicula();
  }, [id]);

  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !trailerUrl.startsWith('https://') ||
    !trailerUrl.includes('youtube.com/watch?v=')
  ) {
    alert('El tráiler debe comenzar con https:// y ser un enlace válido de YouTube');
    return;
  }

  await movieService.updateMovie(Number(id), {
    title,
    poster,
    genre: [genre],
    plot,
    trailer: trailerUrl, // 👈 CORREGIDO
  });

  alert('🎉 Película actualizada');
  navigate(`/pelicula/${id}`);
};




  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, backgroundColor: '#dfdedeff' }}>
        <Typography variant="h4" gutterBottom>
          ✏️ Editar Película
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Título" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
            <TextField label="URL de Imagen" value={poster} onChange={(e) => setPoster(e.target.value)} fullWidth required />
            <TextField label="Género" value={genre} onChange={(e) => setGenre(e.target.value)} fullWidth required />
            <TextField label="Descripción" value={plot} onChange={(e) => setPlot(e.target.value)} fullWidth multiline required />
            <TextField label="URL del Tráiler" value={trailerUrl} onChange={(e) => setTrailerUrl(e.target.value)} fullWidth required />
            <Button type="submit" variant="contained" color="primary">
              Guardar Cambios
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
