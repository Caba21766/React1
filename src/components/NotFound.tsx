import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 p-6">
      <h1 className="text-5xl font-bold mb-4">❌ 404</h1>
      <p className="text-xl mb-6">Página no encontrada</p>
      <Link to="/" className="text-blue-500 hover:text-blue-400 transition">
        ← Volver al inicio
      </Link>
    </div>
  );
}
