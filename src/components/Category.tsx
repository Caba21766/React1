import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/posts';
import PostCardContainer from './PostCardContainer';
import PostCard from './PostCard';

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const cat = id && categories[id];
  if (!cat) {
    return <h2>Categoría no encontrada: {id}</h2>;
  }
  return (
    <div style={{ padding: '24px' }}>
      <h1>{cat.title}</h1>
      <p>{cat.description}</p>
      <PostCardContainer title="" description="">
        {cat.posts.map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.titulo}
            description={post.descripcion}
            src={post.src}
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
