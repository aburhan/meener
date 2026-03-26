import { useState, useEffect } from 'react';
import { ShopLocation, TrafficLevel } from '../types';
import { locations, getRandomTraffic } from '../data/locations';

export function useLiveShopData(locationId: string) {
  const [location, setLocation] = useState<ShopLocation | undefined>(
    locations.find(l => l.id === locationId)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLocation(prev => {
        if (!prev) return prev;
        
        // Simulate real-time traffic changes
        const newTraffic = Math.random() > 0.7 ? getRandomTraffic() : prev.traffic;
        
        // Simulate slight inventory fluctuations
        const newInventory = { ...prev.inventory };
        Object.keys(newInventory).forEach(id => {
          if (Math.random() > 0.9) {
            newInventory[id] = Math.max(0, newInventory[id] + (Math.random() > 0.5 ? 1 : -1));
          }
        });

        return {
          ...prev,
          traffic: newTraffic,
          inventory: newInventory
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [locationId]);

  return location;
}
