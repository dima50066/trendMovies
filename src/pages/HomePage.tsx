import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import { Container, Typography, Box } from "@mui/material";
import { Movie } from "../api/tmdb";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Trending Movies
        </Typography>
        <MovieList movies={movies} />
      </Box>
    </Container>
  );
};

export default HomePage;
