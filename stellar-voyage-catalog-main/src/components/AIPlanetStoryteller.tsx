
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PlanetData } from './PlanetCard';
import { planets } from '../data/planets';
import { toast } from "@/hooks/use-toast";

interface AIPlanetStorytellerProps {
  initialPlanetId: string;
}

// AI generated stories about each planet
const planetStories: Record<string, string[]> = {
  mercury: [
    "Welcome to Mercury, the smallest and innermost planet in our Solar System. As we approach, notice the cratered surface - evidence of countless meteor impacts over billions of years.",
    "Mercury experiences extreme temperature variations - scorching 800°F (430°C) during the day and plummeting to -290°F (-180°C) at night. Its proximity to the Sun has stripped away most of its atmosphere, leaving a barren, moon-like landscape.",
    "Despite its harsh conditions, Mercury holds fascinating secrets. Its iron core makes up about 60% of its mass, and NASA's MESSENGER mission discovered evidence of water ice in the permanently shadowed craters at its poles."
  ],
  venus: [
    "Arriving at Venus, our solar system's brightest jewel. Often called Earth's sister planet due to its similar size and mass, Venus couldn't be more different in terms of hospitability.",
    "Beneath those beautiful golden clouds lies a world of extremes - with surface temperatures hot enough to melt lead and atmospheric pressure 90 times that of Earth. The thick carbon dioxide atmosphere creates a runaway greenhouse effect, making Venus the hottest planet in our solar system.",
    "Venus rotates backwards compared to other planets, with its day lasting longer than its year! The surface is dotted with thousands of volcanoes, vast plains of basaltic rock, and highland regions called 'tesserae' that might hold clues to Venus's mysterious past."
  ],
  earth: [
    "Home sweet home - Earth, the blue marble. The only known planet to harbor life, our world is a rare oasis in the vastness of space.",
    "Earth's perfect distance from the Sun, protective magnetic field, and the precise chemical composition of its atmosphere created the conditions for life to flourish. From the deepest ocean trenches to the highest mountain peaks, life has found a way to thrive in virtually every niche.",
    "Looking at Earth from space reveals no political boundaries - just continents, oceans, and the thin blue line of our atmosphere - a fragile shield protecting all life below. This perspective reminds us of our shared responsibility to protect our unique planetary home."
  ],
  mars: [
    "Welcome to Mars, the Red Planet - named for its rusty iron-rich soil. Once similar to Earth, Mars now appears as a cold, dusty desert world with a thin atmosphere.",
    "Ancient Mars likely had flowing water - evidenced by dried riverbeds, deltas, and mineral deposits. Today, most water exists as ice in the polar caps and beneath the surface. The planet hosts the largest volcano in the solar system, Olympus Mons, and a canyon system, Valles Marineris, stretching nearly a quarter of the way around the planet.",
    "Mars captures our imagination as the most promising planet for human exploration and possibly future colonization. Robotic rovers continue to search for signs of ancient microbial life and prepare for human visitors in the coming decades."
  ],
  jupiter: [
    "Behold Jupiter, king of the planets! This gas giant contains twice the mass of all other planets combined, with its enormous gravitational pull helping to shield inner planets from cometary impacts.",
    "Jupiter's iconic feature, the Great Red Spot, is a massive storm that has been raging for at least 400 years. The planet's rapid rotation creates distinct cloud bands of ammonia and water ice that circle the planet at different speeds.",
    "Jupiter is like a mini solar system, with at least 79 known moons. The four largest - Io, Europa, Ganymede, and Callisto - were first observed by Galileo in 1610. Europa's subsurface ocean makes it one of the most promising places to search for life beyond Earth."
  ],
  saturn: [
    "Saturn, the jewel of our solar system, captivates with its magnificent rings extending 175,000 miles from the planet yet only about 30 feet thick. These rings consist of countless ice particles ranging from dust-sized to house-sized.",
    "Like Jupiter, Saturn is primarily composed of hydrogen and helium and lacks a solid surface. Its atmosphere features the fastest winds in the solar system, reaching speeds of 1,100 mph at the equator.",
    "Saturn hosts 83 confirmed moons, each with unique characteristics. Titan, the largest, is the only moon in our solar system with a substantial atmosphere, while tiny Enceladus features geysers erupting from a liquid water ocean beneath its icy crust."
  ],
  uranus: [
    "Uranus, the sideways planet, uniquely rotates on its side with its axis pointed nearly toward the Sun. This unusual orientation likely resulted from a massive collision billions of years ago.",
    "The seventh planet appears as a featureless blue-green ball due to methane in its upper atmosphere absorbing red light. Beneath this calm exterior lies a dynamic world of seasonal changes, storms, and complex weather patterns.",
    "Uranus has 27 known moons named after characters from works by Shakespeare and Alexander Pope. It also features a system of rings, though much less prominent than Saturn's. The planet's extreme tilt creates bizarre seasons, with parts experiencing 42 years of continuous daylight followed by 42 years of darkness."
  ],
  neptune: [
    "Neptune, dark and distant, is the windiest planet in our solar system. Winds can reach supersonic speeds of over 1,200 mph, driving massive storm systems like the once-observed Great Dark Spot.",
    "This ice giant's striking blue appearance comes from methane in its atmosphere absorbing red light. Below its gaseous outer layer lies a mantle of water, ammonia, and methane ices surrounding a rocky core.",
    "Neptune's largest moon, Triton, orbits the planet backwards - a clue that it was captured by Neptune's gravity rather than forming alongside it. Triton features active nitrogen geysers and is one of the few geologically active moons in our solar system."
  ]
};

