export function editarCategoria({
  categoriaActual,
  nuevoNombre,
  categorias,
  moviesDB,
}: {
  categoriaActual: string;
  nuevoNombre: string;
  categorias: Record<string, any>;
  moviesDB: any[];
}) {
  const nuevoNombreTrim = nuevoNombre.trim();

  if (
    !nuevoNombreTrim ||
    nuevoNombreTrim === categoriaActual ||
    categorias[nuevoNombreTrim]
  ) {
    return { error: true, mensaje: 'Nombre inválido o ya existe.' };
  }

  // ✅ Renombrar categoría
  const nuevasCategorias = { ...categorias };
  nuevasCategorias[nuevoNombreTrim] = {
    ...nuevasCategorias[categoriaActual],
    title: nuevoNombreTrim.toUpperCase(),
    description: `Películas de ${nuevoNombreTrim}`,
  };
  delete nuevasCategorias[categoriaActual];

  // 🔁 Recuperar películas desde localStorage o fallback a moviesDB
  const peliculasGuardadas =
    JSON.parse(localStorage.getItem('moviesDB') || 'null') || moviesDB;

  // 🔁 Actualizar campo genre en cada película
  const peliculasActualizadas = peliculasGuardadas.map((p: any) => {
    // Si genre es un string (caso típico), lo comparamos directo
    if (typeof p.genre === 'string') {
      return {
        ...p,
        genre: p.genre === categoriaActual ? nuevoNombreTrim : p.genre,
      };
    }

    // Si genre es un array
    if (Array.isArray(p.genre)) {
      const nuevaGenre = p.genre.map((g: string) =>
        g === categoriaActual ? nuevoNombreTrim : g
      );
      return {
        ...p,
        genre: nuevaGenre,
      };
    }

    return p; // si no es ni string ni array
  });

  // 💾 Guardar en localStorage (moviesDB y categorias)
  localStorage.setItem('moviesDB', JSON.stringify(peliculasActualizadas));
  localStorage.setItem('categorias', JSON.stringify(nuevasCategorias));

  return {
    error: false,
    nuevasCategorias,
    peliculasActualizadas,
    nuevaSeleccion: nuevoNombreTrim,
  };
}
