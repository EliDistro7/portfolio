'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';

const ConnectedGlobe = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const globeRef = useRef(null);
  const controlsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate random connection points around the globe
  const createConnectionPoints = (count = 20) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      // Generate random spherical coordinates
      const lat = Math.random() * Math.PI - Math.PI / 2;
      const lon = Math.random() * Math.PI * 2;
      
      // Convert to Cartesian coordinates (x,y,z) on unit sphere
      const x = Math.cos(lat) * Math.sin(lon);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lon);
      
      points.push({ position: new THREE.Vector3(x, y, z), connections: [] });
    }
    
    // Create connections between points
    for (let i = 0; i < points.length; i++) {
      const connectionCount = Math.floor(Math.random() * 3) + 1; // 1-3 connections per point
      
      for (let j = 0; j < connectionCount; j++) {
        // Find a random point to connect to
        let targetIndex;
        do {
          targetIndex = Math.floor(Math.random() * points.length);
        } while (targetIndex === i || points[i].connections.includes(targetIndex));
        
        points[i].connections.push(targetIndex);
      }
    }
    
    return points;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controlsRef.current = controls;
    
    // Create Earth globe
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('/earth_texture.jpg'),
      bumpMap: new THREE.TextureLoader().load('/earth_bump.jpg'),
      bumpScale: 0.04,
      shininess: 5,
    });
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: 'f', value: 0.2 },
        p: { type: 'f', value: 6 },
        glowColor: { type: 'c', value: new THREE.Color(0x00a8ff) },
        viewVector: { type: 'v3', value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.6 - dot(vNormal, vNormel), 3.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          gl_FragColor = vec4(glowColor, intensity);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    
    scene.add(globe);
    scene.add(glow);
    globeRef.current = globe;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Generate connection points and lines
    const connectionPoints = createConnectionPoints(25);
    const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    
    // Create markers and connections
    connectionPoints.forEach((point, index) => {
      // Create marker at point position
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(point.position);
      scene.add(marker);
      
      // Create connections
      point.connections.forEach(targetIndex => {
        const target = connectionPoints[targetIndex];
        
        // Create curve for the connection line
        const curve = new THREE.QuadraticBezierCurve3(
          point.position,
          new THREE.Vector3(
            (point.position.x + target.position.x) * 0.5,
            (point.position.y + target.position.y) * 0.5,
            (point.position.z + target.position.z) * 0.5
          ).normalize().multiplyScalar(1.5),
          target.position
        );
        
        // Create the line geometry
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.6
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      });
    });
    
    // Create stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02
    });
    
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = THREE.MathUtils.randFloatSpread(100);
      const y = THREE.MathUtils.randFloatSpread(100);
      const z = THREE.MathUtils.randFloatSpread(100);
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Rotate the globe slightly
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.001;
      }
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Update glow effect based on camera position
      if (glowMaterial.uniforms) {
        glowMaterial.uniforms.viewVector.value = new THREE.Vector3().subVectors(
          camera.position,
          globe.position
        );
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoaded(true);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of geometries and materials to avoid memory leaks
      if (globeGeometry) globeGeometry.dispose();
      if (globeMaterial) globeMaterial.dispose();
      if (glowGeometry) glowGeometry.dispose();
      if (glowMaterial) glowMaterial.dispose();
      if (markerGeometry) markerGeometry.dispose();
      if (markerMaterial) markerMaterial.dispose();
      if (starsGeometry) starsGeometry.dispose();
      if (starsMaterial) starsMaterial.dispose();
    };
  }, []);

  return (
    <motion.div
      className="w-full h-96 lg:h-screen/2 relative overflow-hidden rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div ref={containerRef} className="w-full h-full bg-transparent" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.div>
  );
};

export default ConnectedGlobe;