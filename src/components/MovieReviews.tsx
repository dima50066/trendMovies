import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchMovieReviews, Review } from "../api/tmdb";
import { Box, Typography, Paper, Divider } from "@mui/material";

const MovieReviews: React.FC = () => {
  const { movieId } = useOutletContext<{ movieId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (movieId) {
      fetchMovieReviews(Number(movieId)).then(setReviews);
    }
  }, [movieId]);

  if (!movieId) {
    return <Typography variant="h6">No movie selected.</Typography>;
  }

  return (
    <Box my={4}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Paper key={review.id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Review by {review.author}
            </Typography>
            <Divider sx={{ marginY: 1 }} />
            <Typography variant="body1">
              {review.content}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No reviews found.</Typography>
      )}
    </Box>
  );
};

export default MovieReviews;