const AIPlanetStoryteller: React.FC<AIPlanetStorytellerProps> = ({ initialPlanetId }) => {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(() => {
    const index = planets.findIndex(p => p.id === initialPlanetId);
    return index >= 0 ? index : 0;
  });
  
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isExploring, setIsExploring] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  
  const currentPlanet = planets[currentPlanetIndex];
  const stories = planetStories[currentPlanet.id] || [];

  useEffect(() => {
    // Reset story index when planet changes
    setCurrentStoryIndex(0);
  }, [currentPlanetIndex]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    
    // Auto-advance story if autoplay is enabled
    if (autoPlayEnabled && isExploring) {
      timeout = setTimeout(() => {
        handleNextStory();
      }, 8000); // 8 seconds between stories
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentStoryIndex, autoPlayEnabled, isExploring, currentPlanetIndex]);

  const handlePreviousPlanet = () => {
    setIsExploring(true);
    const newIndex = (currentPlanetIndex - 1 + planets.length) % planets.length;
    setCurrentPlanetIndex(newIndex);
    
    toast({
      title: `Traveling to ${planets[newIndex].name}`,
      description: "Prepare for arrival...",
    });
  };

  const handleNextPlanet = () => {
    setIsExploring(true);
    const newIndex = (currentPlanetIndex + 1) % planets.length;
    setCurrentPlanetIndex(newIndex);
    
    toast({
      title: `Traveling to ${planets[newIndex].name}`,
      description: "Prepare for arrival...",
    });
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (autoPlayEnabled) {
      // Move to next planet if we reached the end of stories
      handleNextPlanet();
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlayEnabled(!autoPlayEnabled);
    if (!autoPlayEnabled) {
      toast({
        title: "Auto Exploration Enabled",
        description: "Sit back and enjoy the tour!",
      });
    }
  };

  const startExploration = () => {
    setIsExploring(true);
    toast({
      title: "Mission Launched!",
      description: `Beginning exploration of ${currentPlanet.name}`,
    });
  };

  return (
    <div className="relative bg-space-dark/70 backdrop-blur-lg rounded-xl border border-space-purple/30 p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            background: `radial-gradient(circle at center, ${currentPlanet.color}50 0%, transparent 70%)`,
          }}
        />
      </div>
      
      <div className="relative z-10">
        {!isExploring ? (
          <div className="flex flex-col items-center space-y-4 p-4">
            <h3 className="text-xl font-bold">Begin Interplanetary Tour</h3>
            <p className="text-gray-300 text-center">
              Experience the wonders of the solar system with our AI storyteller guide
            </p>
            <Button 
              className="w-full bg-space-purple hover:bg-space-purple/90"
              onClick={startExploration}
            >
              Start Exploration
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-space-purple/70 bg-clip-text text-transparent">
                {currentPlanet.name}
              </h3>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${autoPlayEnabled ? 'bg-space-purple/40 text-white' : 'bg-space-dark/70 text-gray-300'}`}
                  onClick={toggleAutoPlay}
                >
                  {autoPlayEnabled ? 'Auto: On' : 'Auto: Off'}
                </Button>
              </div>
            </div>

            <div 
              className="bg-space-dark/50 border border-space-purple/20 rounded-lg p-4 mb-4 min-h-[120px] transition-all duration-300"
              style={{ 
                boxShadow: `0 0 20px 0 ${currentPlanet.color}30`,
                animation: 'fade-in 0.5s ease-out',
              }}
            >
              <p className="text-gray-200 animate-fade-in">{stories[currentStoryIndex]}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-space-purple/30 hover:bg-space-purple/20"
                  onClick={handlePreviousPlanet}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Prev Planet
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-space-purple/30 hover:bg-space-purple/20"
                  onClick={handlePreviousStory}
                  disabled={currentStoryIndex === 0}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Prev Story
                </Button>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-space-purple/30 hover:bg-space-purple/20"
                  onClick={handleNextStory}
                  disabled={currentStoryIndex >= stories.length - 1 && !autoPlayEnabled}
                >
                  Next Story
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-space-purple/30 hover:bg-space-purple/20"
                  onClick={handleNextPlanet}
                >
                  Next Planet
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                {stories.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full ${currentStoryIndex === idx ? 'bg-space-purple' : 'bg-gray-600'}`}
                    onClick={() => setCurrentStoryIndex(idx)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIPlanetStoryteller;
