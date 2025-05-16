
import React, { useEffect, useState, useRef } from 'react';

interface Star {
  id: number;
  size: number;
  top: string;
  left: string;
  opacity: number;
  delay: string;
  duration: string;
  color: string;
}

const StarBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStar, setShootingStar] = useState<{
    top: string;
    left: string;
    duration: string;
    delay: string;
    active: boolean;
  }>({
    top: '10%',
    left: '0%',
    duration: '1s',
    delay: '0s',
    active: false
  });
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate random stars
    const generateStars = (count: number) => {
      const starArray: Star[] = [];
      for (let i = 0; i < count; i++) {
        starArray.push({
          id: i,
          size: Math.random() * 3,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.3 + Math.random() * 0.7,
          delay: `${Math.random() * 5}s`,
          duration: `${3 + Math.random() * 4}s`,
          color: Math.random() > 0.1 
            ? 'white' 
            : ['#8B5CF6', '#33C3F0', '#F97316'][Math.floor(Math.random() * 3)]
        });
      }
      setStars(starArray);
    };

    generateStars(200);
    
    // Create shooting star effect at random intervals
    const triggerShootingStar = () => {
      const topStart = `${Math.random() * 30}%`;
      const duration = `${0.6 + Math.random() * 1}s`;
      
      setShootingStar({
        top: topStart,
        left: '0%',
        duration: duration,
        delay: '0s',
        active: true
      });
      
      // Hide shooting star after animation
      const timeout = setTimeout(() => {
        setShootingStar(prev => ({ ...prev, active: false }));
        
        // Schedule next shooting star
        const nextTimeout = setTimeout(() => {
          triggerShootingStar();
        }, Math.random() * 15000 + 5000);
        
        timeoutRef.current = nextTimeout;
      }, parseFloat(duration) * 1000);
      
      timeoutRef.current = timeout;
    };
    
    // Start shooting star effect after initial delay
    const initialTimeout = setTimeout(() => {
      triggerShootingStar();
    }, 3000);
    
    timeoutRef.current = initialTimeout;
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="star-field">
      {/* Fixed stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            backgroundColor: star.color,
            '--twinkle-delay': star.delay,
            '--twinkle-duration': star.duration,
          } as React.CSSProperties}
        />
      ))}
      
      {/* Shooting star */}
      {shootingStar.active && (
        <div 
          className="absolute h-[1px] w-[100px] bg-white"
          style={{
            top: shootingStar.top,
            left: shootingStar.left,
            opacity: 1,
            transform: 'rotate(-15deg)',
            boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.7)',
            animation: `shooting-star ${shootingStar.duration} linear forwards`,
          }}
        />
      )}
      
      {/* Nebula effect */}
      <div 
        className="fixed top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.5), transparent 40%), radial-gradient(circle at 80% 70%, rgba(51, 195, 240, 0.5), transparent 40%)'
        }}
      />
    </div>
  );
};

export default StarBackground;
