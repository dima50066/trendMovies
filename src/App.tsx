// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navigation from "./components/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import { lightTheme, darkTheme } from "./utils/theme";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const MoviesPage = React.lazy(() => import("./pages/MoviesPage"));
const MovieDetailPage = React.lazy(() => import("./pages/MovieDetailsPage"));
const MovieReviews = React.lazy(() => import("./components/MovieReviews"));
const MovieCast = React.lazy(() => import("./components/MovieCast"));

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box my={4}>
            <Navigation toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:movieId" element={<MovieDetailPage />}>
                  <Route path="cast" element={<MovieCast />} />
                  <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </React.Suspense>
          </Box>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
