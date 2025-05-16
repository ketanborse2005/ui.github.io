
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Stars } from 'lucide-react';
import Header from '../components/Header';
import PlanetCard from '../components/PlanetCard';
import StarBackground from '../components/StarBackground';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { planets } from '../data/planets';

const PlanetSelection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation delay for initial load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        
        <main className="py-10">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="hover:bg-space-purple/20"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-grow bg-gradient-to-r from-space-purple/0 to-space-purple/50"></div>
            <div className="flex items-center gap-2">
              <Stars className="h-5 w-5 text-space-purple animate-twinkle" />
              <h2 className="text-3xl font-bold">Select a Planet</h2>
              <Stars className="h-5 w-5 text-space-purple animate-twinkle" />
            </div>
            <div className="h-px flex-grow bg-gradient-to-r from-space-purple/50 to-space-purple/0"></div>
          </div>
          
          <div className="mb-8">
            <p className="text-center text-gray-300 max-w-2xl mx-auto">
              Choose a planet to explore its unique features and learn about its characteristics.
            </p>
          </div>
          
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            {planets.map((planet, index) => (
              <div 
                key={planet.id} 
                style={{ 
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: `${index * 0.5}s`
                }}
              >
                <PlanetCard planet={planet} />
              </div>
            ))}
          </div>
        </main>
      </div>
      
      <footer className="py-4 bg-space-dark border-t border-space-purple/20 mt-10">
        <div className="container mx-auto px-4 flex justify-center items-center gap-2">
          <Star className="h-4 w-4 text-space-purple animate-pulse" />
          <p className="text-sm text-gray-400">Planet Explorer &copy; 2025 Cosmic Voyages</p>
        </div>
      </footer>
    </div>
  );
};

export default PlanetSelection;
