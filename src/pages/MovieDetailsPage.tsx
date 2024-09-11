import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchMovieDetails, MovieDetails, fetchMovieTrailers, MovieTrailer } from "../api/tmdb";
import { Card, CardMedia, CardContent, Typography, Box, Button, Grid, useTheme, useMediaQuery } from "@mui/material";

const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movieTrailers, setMovieTrailers] = useState<MovieTrailer[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Media Query для мобільних пристроїв

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

  const youtubeTrailer = movieTrailers.find(trailer => trailer.site === "YouTube" && trailer.type === "Trailer");

  return (
    <Box my={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
          <CardMedia
            component="img"
            alt={movieDetails.title}
            image={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            sx={{
              width: isMobile ? '100%' : 300,
              height: isMobile ? 300 : 'auto',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <CardContent>
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
      </Box>

      <Box my={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2} direction="column">
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
          {youtubeTrailer && (
            <Grid item>
              <Button
                onClick={() => setShowTrailer(!showTrailer)}
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

      {showTrailer && youtubeTrailer && (
        <Box my={4}>
          <iframe
            width="100%"
            height={isMobile ? '200px' : '400px'}
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
