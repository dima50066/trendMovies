import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface NavigationProps {
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

const Navigation: React.FC<NavigationProps> = ({ onThemeToggle, currentTheme }) => (
  <AppBar position="static">
    <Toolbar sx={{ padding: 1 }}>
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
        <Button onClick={onThemeToggle} sx={{ ml: 2, color: 'white' }}>
          {currentTheme === 'light' ? <Brightness4 /> : <Brightness7 />}
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navigation;
