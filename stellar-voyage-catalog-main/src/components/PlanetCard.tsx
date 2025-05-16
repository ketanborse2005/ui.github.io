
import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export interface PlanetData {
  id: string;
  name: string;
  image: string;
  description: string;
  diameter: string;
  distanceFromSun: string;
  color: string;
}

interface PlanetCardProps {
  planet: PlanetData;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleVisitPlanet = () => {
    navigate(`/planet/${planet.id}`);
  };

  return (
    <div 
      className="space-card glow-effect"
      style={{ 
        '--card-color': planet.color 
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3]">
        <img 
          src={planet.image} 
          alt={planet.name} 
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1.0)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-40" 
          style={{ 
            background: `linear-gradient(to top, ${planet.color}, transparent)` 
          }}
        />
        
        {/* Decorative star */}
        <Star 
          className="absolute top-2 right-2 h-4 w-4" 
          style={{
            color: planet.color,
            filter: `drop-shadow(0 0 3px ${planet.color})`,
            opacity: isHovered ? 1 : 0.6,
            transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'all 0.5s ease'
          }}
        />
      </div>
      
      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-space-purple/70 bg-clip-text text-transparent">
        {planet.name}
      </h3>
      
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{planet.description}</p>
      
      <div className="flex justify-between mb-4">
        <div className="bg-space-dark/50 p-2 rounded-lg backdrop-blur-sm flex-1 mr-2">
          <p className="text-xs text-gray-400">Diameter</p>
          <p className="text-sm font-semibold">{planet.diameter}</p>
        </div>
        <div className="bg-space-dark/50 p-2 rounded-lg backdrop-blur-sm flex-1">
          <p className="text-xs text-gray-400">Distance from Sun</p>
          <p className="text-sm font-semibold">{planet.distanceFromSun}</p>
        </div>
      </div>
      
      <Button 
        className="w-full py-2 rounded-lg flex items-center justify-center gap-2 bg-space-purple/20 hover:bg-space-purple/40 transition-all duration-300 group border border-space-purple/30"
        style={{ 
          boxShadow: isHovered ? `0 0 15px 0 ${planet.color}70` : `0 0 10px 0 ${planet.color}40`,
          transition: 'all 0.3s ease',
        }}
        onClick={handleVisitPlanet}
      >
        <span>Visit</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default PlanetCard;
