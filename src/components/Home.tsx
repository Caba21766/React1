// src/components/Home.tsx

import React, { useState, useEffect } from 'react';
import { categories, type Post } from '../data/posts';
import PostCard from './PostCard';
import PostCardContainer from './PostCardContainer';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #121212;
`;

const Sidebar = styled.aside`
  width: 200px;
  background: #1f1f1f;
  padding: 16px;
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SidebarTitle = styled.h2`
  margin: 0;
  color: #f9fafb;
  font-size: 1.25rem;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ active }) => (active ? '#007bff' : '#2a2a2a')};
  color: ${({ active }) => (active ? '#fff' : '#ccc')};
  border: none;
  border-radius: 0.375rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ active }) => (active ? '#006ae6' : '#333')};
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 24px;
  border: none;
  border-radius: 6px;
  background: #1f1f1f;
  color: #f1f1f1;
  font-size: 1rem;
  border: 1px solid #333;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<'Infantiles' | 'Accion' | 'Suspenso' | 'Musicales'>('Infantiles');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search.trim() === '') return;

    const foundCategory = Object.entries(categories).find(([cat, data]) =>
      data.posts.some(post => post.titulo.toLowerCase().includes(search.toLowerCase()))
    );

    if (foundCategory) {
      const categoryName = foundCategory[0] as 'Infantiles' | 'Accion' | 'Suspenso' | 'Musicales';
      if (categoryName !== selectedCategory) {
        setSelectedCategory(categoryName);
      }
    }
  }, [search]);

  const current = categories[selectedCategory];
  const postsFiltrados: Post[] = current.posts.filter(post =>
    post.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Sidebar>
        <SidebarTitle>Categorías</SidebarTitle>
        {Object.keys(categories).map(cat => (
          <CategoryButton
            key={cat}
            active={selectedCategory === cat}
            onClick={() => {
              setSelectedCategory(cat as any);
              setSearch('');
            }}
          >
            {cat}
          </CategoryButton>
        ))}
      </Sidebar>

      <Main>
        <SearchInput
          type="text"
          placeholder="Buscar película..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <PostCardContainer
          title={current.title}
          description={current.description}
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
