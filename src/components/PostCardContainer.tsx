// src/components/PostCardContainer.tsx

import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const Section = styled.section`
  background: #1f1f1f;       /* negro más claro */
  padding: 1rem;             /* 16px alrededor */
  border-radius: 0.75rem;    /* esquinas redondeadas */
  text-align: center;        /* centra todo el texto */
`;

// Usa una tipografía profesional (Inter), mayúsculas y buen espaciado
const Title = styled.h2`
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-size: 2rem;           /* tamaño destacado */
  font-weight: 700;          /* más contundente */
  letter-spacing: 0.5px;     /* un ligero tracking */
  text-transform: uppercase; /* estilo más “edgy” */
  margin: 0 0 0.75rem;       /* 12px abajo */
  color: #f9fafb;            /* casi blanco */
`;

// Descripción con buena legibilidad y aire
const Desc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;           /* tamaño de lectura confortable */
  font-weight: 400;          /* peso normal */
  line-height: 1.6;          /* espacio entre líneas */
  letter-spacing: 0.25px;    /* tracking ligero */
  color: #c1c1c1;            /* gris suave */
  max-width: 600px;          /* evita líneas muy largas */
  margin: 0 auto 1.5rem;     /* centrado y 24px abajo */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.5rem;                /* 8px */
`;

export default function PostCardContainer({
  title,
  description,
  children
}: Props) {
  return (
    <Section>
      <Title>{title}</Title>
      {description && <Desc>{description}</Desc>}
      <Grid>{children}</Grid>
    </Section>
  );
}
