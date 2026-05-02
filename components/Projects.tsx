'use client';
import { Box, Container, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

export default function Projects() {
  return (
    <Box id="projects" sx={{ py: 8, bgcolor: 'grey.800' }}>
      <Container>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }} gutterBottom>
          Projects
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4, justifyContent: 'center' }}>
          <Box>
            <Card sx={{ bgcolor: 'grey.700', color: 'white' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Estudiar Mucho 📚
                </Typography>
                <Typography variant="body2">
                  Una aplicación web moderna para generar flashcards inteligentes desde cualquier documento usando IA.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="https://estudiar-mucho.vercel.app/" target="_blank" rel="noopener noreferrer">Live Preview</Button>
                <Button size="small" href="https://github.com/bercho001-cpu/estudiar-mucho" target="_blank" rel="noopener noreferrer">GitHub</Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
