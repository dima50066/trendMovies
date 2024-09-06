import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../api/tmdb";
import styles from "../styles/MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(setCast);
  }, [movieId]);

  return (
    <div className={styles.castList}>
      {cast.map((actor) => (
        <div key={actor.cast_id} className={styles.castItem}>
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            className={styles.actorImage}
          />
          <p className={styles.actorName}>{actor.name}</p>
          <p className={styles.characterName}>as {actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieCast;
