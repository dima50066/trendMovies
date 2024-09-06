import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchMovieDetails, MovieDetails } from "../api/tmdb";
import { Card, CardMedia, CardContent, Typography, Box, Button, Grid } from "@mui/material";

const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(Number(movieId)).then(setMovieDetails);
    }
  }, [movieId]);

  if (!movieId || !movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box my={4}>
      <Card sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardMedia
          component="img"
          alt={movieDetails.title}
          image={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          sx={{
            width: 300, 
            height: 'auto', 
            objectFit: 'cover' 
          }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {movieDetails.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {movieDetails.overview}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Release Date: {movieDetails.release_date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Runtime: {movieDetails.runtime} minutes
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Vote Average: {movieDetails.vote_average}
          </Typography>
        </CardContent>
      </Card>

      <Box my={2}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              component={Link}
              to="cast"
              variant="contained"
              color="primary"
              fullWidth
            >
              Cast
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="reviews"
              variant="contained"
              color="primary"
              fullWidth
            >
              Reviews
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Outlet context={{ movieId }} />
    </Box>
  );
};

export default MovieDetailPage;
