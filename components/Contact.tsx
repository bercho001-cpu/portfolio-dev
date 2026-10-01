'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedbackMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to send your message. Please try again later.');
      }

      setStatus('success');
      setFeedbackMessage('Thank you! Your message has been sent successfully. I will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setFeedbackMessage(
        err instanceof Error
          ? err.message
          : 'Failed to send your message. Please try again or contact me directly via email.'
      );
    }
  };

  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'grey.800', color: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
            Get In Touch
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.300', maxWidth: 600, mx: 'auto' }}>
            Have a project in mind, a question, or want to explore collaboration opportunities?
            Feel free to send a message or reach out directly!
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
          }}
        >
          {/* Left Column: Direct Info & Socials */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: 'grey.900',
                color: 'white',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }} gutterBottom>
                Contact Details
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400', mb: 3 }}>
                I am currently open to freelance opportunities, frontend/full-stack roles, and interesting projects.
              </Typography>

              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: '50%',
                      bgcolor: 'rgba(25, 118, 210, 0.15)',
                      color: 'primary.light',
                      display: 'flex',
                    }}
                  >
                    <EmailIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'grey.400', display: 'block' }}>
                      Email
                    </Typography>
                    <MuiLink
                      href="mailto:bercho001@gmail.com"
                      underline="hover"
                      sx={{ color: 'white', fontWeight: 500, wordBreak: 'break-all' }}
                    >
                      bercho001@gmail.com
                    </MuiLink>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: '50%',
                      bgcolor: 'rgba(25, 118, 210, 0.15)',
                      color: 'primary.light',
                      display: 'flex',
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'grey.400', display: 'block' }}>
                      Phone / WhatsApp
                    </Typography>
                    <MuiLink
                      href="tel:+542944796292"
                      underline="hover"
                      sx={{ color: 'white', fontWeight: 500 }}
                    >
                      +54 2944 79-6292
                    </MuiLink>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: '50%',
                      bgcolor: 'rgba(25, 118, 210, 0.15)',
                      color: 'primary.light',
                      display: 'flex',
                    }}
                  >
                    <LocationOnIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'grey.400', display: 'block' }}>
                      Location
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                      Bariloche, Argentina &bull; Remote Worldwide
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <Typography variant="subtitle2" sx={{ color: 'grey.400', mb: 1.5 }}>
                  Connect on Social Media
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    color="primary"
                    href="https://www.linkedin.com/in/fernando-soria-a966903b3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fernando Soria on LinkedIn"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.25)' },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href="https://github.com/bercho001-cpu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fernando Soria on GitHub"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.25)' },
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href="https://www.instagram.com/fersoria.1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fernando Soria on Instagram"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.25)' },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Right Column: Contact Form */}
          <Paper
            component="form"
            onSubmit={handleSubmit}
            noValidate
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              bgcolor: 'grey.900',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }} gutterBottom>
              Send a Message
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', mb: 3 }}>
              Leave your details below and I&apos;ll get in touch with you directly via email.
            </Typography>

            {status === 'success' && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {feedbackMessage}
              </Alert>
            )}

            {status === 'error' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {feedbackMessage}
              </Alert>
            )}

            <Stack spacing={2.5}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  required
                  id="contact-name"
                  name="name"
                  label="Your Name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  fullWidth
                  required
                  id="contact-email"
                  name="email"
                  type="email"
                  label="Your Email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  variant="outlined"
                  size="small"
                />
              </Box>

              <TextField
                fullWidth
                id="contact-subject"
                name="subject"
                label="Subject"
                placeholder="e.g. Project Inquiry / Web Development"
                value={formData.subject}
                onChange={handleChange}
                disabled={status === 'loading'}
                variant="outlined"
                size="small"
              />

              <TextField
                fullWidth
                required
                id="contact-message"
                name="message"
                label="Message"
                placeholder="Tell me about your project, timeline, or whatever is on your mind..."
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                variant="outlined"
                multiline
                rows={4}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={status === 'loading'}
                startIcon={
                  status === 'loading' ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SendIcon />
                  )
                }
                sx={{
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 1.5,
                }}
              >
                {status === 'loading' ? 'Sending Message...' : 'Send Message'}
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
