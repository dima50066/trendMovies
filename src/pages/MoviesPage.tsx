import React, { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import { Movie } from "../api/tmdb";
import { TextField, Container, Typography, Box } from "@mui/material";

const MoviesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        const results = await searchMovies(query);
        setMovies(results);
      };
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: event.target.value });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a movie..."
          size="small"
        />
      </Box>
      <MovieList movies={movies} />
    </Container>
  );
};

export default MoviesPage;
