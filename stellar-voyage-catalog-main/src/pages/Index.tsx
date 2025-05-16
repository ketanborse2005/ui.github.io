
import React, { useState, useEffect } from 'react';
import { Star, Stars, Rocket, Book } from 'lucide-react';
import Header from '../components/Header';
import StarBackground from '../components/StarBackground';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation delay for initial load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLaunchMission = () => {
    toast({
      title: "Mission Launched!",
      description: "Beginning solar system exploration tour...",
    });
    
    // Navigate to Mercury (first planet) to start the sequential exploration
    setTimeout(() => {
      navigate('/planet/mercury');
    }, 1000);
  };

  const handleLearnAboutPlanet = () => {
    navigate('/planet-selection');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        
        <main className="py-10 flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-grow bg-gradient-to-r from-space-purple/0 to-space-purple/50"></div>
            <div className="flex items-center gap-2">
              <Stars className="h-5 w-5 text-space-purple animate-twinkle" />
              <h2 className="text-3xl font-bold">Planet Explorer</h2>
              <Stars className="h-5 w-5 text-space-purple animate-twinkle" />
            </div>
            <div className="h-px flex-grow bg-gradient-to-r from-space-purple/50 to-space-purple/0"></div>
          </div>
          
          <div className="mb-8">
            <p className="text-center text-gray-300 max-w-2xl mx-auto">
              Embark on an interstellar journey through our solar system. Explore each planet's unique features and
              plan your cosmic adventure with our interactive guide.
            </p>
          </div>
          
          <div 
            className="w-full max-w-2xl flex flex-col gap-8 mx-auto"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            <Button 
              className="flex items-center justify-center gap-4 p-8 bg-space-purple hover:bg-space-purple/90 text-lg font-bold rounded-xl cosmic-pulse"
              onClick={handleLaunchMission}
            >
              <Rocket className="h-8 w-8" />
              Launch Sequential Mission
              <span className="text-sm opacity-70">Explore planets in order</span>
            </Button>
            
            <Button 
              variant="outline"
              className="flex items-center justify-center gap-4 p-8 border border-space-purple/40 bg-space-purple/10 hover:bg-space-purple/20 text-lg font-bold rounded-xl"
              onClick={handleLearnAboutPlanet}
            >
              <Book className="h-8 w-8" />
              Learn About A Particular Planet
              <span className="text-sm opacity-70">Select any planet to explore</span>
            </Button>
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

export default Index;
