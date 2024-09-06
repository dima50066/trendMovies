import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

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

  const handleSearch = (event) => {
    setSearchParams({ query: event.target.value });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a movie..."
      />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
