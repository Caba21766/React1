import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { categories, type Post } from '../data/posts';
import PostCard from './PostCard';
import PostCardContainer from './PostCardContainer';
import styled from 'styled-components';
import { movieService } from '../data/movieService';
import { editarCategoria as editarCategoriaUtil } from '../data/editarCategoria';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #111827;
  color: white;
`;

const Sidebar = styled.aside`
  background-color: #1f2937;
  padding: 1rem 0.75rem;
  width: 200px;
  min-height: 100vh;
  border-right: 1px solid #374151;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const SidebarTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const CategoryButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#3b82f6' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#d1d5db')};
  border: none;
  border-radius: 8px;
  text-align: left;
  padding: 10px 14px;
  margin-bottom: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#2563eb' : '#374151')};
    color: white;
    transform: scale(1.03);
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background-color: #1f2937;
  color: white;

  &::placeholder {
    color: #9ca3af;
  }
`;

export default function Home() {
  const location = useLocation();

  const [categorias, setCategorias] = useState(() => {
    const saved = localStorage.getItem('categorias');
    return saved ? JSON.parse(saved) : categories;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Infantiles');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [search, setSearch] = useState('');
  const [moviesDB, setMoviesDB] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }, [categorias]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoriaURL = params.get('categoria');
    if (categoriaURL && categorias[categoriaURL]) {
      setSelectedCategory(categoriaURL);
    }
  }, [location.search, categorias]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await movieService.getAllMovies();
      setMoviesDB(data);
    };
    fetchMovies();
  }, []);

  // 🔍 Reunir todas las películas fijas + dinámicas
  const peliculasTodas: Post[] = [
    ...Object.values(categorias).flatMap(cat =>
      cat.posts.map(post => ({
        id: post.id,
        titulo: post.titulo,
        descripcion: post.descripcion,
        src: post.src,
        read: post.read,
      }))
    ),
    ...moviesDB.map(p => ({
      id: p.id,
      titulo: p.title,
      descripcion: p.plot,
      src: p.poster,
      read: false,
    })),
  ];

  // 🧠 Filtrar si hay búsqueda
  const postsFiltrados: Post[] = search.trim()
    ? peliculasTodas.filter(post =>
        post.titulo.toLowerCase().includes(search.toLowerCase())
      )
    : [
        // Si no hay búsqueda, mostrar solo las de la categoría seleccionada
        ...categorias[selectedCategory]?.posts.map(post => ({
          id: post.id,
          titulo: post.titulo,
          descripcion: post.descripcion,
          src: post.src,
          read: post.read,
        })) || [],
        ...moviesDB
          .filter(p => p.genre.includes(selectedCategory))
          .map(p => ({
            id: p.id,
            titulo: p.title,
            descripcion: p.plot,
            src: p.poster,
            read: false,
          })),
      ];

  const editarCategoria = (categoriaActual: string) => {
    const nuevoNombre = prompt("Nuevo nombre de la categoría:", categoriaActual);
    if (!nuevoNombre || nuevoNombre.trim() === '') return;

    const resultado = editarCategoriaUtil({
      categoriaActual,
      nuevoNombre,
      categorias,
      moviesDB,
    });

    if (resultado.error) {
      alert(resultado.mensaje);
      return;
    }

    setCategorias(resultado.nuevasCategorias);
    setMoviesDB(resultado.peliculasActualizadas);
    setSelectedCategory(resultado.nuevaSeleccion);
    window.history.pushState(null, '', `/?categoria=${encodeURIComponent(resultado.nuevaSeleccion)}`);
  };

  const eliminarCategoria = (nombre: string) => {
    if (!window.confirm(`¿Eliminar la categoría "${nombre}"?`)) return;

    const nuevasCategorias = { ...categorias };
    delete nuevasCategorias[nombre];

    setCategorias(nuevasCategorias);
    localStorage.setItem('categorias', JSON.stringify(nuevasCategorias));

    if (selectedCategory === nombre) {
      setSelectedCategory('Infantiles');
      window.history.pushState(null, '', '/?categoria=Infantiles');
    }
  };

  return (
    <Layout>
      <Sidebar>
        <SidebarTitle>Categorías</SidebarTitle>

        {Object.keys(categorias).map(cat => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center' }}>
            <CategoryButton
              active={selectedCategory === cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearch('');
                window.history.pushState(null, '', `/?categoria=${encodeURIComponent(cat)}`);
              }}
              style={{ flex: 1 }}
            >
              {cat}
            </CategoryButton>

            <button onClick={() => editarCategoria(cat)} style={{ marginLeft: 4, color: '#ccc', background: 'transparent', border: 'none', cursor: 'pointer' }}>✏️</button>
            <button onClick={() => eliminarCategoria(cat)} style={{ marginLeft: 4, color: '#ccc', background: 'transparent', border: 'none', cursor: 'pointer' }}>🗑️</button>
          </div>
        ))}

        <input
          type="text"
          value={nuevaCategoria}
          placeholder="Nueva categoría"
          onChange={e => setNuevaCategoria(e.target.value)}
          style={{ marginTop: '1rem', padding: '6px', borderRadius: '4px' }}
        />

        <button
          onClick={() => {
            const nombre = nuevaCategoria.trim();
            if (!nombre || categorias[nombre]) return;

            const nuevasCategorias = {
              ...categorias,
              [nombre]: {
                title: nombre.toUpperCase(),
                description: `Películas de ${nombre}`,
                posts: []
              }
            };

            setCategorias(nuevasCategorias);
            localStorage.setItem('categorias', JSON.stringify(nuevasCategorias));
            setSelectedCategory(nombre);
            window.history.pushState(null, '', `/?categoria=${encodeURIComponent(nombre)}`);
            setNuevaCategoria('');
          }}
          style={{ marginTop: '6px', padding: '6px' }}
        >
          ➕ Agregar
        </button>
      </Sidebar>

      <Main>
        <SearchInput
          type="text"
          placeholder="Buscar película..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <PostCardContainer
          title={search ? `Resultados de: "${search}"` : categorias[selectedCategory]?.title}
          description={search ? `Películas encontradas con "${search}"` : categorias[selectedCategory]?.description}
        >
          {postsFiltrados.map(post => (
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
      </Main>
    </Layout>
  );
}
