import { Movie } from "../types";

/**
 * Service to bridge TMDB metadata requests to Cinemood's local formats.
 * Keeps structural design fluid for developers during third-party integration stages.
 */
export const tmdbService = {
  apiKey: "YOUR_TMDB_API_KEY", // Loaded dynamically (e.g. process.env.VITE_TMDB_KEY)
  baseUrl: "https://api.themoviedb.org/3",
  imageBackdropUrl: "https://image.tmdb.org/t/p/original",
  imagePosterUrl: "https://image.tmdb.org/t/p/w500",

  /**
   * Fetches trending movies from TMDB and maps them to our Cinemood Movie structure
   */
  getTrending: async (): Promise<Partial<Movie>[]> => {
    try {
      const response = await fetch(`${tmdbService.baseUrl}/trending/movie/week?api_key=${tmdbService.apiKey}`);
      if (!response.ok) return [];
      const data = await response.json();
      
      return data.results.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        storyline: item.overview,
        backdrop: `${tmdbService.imageBackdropUrl}${item.backdrop_path}`,
        poster: `${tmdbService.imagePosterUrl}${item.poster_path}`,
        imdbRating: parseFloat(item.vote_average.toFixed(1)),
        year: new Date(item.release_date).getFullYear(),
        genres: [] // Tapped dynamically via separate category fetch
      }));
    } catch {
      return [];
    }
  },

  /**
   * Fetches movie trailer keys from TMDB videos end-node
   */
  getMovieTrailer: async (tmdbId: string): Promise<string | null> => {
    try {
      const response = await fetch(`${tmdbService.baseUrl}/movie/${tmdbId}/videos?api_key=${tmdbService.apiKey}`);
      if (!response.ok) return null;
      const data = await response.json();
      
      const trailer = data.results.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
      return trailer ? trailer.key : null;
    } catch {
      return null;
    }
  }
};
