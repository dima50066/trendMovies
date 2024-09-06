import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Grid, Box } from "@mui/material";
import { Movie, IMAGE_BASE_URL } from "../api/tmdb";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const location = useLocation();

  return (
    <Box my={4}>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location }}
                style={{ textDecoration: 'none' }} // Щоб не було підкреслення на зображенні
              >
                <CardMedia
                  component="img"
                  alt={movie.title}
                  height="400" // Збільшена висота постера
                  image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  sx={{ objectFit: 'cover' }} // Забезпечує належне масштабування
                />
              </Link>
              <CardContent>
                <Typography variant="h6" component="h2">
                  <Link
                    to={`/movies/${movie.id}`}
                    state={{ from: location }}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {movie.title}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
