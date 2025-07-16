import { createRoot } from 'react-dom/client';
import './index.css';

const container = document.querySelector('#root');

const app = (
  <div>
    <h1 className="hello-title">Hola info!</h1>
    <button>Click me!</button>
  </div>
);

if (!container) {
  throw new Error('Ese elemento no existe');
}

const root = createRoot(container);
root.render(app);
