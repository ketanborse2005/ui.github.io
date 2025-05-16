
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PlanetFactProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

const PlanetFactCard: React.FC<PlanetFactProps> = ({ icon, title, value, color }) => {
  return (
    <Card className="bg-space-dark/30 backdrop-blur-sm border border-space-purple/20 overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <span style={{ color }}>{icon}</span>
          <span className="text-gray-300">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <p className="text-lg font-bold" style={{ color }}>{value}</p>
      </CardContent>
    </Card>
  );
};

export default PlanetFactCard;
