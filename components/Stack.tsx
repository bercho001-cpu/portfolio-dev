// components/Stack.tsx

  // Rest of the code
  
'use client';
import { Box, Container, Typography, Chip } from '@mui/material';

const skills = [
  'Next.js',
  'React',
  'TypeScript',
  'TailwindCSS',
  'Firebase',
  'Google Vertex AI',
  'Vercel AI SDK',
];

export default function Stack() {
  return (
    <Box id="stack" sx={{ py: 8, bgcolor: 'grey.900' }}>
      <Container>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }} gutterBottom>
          My Stack
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} sx={{ bgcolor: 'grey.700', color: 'white' }} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
