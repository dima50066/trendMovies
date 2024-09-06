import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const NotFoundPage: React.FC = () => (
  <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
    }}
  >
    <Typography variant="h2" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="body1" paragraph>
      Sorry, the page you are looking for does not exist.
    </Typography>
    <Button
      component={Link}
      to="/"
      variant="contained"
      color="primary"
    >
      Go to Home
    </Button>
  </Container>
);

export default NotFoundPage;
