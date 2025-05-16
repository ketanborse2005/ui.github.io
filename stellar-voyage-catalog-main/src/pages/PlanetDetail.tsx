
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, ThermometerSnowflake, Ruler, Orbit, Wind, Globe, Mountain, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import StarBackground from '../components/StarBackground';
import PlanetViewer360 from '../components/PlanetViewer360';
import PlanetFactCard from '../components/PlanetFactCard';
import AIPlanetStoryteller from '../components/AIPlanetStoryteller';
import AstraAssistant from '../components/AstraAssistant';
import { planets } from '../data/planets';
import { planetExtendedInfo } from '../data/planetExtendedInfo';

const PlanetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isExploring, setIsExploring] = useState(false);
  const [showAIStoryteller, setShowAIStoryteller] = useState(false);

  // Find the planet by ID
  const planet = planets.find(p => p.id === id);

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Planet not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const extendedInfo = planetExtendedInfo[planet.id as keyof typeof planetExtendedInfo];

  const handleStartMission = () => {
    setIsExploring(true);
    setShowAIStoryteller(true);
    
    toast({
      title: `Mission to ${planet.name} launched!`,
      description: "Prepare for an interstellar journey",
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <StarBackground />
      
      <div className="container mx-auto px-4 py-8 flex-grow z-10">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="hover:bg-space-purple/20"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-space-purple bg-clip-text text-transparent mb-4">
              {planet.name}
            </h1>
            
            <p className="text-gray-300 mb-6 text-lg">
              {planet.description}
            </p>
            
            {showAIStoryteller ? (
              <div className="mb-6">
                <AIPlanetStoryteller initialPlanetId={planet.id} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <PlanetFactCard 
                    icon={<Ruler />}
                    title="Diameter"
                    value={planet.diameter}
                    color={planet.color}
                  />
                  
                  <PlanetFactCard 
                    icon={<Orbit />}
                    title="Distance from Sun"
                    value={planet.distanceFromSun}
                    color={planet.color}
                  />
                  
                  <PlanetFactCard 
                    icon={<ThermometerSnowflake />}
                    title="Climate"
                    value={extendedInfo.climate}
                    color={planet.color}
                  />
                  
                  <PlanetFactCard 
                    icon={<Wind />}
                    title="Atmosphere"
                    value={extendedInfo.atmosphere}
                    color={planet.color}
                  />
                  
                  <PlanetFactCard 
                    icon={<Globe />}
                    title="Gravity"
                    value={extendedInfo.gravity}
                    color={planet.color}
                  />
                  
                  <PlanetFactCard 
                    icon={<Mountain />}
                    title="Terrain"
                    value={extendedInfo.terrain}
                    color={planet.color}
                  />
                </div>
                
                <div className="bg-space-dark/40 backdrop-blur-sm border border-space-purple/30 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4 text-space-purple" />
                    <h3 className="text-lg font-semibold">Cosmic Facts</h3>
                  </div>
                  <p className="text-gray-300">{extendedInfo.funFact}</p>
                </div>
              </>
            )}
            
            {!showAIStoryteller && (
              <Button 
                className="w-full py-3 rounded-lg flex items-center justify-center gap-2 bg-space-purple hover:bg-space-purple/90 transition-all duration-300"
                onClick={handleStartMission}
                disabled={isExploring}
              >
                {isExploring ? (
                  <>
                    <span className="animate-pulse">Exploring...</span>
                    <Rocket className="w-5 h-5 animate-bounce" />
                  </>
                ) : (
                  <>
                    <span>Start Mission to {planet.name}</span>
                    <Rocket className="w-5 h-5" />
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="order-1 lg:order-2">
            <div 
              className="rounded-xl overflow-hidden border border-space-purple/30 bg-space-dark/30 backdrop-blur-sm p-4"
              style={{
                boxShadow: `0 0 20px 0 ${planet.color}40`
              }}
            >
              <h2 className="text-xl font-bold mb-4 text-center">360° View</h2>
              <PlanetViewer360 
                planetImage={planet.image} 
                planetColor={planet.color}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Astra Assistant */}
      <AstraAssistant planetId={planet.id} planetName={planet.name} />
    </div>
  );
};

export default PlanetDetail;
