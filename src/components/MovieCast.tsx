import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchMovieCredits, CastMember } from "../api/tmdb";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const MovieCast: React.FC = () => {
  const { movieId } = useOutletContext<{ movieId: string }>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const defaultImage = "https://via.placeholder.com/500x750?text=No+Image";

  useEffect(() => {
    if (movieId) {
      fetchMovieCredits(Number(movieId)).then(setCast);
    }
  }, [movieId]);

  if (!movieId) {
    return <Typography variant="h6">No movie selected.</Typography>;
  }

  return (
    <Box my={4} display="flex" flexWrap="wrap" gap={3}>
      {cast.map((actor) => (
        <Box key={actor.cast_id} width={{ xs: '100%', sm: '48%', md: '30%', lg: '22%' }}>
          <Card>
            <CardMedia
              component="img"
              image={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : defaultImage}
              alt={actor.name}
              sx={{ height: 300, objectFit: 'cover' }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = defaultImage;
              }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {actor.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                as {actor.character}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default MovieCast;
