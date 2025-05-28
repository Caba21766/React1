import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.querySelector('#root');
const element = createElement(
  'h1',
  {
    class: 'hello-title',
  },
  'Hola info!'
);

console.log(element);

if (!container) {
  throw new Error('Ese elemento no existe');
}

const root = createRoot(container);
root.render(element);
