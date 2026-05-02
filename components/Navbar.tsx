'use client';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Fernando Soria</a>
        </Typography>
        <Button color="inherit" href="#projects">Projects</Button>
        <Button color="inherit" href="#stack">Stack</Button>
        <Button color="inherit" href="#contact">Contact</Button>
      </Toolbar>
    </AppBar>
  );
}
