import React, { useState, useEffect, useRef } from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { planetExtendedInfo } from '../data/planetExtendedInfo';

interface AstraAssistantProps {
  planetId: string;
  planetName: string;
}

const AstraAssistant: React.FC<AstraAssistantProps> = ({ planetId, planetName }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [showBubble, setShowBubble] = useState(true);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const messageQueueRef = useRef<string[]>([]);
  
  // Messages that Astra can provide about each planet
  const planetMessages: Record<string, string[]> = {
    mercury: [
      `Mercury is the smallest planet in our solar system, only slightly larger than Earth's Moon.`,
      `A day on Mercury lasts 176 Earth days, while a year is just 88 Earth days!`,
      `Despite being closest to the Sun, Mercury is not the hottest planet. Venus holds that title.`,
      `Mercury has a thin exosphere instead of a proper atmosphere.`,
      `The surface temperature of Mercury can reach 800°F (430°C) during the day and drop to -290°F (-180°C) at night.`
    ],
    venus: [
      `Venus is often called Earth's twin because of their similar size and mass.`,
      `Venus rotates backwards compared to other planets, with the Sun rising in the west and setting in the east.`,
      `The atmospheric pressure on Venus is 92 times greater than Earth's.`,
      `Venus is the hottest planet in our solar system, with surface temperatures hot enough to melt lead.`,
      `Venus is covered in thick clouds of sulfuric acid that trap heat, causing a runaway greenhouse effect.`
    ],
    earth: [
      `Earth is the only planet we know of that supports life.`,
      `Earth's atmosphere is 78% nitrogen, 21% oxygen, and 1% other gases.`,
      `70% of Earth's surface is covered by water.`,
      `Earth has a powerful magnetic field that protects us from solar radiation.`,
      `Earth is the only planet not named after a Greek or Roman god.`
    ],
    mars: [
      `Mars is known as the Red Planet because of its reddish appearance.`,
      `Mars has the largest dust storms in the solar system, sometimes covering the entire planet.`,
      `A day on Mars is about 24.6 hours, similar to Earth.`,
      `Mars has two small moons named Phobos and Deimos.`,
      `The largest volcano and highest known mountain in our solar system, Olympus Mons, is on Mars.`
    ],
    jupiter: [
      `Jupiter is the largest planet in our solar system, more than twice as massive as all other planets combined.`,
      `Jupiter's Great Red Spot is a giant storm that has been raging for at least 400 years.`,
      `Jupiter has a strong magnetic field, about 20,000 times stronger than Earth's.`,
      `Jupiter has at least 79 moons, including the four largest, known as the Galilean moons.`,
      `Jupiter is a gas giant and does not have a solid surface.`
    ],
    saturn: [
      `Saturn is famous for its spectacular ring system, made up of countless ice particles and rocky debris.`,
      `Saturn is the least dense planet in our solar system; it could float on water.`,
      `Saturn has at least 82 moons, more than any other planet in our solar system.`,
      `Saturn's largest moon, Titan, has a thick atmosphere and liquid oceans of methane.`,
      `Saturn is a gas giant and does not have a solid surface.`
    ],
    uranus: [
      `Uranus rotates on its side, with its axis of rotation tilted almost 98 degrees.`,
      `Uranus is an ice giant, with a cold and windy atmosphere.`,
      `Uranus has a faint ring system made up of dark particles.`,
      `Uranus has 27 known moons, named after characters from Shakespeare's plays.`,
      `Uranus appears blue-green due to methane in its atmosphere.`
    ],
    neptune: [
      `Neptune is the windiest planet in our solar system, with winds reaching speeds of 2,100 km/h.`,
      `Neptune is an ice giant, similar to Uranus.`,
      `Neptune has a faint ring system made up of dark particles.`,
      `Neptune has 14 known moons, including Triton, which orbits in the opposite direction of Neptune's rotation.`,
      `Neptune appears blue due to methane in its atmosphere.`
    ]
  };
  
  // Function to get AI responses about the current planet
  const getRandomFact = () => {
    const planetInfo = planetExtendedInfo[planetId as keyof typeof planetExtendedInfo];
    const specificMessages = planetMessages[planetId] || [];
    
    const allMessages = [
      `Welcome to ${planetName}! I'm Astra, your space exploration guide.`,
      `${planetName} has a ${planetInfo.climate} climate and ${planetInfo.atmosphere} atmosphere.`,
      `The gravity on ${planetName} is ${planetInfo.gravity}.`,
      `Did you know? ${planetInfo.funFact}`,
      ...specificMessages
    ];
    
    return allMessages[Math.floor(Math.random() * allMessages.length)];
  };

  // Type writer effect for messages
  const typeMessage = (text: string) => {
    setIsTyping(true);
    setMessage('');
    
    let index = 0;
    const speed = 30; // milliseconds per character
    
    const type = () => {
      if (index < text.length) {
        setMessage((prev) => prev + text.charAt(index));
        index++;
        typingRef.current = setTimeout(type, speed);
      } else {
        setIsTyping(false);
        
        // Check if there are more messages in the queue
        if (messageQueueRef.current.length > 0) {
          const nextMessage = messageQueueRef.current.shift();
          if (nextMessage) {
            setTimeout(() => typeMessage(nextMessage), 2000);
          }
        }
      }
    };
    
    type();
  };
  
  // Queue a new message
  const queueMessage = (text: string) => {
    if (isTyping) {
      messageQueueRef.current.push(text);
    } else {
      typeMessage(text);
    }
  };

  // Start with an initial greeting
  useEffect(() => {
    const initialMessage = `Hello explorer! I'm Astra, your AI space guide. I'll help you discover the wonders of ${planetName}.`;
    
    const timer = setTimeout(() => {
      typeMessage(initialMessage);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [planetName]);
  
  // When planet changes, provide a new fact
  useEffect(() => {
    if (planetId) {
      const newMessage = `We've arrived at ${planetName}! Let me tell you about this fascinating planet.`;
      queueMessage(newMessage);
    }
  }, [planetId, planetName]);
  
  const handleAskQuestion = () => {
    const fact = getRandomFact();
    queueMessage(fact);
  };
  
  const toggleBubble = () => {
    setShowBubble(prev => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat bubble */}
      {showBubble && (
        <div className="mb-4 bg-space-dark/90 backdrop-blur-md border border-space-purple/40 rounded-2xl p-4 max-w-xs sm:max-w-md animate-fade-in shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-space-purple animate-pulse"></div>
            <h4 className="text-space-purple font-bold">Astra</h4>
            <span className="text-xs text-gray-400">AI Space Guide</span>
          </div>
          
          <div className="min-h-[80px] mb-3">
            <p className="text-white">
              {message}
              {isTyping && <span className="typing-cursor">|</span>}
            </p>
          </div>
          
          <Button 
            className="w-full bg-space-purple/20 hover:bg-space-purple/30 border border-space-purple/40"
            onClick={handleAskQuestion}
            disabled={isTyping}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Tell me more about {planetName}
          </Button>
        </div>
      )}
      
      {/* Astra avatar button */}
      <Button
        className="rounded-full w-14 h-14 p-0 bg-space-purple shadow-lg shadow-space-purple/30 hover:bg-space-purple/90 relative overflow-hidden"
        onClick={toggleBubble}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 to-blue-400 opacity-50"></div>
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Bot className="h-7 w-7 text-white animate-pulse-glow" />
        </div>
        
        {/* Holographic rings */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-20 h-20 border border-space-purple/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="w-16 h-16 border border-space-purple/40 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ animationDuration: '2s' }}></div>
        </div>
      </Button>
    </div>
  );
};

export default AstraAssistant;
