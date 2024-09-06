import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navigation: React.FC = () => (
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
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navigation;
