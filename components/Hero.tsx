'use client';
import { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import * as THREE from 'three';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const currentCanvas = canvasRef.current;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: currentCanvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 120, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1976d2,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.8,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pLight1 = new THREE.PointLight(0x9c27b0, 2, 100);
    pLight1.position.set(2, 3, 4);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0x1976d2, 2, 100);
    pLight2.position.set(-2, -3, 2);
    scene.add(pLight2);

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let reqId: number;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      torusKnot.rotation.y = elapsed * 0.2 + mouseX * 0.8;
      torusKnot.rotation.x = elapsed * 0.15 + mouseY * 0.8;
      particlesMesh.rotation.y = -elapsed * 0.03;
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'grey.900',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textShadow: '0 0 25px rgba(25, 118, 210, 0.4)', letterSpacing: 2 }}>
          Fernando Soria
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, color: 'grey.300', fontWeight: 300, textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
          Full Stack Developer
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="#projects" 
          size="large"
          sx={{
            borderRadius: '50px',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 0 15px rgba(25, 118, 210, 0.5)',
            textTransform: 'none',
            '&:hover': { boxShadow: '0 0 25px rgba(25, 118, 210, 0.8)' }
          }}
        >
          View My Work
        </Button>
      </Container>
    </Box>
  );
}
