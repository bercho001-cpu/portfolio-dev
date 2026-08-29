'use client';
import { Box, Container, Typography, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';

const projects = [
  {
    title: 'Estudiar Mucho 📚',
    description: 'Una aplicación web moderna para generar flashcards inteligentes desde cualquier documento usando IA.',
    liveUrl: 'https://estudiar-mucho.vercel.app/',
    githubUrl: 'https://github.com/bercho001-cpu/estudiar-mucho',
    image: '/estudiar-mucho.png',
  },
  {
    title: 'Ciclic 🔄',
    description: 'Plataforma web para estimación de costos, presupuestación modular, planes de pago fraccionados (cuotas/hitos) y control de flujo de caja para proyectos de desarrollo Web y Mobile Apps.',
    liveUrl: 'https://ciclic.fernandosoria.site/',
    githubUrl: 'https://github.com/bercho001-cpu/ciclic',
    image: '/ciclic.png',
  },
];

export default function Projects() {
  return (
    <Box id="projects" sx={{ py: 8, bgcolor: 'grey.800' }}>
      <Container>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }} gutterBottom>
          Projects
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4, justifyContent: 'center' }}>
          {projects.map((project, index) => (
            <Box key={index}>
              <Card sx={{ bgcolor: 'grey.700', color: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={project.image}
                  alt={project.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2">
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto' }}>
                  <Button size="small" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Preview</Button>
                  <Button size="small" href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
