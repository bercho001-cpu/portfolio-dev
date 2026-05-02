'use client';
import { Box, Container, Typography, Button } from '@mui/material';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'grey.900',
        color: 'white',
      }}
    >
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          Fernando Soria
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Full Stack Developer
        </Typography>
        <Button variant="contained" color="primary" href="#projects" size="large">
          View My Work
        </Button>
      </Container>
    </Box>
  );
}
