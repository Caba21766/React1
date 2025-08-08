export const movieService = {
  async getAllMovies() {
    const stored = localStorage.getItem('moviesDB');
    return stored ? JSON.parse(stored) : [];
  },

  async getMovieById(id: string) {
    const stored = localStorage.getItem('moviesDB');
    const movies = stored ? JSON.parse(stored) : [];
    return movies.find((m: any) => m.id === Number(id));
  },

  async createMovie(data: any) {
    const stored = localStorage.getItem('moviesDB');
    const movies = stored ? JSON.parse(stored) : [];

    let trailerUrl = data.trailer;

    if (trailerUrl?.includes('watch?v=')) {
      const match = trailerUrl.match(/v=([^&]+)/);
      if (match && match[1]) {
        trailerUrl = `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    const newMovie = {
      ...data,
      id: Date.now(),
      trailer: trailerUrl,
    };

    movies.push(newMovie);
    localStorage.setItem('moviesDB', JSON.stringify(movies));
    return newMovie;
  },

  async updateMovie(id: number, updatedData: any) {
    const stored = localStorage.getItem('moviesDB');
    const movies = stored ? JSON.parse(stored) : [];

    const index = movies.findIndex((m: any) => m.id === id);
    if (index !== -1) {
      movies[index] = { ...movies[index], ...updatedData };

      if (updatedData.trailer?.includes('watch?v=')) {
        const match = updatedData.trailer.match(/v=([^&]+)/);
        if (match && match[1]) {
          movies[index].trailer = `https://www.youtube.com/embed/${match[1]}`;
        }
      }

      localStorage.setItem('moviesDB', JSON.stringify(movies));
      return movies[index];
    }

    return null;
  },

  async deleteMovie(id: number) {
    const stored = localStorage.getItem('moviesDB');
    const movies = stored ? JSON.parse(stored) : [];

    const updatedMovies = movies.filter((m: any) => m.id !== id);
    localStorage.setItem('moviesDB', JSON.stringify(updatedMovies));
    return true;
  }
};
