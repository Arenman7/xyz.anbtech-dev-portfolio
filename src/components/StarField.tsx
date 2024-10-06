// StarField component: Creates an interactive starfield background with hyperdrive effect
import React, { useEffect, useRef, useState } from 'react';

// Define the structure for a single star
interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  trail: { x: number; y: number }[];
}

// Props for the StarField component
interface StarFieldProps {
  isHyperdrive: boolean;
  isPaused: boolean;
}

const StarField: React.FC<StarFieldProps> = ({ isHyperdrive, isPaused }) => {
  // Refs and state for managing the starfield
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef(0.1);

  useEffect(() => {
    // Initialize canvas and context
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define star colors
    const numStars = 1000;
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#FFD700',
      '#87CEFA',
    ];

    // Initialize stars if not already done
    if (starsRef.current.length === 0) {
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: (Math.random() - 0.5) * canvas.width * 3,
          y: (Math.random() - 0.5) * canvas.height * 3,
          z: Math.random() * 1000,
          size: Math.random() * 0.3 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          trail: [],
        });
      }
    }

    let animationFrameId: number;

    // Main drawing function for stars
    function drawStars() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Adjust speed based on hyperdrive state
      const targetSpeed = isHyperdrive ? 20 : 0.2;
      speedRef.current += (targetSpeed - speedRef.current) * 0.05;

      starsRef.current.forEach((star) => {
        // Update star position if not paused
        if (!isPaused) {
          star.z -= speedRef.current;
          if (star.z <= 1) {
            // Reset star position when it reaches the screen
            star.z = 1000;
            star.x = (Math.random() - 0.5) * canvas.width * 3;
            star.y = (Math.random() - 0.5) * canvas.height * 3;
            star.trail = [];
          }
        }

        // Calculate star position and size on screen
        const scale = 1000 / (star.z + 1);
        const x = star.x * scale + canvas.width / 2;
        const y = star.y * scale + canvas.height / 2;
        const size = Math.max(0.1, star.size * scale);

        // Draw star if it's within the canvas bounds
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          // Draw star trail
          if (speedRef.current > 1 && !isPaused) {
            star.trail.unshift({ x, y });
            if (star.trail.length > 10) star.trail.pop();

            ctx.beginPath();
            ctx.moveTo(x, y);
            star.trail.forEach((point, index) => {
              ctx.lineTo(point.x, point.y);
              const alpha =
                (Math.max(0, 1 - index / 10) * (speedRef.current - 1)) / 9;
              ctx.strokeStyle = `${star.color}${Math.floor(alpha * 255)
                .toString(16)
                .padStart(2, '0')}`;
              ctx.lineWidth = size * (1 - index / 10);
              ctx.stroke();
            });
          }

          // Add glow effect to star
          const glowSize = size * 6;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(0.1, star.color);
          gradient.addColorStop(0.4, `${star.color}40`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.arc(x, y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Draw the star
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(drawStars);
    }

    drawStars();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHyperdrive, isPaused]);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPaused) {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPaused]);

  // Render starfield and background nebula
  return (
    <>
      <div
        ref={nebulaRef}
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80')`,
          filter: 'brightness(0.3) saturate(1.5)',
          transform: isPaused
            ? 'none'
            : `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
          width: 'calc(100% + 80px)',
          height: 'calc(100% + 80px)',
          left: '-40px',
          top: '-40px',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
    </>
  );
};

export default StarField;
