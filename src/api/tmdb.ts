import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDM4ZTZhNGE0NjRiZDM5NDIyMDNiMjhjMGY3NjdhYiIsIm5iZiI6MTcyMzQ1NzAxMS4zNzkwNTgsInN1YiI6IjY2YjlkYjZhYWIxYmRiMWMwY2JkYzJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBRwL9i5DrInBcGn5OsqUmBR0an6iyJalenxV883JXU";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

 export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
}

export interface CastMember {
  cast_id: number;
  character: string;
  name: string;
  profile_path: string;
}

export interface Review {
  id: string | number;
  author: string;
  content: string;
}

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const response = await tmdbApi.get<{ results: Movie[] }>("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await tmdbApi.get<{ results: Movie[] }>("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await tmdbApi.get<MovieDetails>(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId: number): Promise<CastMember[]> => {
  const response = await tmdbApi.get<{ cast: CastMember[] }>(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId: number): Promise<Review[]> => {
  const response = await tmdbApi.get<{ results: Review[] }>(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export { IMAGE_BASE_URL  };
