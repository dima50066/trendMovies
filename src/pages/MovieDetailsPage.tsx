import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchMovieDetails, MovieDetails, fetchMovieTrailers, MovieTrailer } from "../api/tmdb";
import { Card, CardMedia, CardContent, Typography, Box, Button, Grid } from "@mui/material";

const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movieTrailers, setMovieTrailers] = useState<MovieTrailer[]>([]);
  const [showTrailer, setShowTrailer] = useState(false); // Додаємо стан для рендерингу трейлера

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(Number(movieId)).then(setMovieDetails);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      fetchMovieTrailers(Number(movieId)).then(setMovieTrailers);
    }
  }, [movieId]);

  if (!movieId || !movieDetails) {
    return <div>Loading...</div>;
  }

  // Знаходимо перший трейлер з YouTube
  const youtubeTrailer = movieTrailers.find(trailer => trailer.site === "YouTube" && trailer.type === "Trailer");

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
          {youtubeTrailer && ( // Показуємо кнопку "Watch Trailer", якщо трейлер доступний
            <Grid item>
              <Button
                onClick={() => setShowTrailer(!showTrailer)} // Перемикаємо показ трейлера
                variant="contained"
                color="secondary"
                fullWidth
              >
                {showTrailer ? "Hide Trailer" : "Watch Trailer"}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      {showTrailer && youtubeTrailer && ( // Рендеримо трейлер при натисканні кнопки
        <Box my={4}>
          <iframe
            width="100%"
            height="400px"
            src={`https://www.youtube-nocookie.com/embed/${youtubeTrailer.key}`}
            title="Movie Trailer"
            allowFullScreen
          />
        </Box>
      )}

      <Outlet context={{ movieId }} />
    </Box>
  );
};

export default MovieDetailPage;
