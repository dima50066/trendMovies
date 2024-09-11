// src/App.tsx
import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
import Navigation from "./components/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import { getCurrentTheme, setCurrentTheme, themes } from "./utils/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader"; // Імпортуємо Loader

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailsPage"));
const MovieReviews = lazy(() => import("./components/MovieReviews"));
const MovieCast = lazy(() => import("./components/MovieCast"));

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(getCurrentTheme().palette.mode);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <Router>
      <ThemeProvider theme={themes[theme]}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box my={4}>
            <Navigation onThemeToggle={handleThemeToggle} currentTheme={theme} />
            <Suspense fallback={<Loader />}> {/* Додаємо Loader як fallback */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:movieId" element={<MovieDetailPage />}>
                  <Route path="cast" element={<MovieCast />} />
                  <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Box>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
