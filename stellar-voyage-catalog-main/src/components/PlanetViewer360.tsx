
import React, { useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PlanetViewer360Props {
  planetImage: string;
  planetColor: string;
}

const PlanetViewer360: React.FC<PlanetViewer360Props> = ({ planetImage, planetColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const previousX = useRef(0);
  const rotationDegree = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      dragging.current = true;
      previousX.current = e.clientX;
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      
      const deltaX = e.clientX - previousX.current;
      previousX.current = e.clientX;
      
      rotationDegree.current += deltaX * 0.5;
      
      if (container.firstElementChild instanceof HTMLElement) {
        container.firstElementChild.style.transform = `rotateY(${rotationDegree.current}deg)`;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      dragging.current = true;
      previousX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      dragging.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      
      const deltaX = e.touches[0].clientX - previousX.current;
      previousX.current = e.touches[0].clientX;
      
      rotationDegree.current += deltaX * 0.5;
      
      if (container.firstElementChild instanceof HTMLElement) {
        container.firstElementChild.style.transform = `rotateY(${rotationDegree.current}deg)`;
      }
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    
    container.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      
      container.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const rotateLeft = () => {
    rotationDegree.current -= 36;
    if (containerRef.current?.firstElementChild instanceof HTMLElement) {
      containerRef.current.firstElementChild.style.transform = `rotateY(${rotationDegree.current}deg)`;
    }
  };

  const rotateRight = () => {
    rotationDegree.current += 36;
    if (containerRef.current?.firstElementChild instanceof HTMLElement) {
      containerRef.current.firstElementChild.style.transform = `rotateY(${rotationDegree.current}deg)`;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        ref={containerRef} 
        className="w-full aspect-square max-w-md md:max-w-lg relative perspective-1000 mb-6 cursor-grab active:cursor-grabbing"
      >
        <div 
          className="w-full h-full transition-transform duration-300 preserve-3d"
          style={{
            background: `radial-gradient(circle, rgba(0,0,0,0) 0%, ${planetColor}33 70%, ${planetColor}66 100%)`,
          }}
        >
          <img 
            src={planetImage} 
            alt="Planet 360 view" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      <div className="flex gap-4 items-center my-4">
        <Button 
          onClick={rotateLeft} 
          variant="outline" 
          className="border border-space-purple/30 bg-space-purple/10 hover:bg-space-purple/20"
        >
          <ArrowLeft className="mr-2" /> Rotate Left
        </Button>
        <div className="text-sm text-gray-400">Drag to rotate</div>
        <Button 
          onClick={rotateRight} 
          variant="outline" 
          className="border border-space-purple/30 bg-space-purple/10 hover:bg-space-purple/20"
        >
          Rotate Right <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PlanetViewer360;
