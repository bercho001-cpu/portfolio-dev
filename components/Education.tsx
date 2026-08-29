'use client';
import { Box, Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const complementaryFormations = [
  'Formación Inicial en Programación — Oracle Next Education (ONE)',
  'Formación en Business Agility — Oracle Next Education (ONE)',
  'Formación en Java Orientado a Objetos — Oracle Next Education (ONE)',
  'Formación Front End — Oracle Next Education (ONE)',
  'Formación Oracle Cloud Infrastructure — Oracle Next Education (ONE)',
];

export default function Education() {
  return (
    <Box id="education" sx={{ py: 8, bgcolor: 'grey.800', color: 'white' }}>
      <Container>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 6 }} gutterBottom>
          Education
        </Typography>
        <Grid container spacing={4}>
          {/* Formación Académica */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'grey.700', color: 'white', height: '100%', borderLeft: '4px solid #1976d2' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ color: '#1976d2', mr: 1, fontSize: 30 }} />
                  <Typography variant="h5" component="h3">
                    Educación Universitaria
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Ing. en Computación
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'grey.300' }}>
                  Univ. Nacional de Río Negro
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
                  2022 – 2023
                </Typography>
                <Typography variant="body1">
                  Cursado aprobado hasta 2° Año.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Formación Complementaria */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'grey.700', color: 'white', height: '100%', borderLeft: '4px solid #9c27b0' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkspacePremiumIcon sx={{ color: '#9c27b0', mr: 1, fontSize: 30 }} />
                  <Typography variant="h5" component="h3">
                    Formación Complementaria
                  </Typography>
                </Box>
                <List dense>
                  {complementaryFormations.map((formation, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <WorkspacePremiumIcon sx={{ color: '#9c27b0', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={formation.split(' — ')[0]} 
                        secondary={formation.split(' — ')[1]}
                        primaryTypographyProps={{ style: { color: 'white', fontWeight: 500 } }}
                        secondaryTypographyProps={{ style: { color: '#b55fe6' } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}