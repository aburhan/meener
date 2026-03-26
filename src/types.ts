export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Bowls' | 'Snacks' | 'Drinks' | 'Desserts';
  image: string;
  calories: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type TrafficLevel = 'Quiet' | 'Moderate' | 'Busy';

export interface ShopLocation {
  id: string;
  name: string;
  address: string;
  traffic: TrafficLevel;
  inventory: Record<string, number>; // productId -> stock count
}
