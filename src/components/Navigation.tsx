// src/components/Navigation.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface NavigationProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ toggleTheme, isDarkMode }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Movie App
      </Typography>
      <Box>
        <Button
          component={NavLink}
          to="/"
          sx={{
            color: 'white',
            textDecoration: 'none',
            '&.active': {
              borderBottom: '2px solid #fff',
            },
          }}
        >
          Home
        </Button>
        <Button
          component={NavLink}
          to="/movies"
          sx={{
            color: 'white',
            textDecoration: 'none',
            '&.active': {
              borderBottom: '2px solid #fff',
            },
          }}
        >
          Movies
        </Button>
        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navigation;
