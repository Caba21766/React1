import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCardContainer from './PostCardContainer';
import PostCard from './PostCard';
import { movieService } from '../data/movieService';

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const [peliculas, setPeliculas] = useState<any[]>([]);

  useEffect(() => {
    const cargarPeliculas = async () => {
      const todas = await movieService.getAllMovies();
      const filtradas = todas.filter((p) =>
        p.genre?.includes(id)
      );
      setPeliculas(filtradas);
    };

    cargarPeliculas();
  }, [id]);

  if (!id) return <h2>Sin categoría seleccionada</h2>;

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ textTransform: 'uppercase' }}>{id}</h1>
      <p>Películas de {id}</p>

      <PostCardContainer title="" description="">
        {peliculas.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.plot}
            src={post.poster || post.src}
            read={post.read}
          />
        ))}
      </PostCardContainer>

      <p>
        <Link to="/">← Volver al inicio</Link>
      </p>
    </div>
  );
}
