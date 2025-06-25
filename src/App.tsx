import './App.css';
import { useState } from 'react';
import PostCard from './components/PostCard';
import PostCardContainer from './components/PostCardContainer';

type Post = {
  id: number;
  titulo: string;
  descripcion: string;
  src: string;
  likes?: number;
  read: boolean;
};

const categories: Record<
  string,
  {
    title: string;
    description: string;
    posts: Post[];
  }
> = {
  Infantiles: {
    title: 'Infantiles',
    description: 'Películas infantiles más vistas de la semana',
    posts: [
      {
        id: 1,
        titulo: 'Elio',
        descripcion:
          'La nueva película animada presenta a Elio, un niño lleno de imaginación que de repente es secuestrado por una organización interplanetaria compuesta por alienígenas de diferentes galaxias',
        src: '/Infantil/Infantil1.jpeg',
        read: false,
      },
      {
        id: 2,
        titulo: 'Blancanieves',
        descripcion:
          'Blancanieves’: Se estrena el 21 de marzo de 2025. Es una película de fantasía, aventuras que podrán disfrutar las familias. La dirige  Mike Webb y en el reparto figuran Rachel Zegler y Gal Gadot. ',
        src: '/Infantil/Infantil2.jpeg',
        read: false,
      },
      {
        id: 3,
        titulo: 'Dragon',
        descripcion:
          'es una próxima película estadounidense de acción y fantasía producida por Marc Platt Productions y distribuida por Universal Pictures. Una adaptación de acción real de la película animada de DreamWorks',
        src: '/Infantil/Infantil3.jpeg',
        read: false,
      },
      {
        id: 4,
        titulo: 'Memoria de un Caracol',
        descripcion:
          'La vida de Grace, una chica a la que le gusta coleccionar caracoles y las novelas románticas, se desmorona tras la muerte de su padre',
        src: '/Infantil/Infantil4.jpeg',
        read: false,
      },
      {
        id: 5,
        titulo: 'Rosalia',
        descripcion:
          'Esta película se trata del primer musical de Walt Disney. Es cierto que es un músical muy básico en su género y su trama es muy simplona',
        src: '/Infantil/Infantil5.jpeg',
        read: false,
      },
      {
        id: 6,
        titulo: 'Animales en Apuro',
        descripcion:
          ' La perrita de pura raza Gracie y el gato rescatado Pedro no tienen nada en común, pero cuando se separan de su familia durante una gran mudanza, deberán aprender a trabajar juntos para poder volver con su amada familia.',
        src: '/Infantil/Infantil6.jpeg',
        read: false,
      },
      {
        id: 7,
        titulo: 'El Viaje de Arlo',
        descripcion:
          'El viaje de Arlo nos traslada a un mundo donde el asteroide que terminó de forma dramática con los dinosaurios, pasa de largo. La consecuencia de este colosal cambio es que ahora los dinosaurios y los humanos tienen que vivir juntos',
        src: '/Infantil/Infantil7.jpeg',
        read: false,
      },
    ],
  },
  Accion: {
    title: 'Acción',
    description: 'Películas de acción más vistas',
    posts: [
      {
        id: 8,
        titulo: 'Terremoto',
        descripcion:
          'Explosiones, persecuciones, acrobacias, tiros y puñetazos. Las mejores películas de acción reventarán las pantallas de cine con el regreso de varios iconos del género.',
        src: '/Accion/accion1.jpeg',
        read: false,
      },
      {
        id: 9,
        titulo: 'Jungla de Cristal',
        descripcion:
          'dley se convierte en una heroína al estilo Jungla de Cristal en el nuevo tráiler de la película de acción que más impactará en 2025.',
        src: '/Accion/accion2.jpeg',
        read: false,
      },
      {
        id: 10,
        titulo: 'Battlefield 2025',
        descripcion:
          'La rutinaria vida de un pequeño pueblo de Arizona se ve turbada por la fuga de dos delicuentes sin escúpulos, pero al caer la noche el verdadero peligro mortal desciende de las esrtrellas.',
        src: '/Accion/accion3.jpeg',
        read: false,
      },
      {
        id: 11,
        titulo: 'Mad MAX',
        descripcion:
          'Furiosa: A Mad Max Saga": claves del éxito global de una precuela que redefinió el cine de acción',
        src: '/Accion/accion4.jpeg',
        read: false,
      },
      {
        id: 12,
        titulo: 'Superman',
        descripcion:
          'La película de Superman de 2025 no solo es una película de acción, sino que también forma parte del nuevo Universo DC (DCU). ',
        src: '/Accion/accion5.jpeg',
        read: false,
      },
      {
        id: 13,
        titulo: 'Thunderbolts',
        descripcion:
          'Una película de superhéroes estadounidense de 2025, basada en el equipo homónimo de Marvel Comics. Producida por Marvel Studios y distribuida por Walt Disney Studios Motion Pictures',
        src: '/Accion/accion6.jpeg',
        read: false,
      },
      {
        id: 30,
        titulo: 'Thunderbolts II',
        descripcion:
          'Thunderbolts llegará a los cines el 1 de mayo de 2025, como parte de la Fase 5 del MCU. Los fanáticos ya están especulando sobre cómo esta película podría influir en el futuro del universo Marvel',
        src: '/Accion/accion7.jpeg',
        read: false,
      },
    ],
  },
  Suspenso: {
    title: 'Suspenso',
    description: 'Películas que te mantienen al borde del asiento',
    posts: [
      {
        id: 14,
        titulo: 'Maldicion',
        descripcion: 'Entre las películas de acción de 2025 encontramos algunos estrenos muy novedosos así como propuestas ya conocidas desde hace un tiempo. ',
        src: '/Suspenso/suspenso1.webp',
        read: false,
      },
      {
        id: 15,
        titulo: 'Planeta de los Simios',
        descripcion: 'Mientras un nuevo y tiránico líder simio construye su imperio, un joven simio emprende un viaje desgarrador que le llevará a cuestionarse todo lo que sabe sobre el pasado y a tomar decisiones',
        src: '/Suspenso/suspenso2.webp',
        read: false,
      },
      {
        id: 16,
        titulo: 'Lifeline',
        descripcion: 'Una película de superhéroes estadounidense de 2025, basada en el equipo homónimo de Marvel Comics. Producida por Marvel Studios y distribuida por Walt Disney Studios Motion Pictures',
        src: '/Suspenso/suspenso3.webp',
        read: false,
      },
      {
        id: 17,
        titulo: 'ECHO',
        descripcion: 'La nueva película animada presenta a Elio, un niño lleno de imaginación que de repente es secuestrado por una organización interplanetaria compuesta por alienígenas de diferentes galaxias',
        src: '/Suspenso/suspenso4.webp',
        read: false,
      },
      {
        id: 18,
        titulo: 'Novocaine',
        descripcion: 'Novocaine es una película dirigida por Dan Berk, Robert Olsen con Jack Quaid, Amber Midthunder, Ray Nicholson, Jacob Batalon',
        src: '/Suspenso/suspenso5.webp',
        read: false,
      },
      {
        id: 19,
        titulo: 'Volver al Futuro',
        descripcion: 'Las mejores películas de acción reventarán las pantallas de cine con el regreso de varios iconos del género. Los amantes de los mamporros, las persecuciones, las acrobacias y los tiroteos',
        src: '/Suspenso/suspenso6.webp',
        read: false,
      },
    ],
  },
  Musicales: {
    title: 'Musicales',
    description: 'Videos llenos de ritmo y emoción',
    posts: [
      {
        id: 20,
        titulo: 'Festival de Musica Rock',
        descripcion: ' Las últimas películas del Festival de Cannes 2025. 23 de mayo de 2025, 19:00. Roger Koza. Compartir ',
        src: '/Musicales/musicales1.webp',
        read: false,
      },
      {
        id: 21,
        titulo: 'Blues Music',
        descripcion: 'Algo ha cambiado: Un viaje quijotesco al blues local es una película dirigida por Sergio Bonacci Lapalma. ',
        src: '/Musicales/musicales2.webp',
        read: false,
      },
      {
        id: 23,
        titulo: 'M + Jazz',
        descripcion: 'Por tercera ocasión, el Festival M Jazz se apoderará del Parque Bicentenario para su edición 2025. Gogo Penguin, Azymuth, Melanie Charles y más proyectos',
        src: '/Musicales/musicales3.webp',
        read: false,
      },
      {
        id: 24,
        titulo: 'Loves',
        descripcion: 'Todo el cine de estreno de 2025 que no nos queremos perder por nada del mundo. El 2025 está siendo un año cargado de grandes estrenos, como lo fue también su predecesor.',
        src: '/Musicales/musicales4.webp',
        read: false,
      },
      {
        id: 25,
        titulo: 'Piano Rock',
        descripcion: 'Las 47 películas más esperadas de 2025 y los mejores estrenos del año',
        src: '/Musicales/musicales5.webp',
        read: false,
      },
      {
        id: 26,
        titulo: 'Nusica Total',
        descripcion: 'Puede que aún no sepamos de algunas de las mejores películas del 2025. Podrían ser títulos que se estrenen en Sundance, Cannes y Venecia',
        src: '/Musicales/musicales6.webp',
        read: false,
      },
      {
        id: 27,
        titulo: 'Margaritas Ficticias',
        descripcion: 'Margot Robbie regresa a la pantalla, vuelven clásicos como Bridget Jones y también hay opciones para los más chicos, como Blancanieves y Elio',
        src: '/Musicales/musicales7.webp',
        read: false,
      },
    ],
  },
  Trailer: {
  title: 'Trailer de Peliculas Nuevas',
  description: 'Videos de tráileres disponibles',
  posts: [
    {
      id: 101,
      titulo: 'Jurassic World',
      descripcion: 'Tráiler oficial de Jurassic World El Renacer.',
      src: '/videos/dino.webp', // Asegurate que esta imagen exista también
      videoSrc: '/videos/RENACER.MP4',
      read: false,
    },
    {
      id: 102,
      titulo: 'Predator Badlands',
      descripcion: 'Tráiler de la nueva entrega de Predator.',
      src: '/videos/depredador.webp',
      videoSrc: '/videos/PREDATOR.MP4',
      read: false,
    },
    {
      id: 103,
      titulo: 'Humanity’s End',
      descripcion: 'Serie sci-fi: Humanity’s End – Tráiler.',
      src: '/videos/huma1.webp',
      videoSrc: '/videos/HUMANO.MP4',
      read: false,
    },
  ],
},
};
function App() {
  const [selectedCategory, setSelectedCategory] = useState('Infantiles');
  const [searchTerm, setSearchTerm] = useState('');
  const current = categories[selectedCategory];
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // 🔍 Filtra por búsqueda en cualquier categoría
  const allPosts = Object.values(categories).flatMap((cat) => cat.posts);

const filteredPosts = searchTerm
  ? allPosts.filter((post) =>
      post.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : categories[selectedCategory].posts;


  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 🔝 Header superior global */}
      
      <header
        style={{
          textAlign: 'center',
          padding: '0',
          color: 'white',
          borderBottom: '2px solid #ddd',
          position: 'relative',
        }}
      >
        {/* Fondo separado en su propio div */}
        <div
          style={{
            width: '100%',
            height: '30vh',
            minHeight: '180px',
            backgroundImage: 'url("/videos/zorro.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundColor: 'black',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Capa oscura opcional para contraste */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 1,
            }}
          />
          {/* Contenido sobre la imagen */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <h1 style={{ fontSize: '32px', margin: 0, textShadow: '2px 2px 4px black' }}>
              🎬 Películas
            </h1>
            <p style={{ fontSize: '16px', textShadow: '1px 1px 3px black' }}>
              Explorá nuestras categorías destacadas
            </p>
          </div>
        </div>
      </header>

      {/* 📂 Menú lateral + contenido */}
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Menú lateral */}


    <aside
      style={{
        width: '200px',
        backgroundColor: '#f9f9f9',
        padding: '16px',
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Categorías</h2>

      {/* 🔍 Buscador siempre visible */}
      <input
        type="text"
        placeholder="Buscar película..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '8px',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      />

      {/* Botones de categoría */}
      {Object.keys(categories).map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          style={{
            padding: '10px',
            backgroundColor: selectedCategory === cat ? '#007bff' : '#fff',
            color: selectedCategory === cat ? 'white' : '#333',
            border: '1px solid #ccc',
            borderRadius: '6px',
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          {cat}
        </button>
      ))}
    </aside>

{/* Contenido principal */}
<main style={{ flex: 1, padding: '24px' }}>

  <PostCardContainer
  title={searchTerm ? 'Resultados de búsqueda' : current.title}
  description={
    searchTerm
      ? 'Películas encontradas en todas las categorías'
      : current.description
  }
  isSearching={!!searchTerm} // 👈 importante
>

    {filteredPosts.map((post) => (
      <PostCard
        key={post.id}
        title={post.titulo}
        description={post.descripcion}
        src={post.src}
        read={post.read}
        handleClick={() => setSelectedVideo(post.videoSrc || null)} // <-- este es importante
      />
    ))}
  </PostCardContainer>

  {selectedVideo && (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>🎬 Reproduciendo Tráiler</h3>

      <video
        src={selectedVideo}
        controls
        autoPlay
        style={{
          width: '100%',
          maxWidth: '640px',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      />


      <br />
      <button
        onClick={() => setSelectedVideo(null)}
        style={{
          marginTop: '12px',
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Cerrar tráiler
      </button>
    </div>
  )}
</main>
</div>
</div>
  );
}

export default App;
