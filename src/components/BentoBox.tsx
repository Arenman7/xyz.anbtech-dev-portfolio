import React, { useRef, useState, useEffect } from 'react';

interface ShineConfig {
  radius?: number;
  intensity?: number;
}

// Define props interface for BentoBox component
interface BentoBoxProps {
  children: React.ReactNode;
  className?: string;
  inspectStrength?: number;
  scaleStrength?: number;
  zIndex?: number;
  shine?: ShineConfig;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export const BentoBox: React.FC<BentoBoxProps> = ({
  children,
  className = '',
  inspectStrength = 1,
  scaleStrength = 1.05,
  zIndex = 1,
  shine = { radius: 50, intensity: 0.1 },
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  // Refs and state for managing box interactions
  const boxRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineState, setShine] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Effect to handle mouse leave event
  useEffect(() => {
    const handleMouseLeave = () => {
      // Reset rotation and shine effect on mouse leave
      setRotateX(0);
      setRotateY(0);
      setShine((prev) => ({ ...prev, opacity: 0 }));
      setIsHovered(false);
    };

    const box = boxRef.current;
    if (box) {
      box.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup event listener
    return () => {
      if (box) {
        box.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Handle mouse movement over the box
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;

    const box = boxRef.current;
    const boxRect = box.getBoundingClientRect();
    const boxCenterX = boxRect.left + boxRect.width / 2;
    const boxCenterY = boxRect.top + boxRect.height / 2;

    // Calculate rotation angles based on mouse position
    const angleX = ((e.clientY - boxCenterY) / 20) * inspectStrength;
    const angleY = ((boxCenterX - e.clientX) / 20) * inspectStrength;

    setRotateX(angleX);
    setRotateY(angleY);

    // Calculate shine effect position
    const x = ((e.clientX - boxRect.left) / boxRect.width) * 100;
    const y = ((e.clientY - boxRect.top) / boxRect.height) * 100;
    setShine({ x, y, opacity: 1 });
  };

  // Handle mouse enter event
  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter && onMouseEnter();
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave && onMouseLeave();
  };

  return (
    <div
      ref={boxRef}
      className={`card backdrop-blur-md bg-opacity-30 ${className} relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        // Apply 3D rotation and scaling effect
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${
          isHovered ? scaleStrength : 1
        })`,
        transition: 'transform 0.1s, box-shadow 0.3s, z-index 0.1s',
        zIndex: isHovered ? 10 : zIndex,
      }}
    >
      {children}
      {/* Shine effect overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shineState.x}% ${shineState.y}%, rgba(255,255,255,${shine.intensity}) 0%, rgba(255,255,255,0) ${shine.radius}%)`,
          opacity: shineState.opacity,
        }}
      />
    </div>
  );
};
