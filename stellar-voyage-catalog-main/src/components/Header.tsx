
import React from 'react';
import { Globe, Rocket } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Globe className="h-8 w-8 text-space-purple animate-pulse-glow" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-space-purple bg-clip-text text-transparent">
          Planet Explorer
        </h1>
      </div>
      
      <button 
        className="flex items-center gap-2 bg-space-purple/20 hover:bg-space-purple/30 text-white px-4 py-2 rounded-full transition-colors border border-space-purple/50"
        onClick={handleLaunchMission}
      >
        <span>Launch Mission</span>
        <Rocket className="h-5 w-5" />
      </button>
    </header>
  );
};

export default Header;
