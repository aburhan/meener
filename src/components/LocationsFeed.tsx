import React from 'react';
import { MapPin, Users, Activity, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface Location {
  id: string;
  name: string;
  traffic: 'Quiet' | 'Moderate' | 'Busy';
  status: string;
}

interface LocationsFeedProps {
  locations: Location[];
}

export default function LocationsFeed({ locations }: LocationsFeedProps) {
  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'Quiet': return 'text-green-500';
      case 'Moderate': return 'text-yellow-500';
      case 'Busy': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {locations.map((loc) => (
        <motion.div
          key={loc.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-brand-primary/10 p-4 flex flex-col gap-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-brand-accent" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">{loc.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full bg-brand-accent animate-pulse`} />
              <span className="font-mono text-[10px] text-brand-accent uppercase tracking-tighter">Live</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Traffic Level</span>
              <div className="flex items-center gap-2">
                <Users size={14} className={getTrafficColor(loc.traffic)} />
                <span className={`text-sm font-bold ${getTrafficColor(loc.traffic)}`}>{loc.traffic}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Status</span>
              <span className="text-sm font-bold text-brand-primary">{loc.status}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-brand-primary/5 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
              <Clock size={12} />
              Wait Time: {loc.traffic === 'Busy' ? '2-3 min' : 'Instant'}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
              <Activity size={12} />
              Sensors: Active
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
