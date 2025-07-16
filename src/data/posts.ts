export type Post = {
  id: number;
  titulo: string;
  descripcion: string;
  src: string;
  likes?: number;
  read: boolean;
  trailer?: string;
};

export const categories: Record<
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
        trailer: 'https://www.youtube.com/embed/qqTCZq7n6ms',
      },
      {
        id: 2,
        titulo: 'Blancanieves',
        descripcion:
          'Blancanieves’: Se estrena el 21 de marzo de 2025. Es una película de fantasía, aventuras que podrán disfrutar las familias. La dirige Mike Webb y en el reparto figuran Rachel Zegler y Gal Gadot.',
        src: '/Infantil/Infantil2.jpeg',
        read: false,
        trailer: 'https://www.youtube.com/embed/BE0BwFSYXOQ'
      },
      {
        id: 3,
        titulo: 'Dragon',
        descripcion:
          'Es una próxima película estadounidense de acción y fantasía producida por Marc Platt Productions y distribuida por Universal Pictures. Adaptación live-action de DreamWorks.',
        src: '/Infantil/Infantil3.jpeg',
        read: false,
      },
      {
        id: 4,
        titulo: 'Memoria de un Caracol',
        descripcion:
          'La vida de Grace, una chica a la que le gusta coleccionar caracoles y las novelas románticas, se desmorona tras la muerte de su padre.',
        src: '/Infantil/Infantil4.jpeg',
        read: false,
      },
      {
        id: 5,
        titulo: 'Rosalia',
        descripcion:
          'Esta película se trata del primer musical de Walt Disney. Es cierto que es un musical muy básico en su género y su trama es muy simplona.',
        src: '/Infantil/Infantil5.jpeg',
        read: false,
      },
      {
        id: 6,
        titulo: 'Animales en Apuro',
        descripcion:
          'La perrita de pura raza Gracie y el gato rescatado Pedro no tienen nada en común, pero cuando se separan de su familia durante una gran mudanza, deberán aprender a trabajar juntos para volver con su amada familia.',
        src: '/Infantil/Infantil6.jpeg',
        read: false,
      },
      {
        id: 7,
        titulo: 'El Viaje de Arlo',
        descripcion:
          'El viaje de Arlo nos traslada a un mundo donde el asteroide que terminó con los dinosaurios pasó de largo. Ahora dinosaurios y humanos deben convivir.',
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
          'Explosiones, persecuciones, acrobacias, tiros y puñetazos. Las mejores películas de acción reventarán las pantallas.',
        src: '/Accion/accion1.jpeg',
        read: false,
      },
      {
        id: 9,
        titulo: 'Jungla de Cristal',
        descripcion:
          'Dley se convierte en una heroína al estilo Jungla de Cristal en la película de acción más impactante de 2025.',
        src: '/Accion/accion2.jpeg',
        read: false,
      },
      {
        id: 10,
        titulo: 'Battlefield 2025',
        descripcion:
          'La rutina de un pueblo de Arizona se ve turbada por fugitivos, pero al caer la noche desciende un peligro mortal de las estrellas.',
        src: '/Accion/accion3.jpeg',
        read: false,
      },
      {
        id: 11,
        titulo: 'Mad MAX',
        descripcion:
          '“Furiosa: A Mad Max Saga”: claves del éxito global de una precuela que redefinió el cine de acción.',
        src: '/Accion/accion4.jpeg',
        read: false,
      },
      {
        id: 12,
        titulo: 'Superman',
        descripcion:
          'La película de Superman de 2025 forma parte del nuevo Universo DC (DCU).',
        src: '/Accion/accion5.jpeg',
        read: false,
      },
      {
        id: 13,
        titulo: 'Thunderbolts',
        descripcion:
          'Película de superhéroes de Marvel Studios, basada en el equipo homónimo de Marvel Comics.',
        src: '/Accion/accion6.jpeg',
        read: false,
      },
      {
        id: 30,
        titulo: 'Thunderbolts II',
        descripcion:
          'Thunderbolts II llegará a cines el 1 de mayo de 2025, como parte de la Fase 5 del MCU.',
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
        descripcion:
          'Entre las películas de suspenso de 2025 encontramos estrenos muy novedosos.',
        src: '/Suspenso/suspenso1.webp',
        read: false,
      },
      {
        id: 15,
        titulo: 'Planeta de los Simios',
        descripcion:
          'Mientras un nuevo líder simio construye su imperio, un joven simio emprende un viaje que le hará cuestionar todo.',
        src: '/Suspenso/suspenso2.webp',
        read: false,
      },
      {
        id: 16,
        titulo: 'Lifeline',
        descripcion:
          'Película de superhéroes de Marvel Studios producida en 2025.',
        src: '/Suspenso/suspenso3.webp',
        read: false,
      },
      {
        id: 17,
        titulo: 'ECHO',
        descripcion:
          'La nueva película de suspenso animada sorprende con su narrativa interplanetaria.',
        src: '/Suspenso/suspenso4.webp',
        read: false,
      },
      {
        id: 18,
        titulo: 'Novocaine',
        descripcion:
          'Novocaine es una película dirigida por Dan Berk y Robert Olsen, con Jack Quaid, Amber Midthunder.',
        src: '/Suspenso/suspenso5.webp',
        read: false,
      },
      {
        id: 19,
        titulo: 'Volver al Futuro',
        descripcion:
          'Una clásica mezcla de ciencia ficción y aventura que nunca pasa de moda.',
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
        descripcion:
          'Las últimas películas del Festival de Cannes 2025. 23 de mayo de 2025, 19:00. Roger Koza.',
        src: '/Musicales/musicales1.webp',
        read: false,
      },
      {
        id: 21,
        titulo: 'Blues Music',
        descripcion:
          'Un viaje quijotesco al blues local dirigido por Sergio Bonacci Lapalma.',
        src: '/Musicales/musicales2.webp',
        read: false,
      },
      {
        id: 23,
        titulo: 'M + Jazz',
        descripcion:
          'Festival M Jazz 2025 en el Parque Bicentenario con Gogo Penguin, Azymuth.',
        src: '/Musicales/musicales3.webp',
        read: false,
      },
      {
        id: 24,
        titulo: 'Loves',
        descripcion:
          'Todo el cine de estreno de 2025 que no nos queremos perder por nada del mundo.',
        src: '/Musicales/musicales4.webp',
        read: false,
      },
      {
        id: 25,
        titulo: 'Piano Rock',
        descripcion:
          'Las 47 películas más esperadas de 2025 y los mejores estrenos del año.',
        src: '/Musicales/musicales5.webp',
        read: false,
      },
      {
        id: 26,
        titulo: 'Nusica Total',
        descripcion:
          'Los mejores estrenos en Sundance, Cannes y Venecia que aún no se han anunciado.',
        src: '/Musicales/musicales6.webp',
        read: false,
      },
      {
        id: 27,
        titulo: 'Margaritas Ficticias',
        descripcion:
          'Margot Robbie regresa, clásicos como Bridget Jones y opciones para chicos.',
        src: '/Musicales/musicales7.webp',
        read: false,
      },
    ],
  },
};
