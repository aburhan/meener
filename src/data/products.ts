import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Cymbal Signature Bowl',
    description: 'Quinoa, roasted sweet potatoes, kale, avocado, and our secret cymbal dressing.',
    price: 12.99,
    category: 'Bowls',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    calories: 540,
    tags: ['Vegan', 'Gluten-Free', 'Bestseller']
  },
  {
    id: '2',
    name: 'Automated Harvest Salad',
    description: 'Fresh seasonal greens, apples, walnuts, and goat cheese with balsamic glaze.',
    price: 11.50,
    category: 'Bowls',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    calories: 420,
    tags: ['Vegetarian']
  },
  {
    id: '3',
    name: 'Protein Power Pack',
    description: 'Grilled chicken, hard-boiled egg, almonds, and edamame.',
    price: 9.99,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    calories: 380,
    tags: ['High Protein']
  },
  {
    id: '4',
    name: 'Nitro Cold Brew',
    description: 'Smooth, creamy cold brew coffee infused with nitrogen.',
    price: 4.50,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
    calories: 5,
    tags: ['Caffeine']
  },
  {
    id: '5',
    name: 'Matcha Zen Latte',
    description: 'Premium ceremonial grade matcha with oat milk.',
    price: 5.25,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800',
    calories: 120,
    tags: ['Antioxidants']
  },
  {
    id: '6',
    name: 'Chia Seed Pudding',
    description: 'Coconut milk chia pudding topped with fresh berries and honey.',
    price: 6.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800',
    calories: 280,
    tags: ['Healthy Sweet']
  }
];
