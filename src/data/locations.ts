import { ShopLocation, TrafficLevel } from '../types';

export const locations: ShopLocation[] = [
  {
    id: 'loc-1',
    name: 'Cymbal Downtown',
    address: '123 Tech Plaza, San Francisco',
    traffic: 'Moderate',
    inventory: { '1': 15, '2': 8, '3': 20, '4': 50, '5': 30, '6': 12 }
  },
  {
    id: 'loc-2',
    name: 'Cymbal Tech Hub',
    address: '456 Innovation Way, Palo Alto',
    traffic: 'Busy',
    inventory: { '1': 5, '2': 2, '3': 10, '4': 25, '5': 15, '6': 0 }
  },
  {
    id: 'loc-3',
    name: 'Cymbal Westside',
    address: '789 Ocean Blvd, Santa Monica',
    traffic: 'Quiet',
    inventory: { '1': 25, '2': 15, '3': 30, '4': 60, '5': 45, '6': 20 }
  }
];

export function getRandomTraffic(): TrafficLevel {
  const levels: TrafficLevel[] = ['Quiet', 'Moderate', 'Busy'];
  return levels[Math.floor(Math.random() * levels.length)];
}
