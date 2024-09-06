import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDM4ZTZhNGE0NjRiZDM5NDIyMDNiMjhjMGY3NjdhYiIsIm5iZiI6MTcyMzQ1NzAxMS4zNzkwNTgsInN1YiI6IjY2YjlkYjZhYWIxYmRiMWMwY2JkYzJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBRwL9i5DrInBcGn5OsqUmBR0an6iyJalenxV883JXU";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await tmdbApi.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await tmdbApi.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export { IMAGE_BASE_URL };
