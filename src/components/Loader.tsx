import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
  >
    <CircularProgress />
    <Typography variant="h6" mt={2}>Loading...</Typography>
  </Box>
);

export default Loader;
