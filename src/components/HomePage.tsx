import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import MovieList from "./MovieList";
import { Container, Typography, Box } from "@mui/material";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

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
