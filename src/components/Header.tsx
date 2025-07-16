// src/components/Header.tsx
import React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// 1) Importar las fonts desde Google  
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lexend+Deca:wght@400;500&display=swap');
`;

// 2) Animación de aparición  
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  height: 360px;
  background-image: url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.4)
  );
`;

const Title = styled.h1`
  position: relative;
  font-family: 'Bebas Neue', cursive;
  font-size: 4rem;
  margin: 0;
  /* degradado animado */
  background: linear-gradient(90deg, #ff416c, #ff4b2b, #f9c74f, #ff416c);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation:
    ${fadeIn} 1s ease-out,
    /* ciclado suave del degradado */
    gradientShift 8s ease infinite;
  z-index: 1;
  letter-spacing: 4px;

  @keyframes gradientShift {
    0%   { background-position:   0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position:   0% 50%; }
  }
`;

const Subtitle = styled.p`
  position: relative;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 1.3rem;
  color: #f1f1f1;
  margin-top: 0.5rem;
  z-index: 1;
  animation: ${fadeIn} 1.2s ease-out;
  letter-spacing: 2px;
`;

const Header: React.FC = () => (
  <>
    <GlobalStyle />
    <HeaderWrapper>
      <Overlay />
      <div style={{ textAlign: 'center', padding: '0 1rem' }}>
        <Title>Bienvenido a PeliNet</Title>
        <Subtitle>Descubre tus películas favoritas</Subtitle>
      </div>
    </HeaderWrapper>
  </>
);

export default Header;
