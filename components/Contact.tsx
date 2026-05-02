// components/Contact.tsx

  // Rest of the code
  
'use client';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Contact() {
  return (
    <Box id="contact" sx={{ py: 8, bgcolor: 'grey.800', color: 'white' }}>
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Me
        </Typography>
        <Typography variant="body1" gutterBottom>
          bercho001@gmail.com
        </Typography>
        <Typography variant="body1" gutterBottom>
          +542944781823
        </Typography>
        <Box>
          <IconButton color="inherit" href="https://www.linkedin.com/in/fernando-soria-a966903b3/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" href="https://github.com/bercho001-cpu" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com/fersoria.1/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
