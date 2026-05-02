// components/Footer.tsx

  // Rest of the code
  
// components/Footer.tsx

  // Rest of the code
  
'use client';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'grey.900', color: 'white' }}>
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Fernando Soria. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
