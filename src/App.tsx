import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AIAssistant from './components/AIAssistant';
import LocationsFeed from './components/LocationsFeed';
import InventoryDashboard from './components/InventoryDashboard';
import DevOpsDashboard from './components/DevOpsDashboard';
import { products } from './data/products';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Zap, RefreshCcw, ShieldCheck, LayoutGrid, Map, Package, Terminal } from 'lucide-react';
import { useRealtime } from './hooks/useRealtime';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeView, setActiveView] = useState<'Store' | 'Locations' | 'Inventory' | 'DevOps'>('Store');

  const { data, restock } = useRealtime();

  const categories = ['All', 'Bowls', 'Snacks', 'Drinks', 'Desserts'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    // Check stock if inventory data is available
    if (data?.inventory?.[product.id]?.stock === 0) {
      alert("Item is currently out of stock at this location.");
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      {/* View Switcher */}
      <div className="bg-white border-b border-brand-primary/5 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 h-12">
          <button 
            onClick={() => setActiveView('Store')}
            className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${activeView === 'Store' ? 'text-brand-accent font-bold' : 'text-gray-400 hover:text-brand-primary'}`}
          >
            <LayoutGrid size={14} /> Store Front
          </button>
          <button 
            onClick={() => setActiveView('Locations')}
            className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${activeView === 'Locations' ? 'text-brand-accent font-bold' : 'text-gray-400 hover:text-brand-primary'}`}
          >
            <Map size={14} /> Live Traffic
          </button>
          <button 
            onClick={() => setActiveView('Inventory')}
            className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${activeView === 'Inventory' ? 'text-brand-accent font-bold' : 'text-gray-400 hover:text-brand-primary'}`}
          >
            <Package size={14} /> Smart Inventory
          </button>
          <button 
            onClick={() => setActiveView('DevOps')}
            className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${activeView === 'DevOps' ? 'text-brand-accent font-bold' : 'text-gray-400 hover:text-brand-primary'}`}
          >
            <Terminal size={14} /> DevOps Console
          </button>
        </div>
      </div>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeView === 'Store' && (
            <motion.div
              key="store"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="relative h-[60vh] bg-brand-primary overflow-hidden flex items-center">
                <div className="absolute inset-0 opacity-40">
                  <img 
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920" 
                    alt="Automated Kitchen" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/80 to-transparent" />
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-2xl"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-12 h-[1px] bg-brand-accent" />
                      <span className="font-mono text-brand-accent text-sm uppercase tracking-[0.3em]">The Future of Retail</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.9] tracking-tighter">
                      AUTOMATED.<br />FRESH.<br /><span className="text-brand-accent">CYMBAL.</span>
                    </h1>
                    <p className="text-gray-300 text-lg mb-8 max-w-md">
                      Experience the world's first fully autonomous fresh food retail chain. 
                      Zero wait, zero waste, 100% fresh.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                        className="tech-button bg-brand-accent text-brand-primary flex items-center gap-2"
                      >
                        Order Now <ArrowRight size={16} />
                      </button>
                      <button className="tech-button border border-white/20 bg-transparent text-white hover:bg-white/10">
                        Our Technology
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Scrolling Tech Stats */}
                <div className="absolute bottom-0 left-0 w-full bg-brand-accent/10 backdrop-blur-sm border-t border-brand-accent/20 py-3 overflow-hidden">
                  <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center gap-8 mx-8">
                        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest flex items-center gap-2">
                          <Zap size={12} /> SYSTEM STATUS: OPTIMAL
                        </span>
                        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest flex items-center gap-2">
                          <RefreshCcw size={12} /> REPLENISHMENT: 98%
                        </span>
                        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest flex items-center gap-2">
                          <ShieldCheck size={12} /> HYGIENE SCORE: 100
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Menu Section */}
              <section id="menu" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">The Digital Menu</h2>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-4 py-1 font-mono text-xs uppercase tracking-widest transition-all ${
                            activeCategory === cat 
                              ? 'bg-brand-primary text-white' 
                              : 'bg-white text-gray-400 border border-brand-primary/5 hover:border-brand-primary/20'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em]">Showing {filteredProducts.length} items</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                      stock={data?.inventory?.[product.id]?.stock}
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeView === 'Locations' && (
            <motion.div
              key="locations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Live Store Traffic</h2>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Real-time sensor data from all Cymbal Shop locations</p>
              </div>
              <LocationsFeed locations={data?.locations || []} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-brand-primary text-white p-8">
                  <h3 className="font-mono text-sm uppercase tracking-[0.3em] text-brand-accent mb-4">Traffic Insights</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Our stores use anonymous thermal imaging and LiDAR to track occupancy in real-time. This data helps us optimize robotic throughput and ensure zero wait times for our customers.
                  </p>
                </div>
                <div className="border border-brand-primary/10 p-8">
                  <h3 className="font-mono text-sm uppercase tracking-[0.3em] mb-4">Peak Hour Prediction</h3>
                  <div className="space-y-4">
                    {[
                      { time: '08:00 - 10:00', level: 'Busy', width: 'w-full', color: 'bg-red-500' },
                      { time: '12:00 - 14:00', level: 'Moderate', width: 'w-2/3', color: 'bg-yellow-500' },
                      { time: '16:00 - 18:00', level: 'Quiet', width: 'w-1/3', color: 'bg-green-500' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono uppercase">
                          <span>{item.time}</span>
                          <span>{item.level}</span>
                        </div>
                        <div className="h-1 bg-gray-100 w-full">
                          <div className={`h-full ${item.color} ${item.width}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'Inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Smart Inventory Management</h2>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Autonomous stock tracking and demand prediction</p>
              </div>
              <InventoryDashboard 
                inventory={data?.inventory || {}} 
                onRestock={restock}
              />
            </motion.div>
          )}

          {activeView === 'DevOps' && (
            <motion.div
              key="devops"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Internal DevOps Console</h2>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Real-time node telemetry and aggregated transaction data</p>
              </div>
              <DevOpsDashboard locations={data?.locations || []} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <section className="bg-white py-20 border-y border-brand-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-bg flex items-center justify-center">
                  <Zap className="text-brand-accent" />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm">Instant Fulfillment</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our proprietary robotic dispensing system ensures your meal is ready in under 30 seconds from the moment you order.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-bg flex items-center justify-center">
                  <RefreshCcw className="text-brand-accent" />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm">Smart Freshness</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  AI-driven demand forecasting means we only stock what we sell, reducing food waste by 90% compared to traditional retail.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-bg flex items-center justify-center">
                  <ShieldCheck className="text-brand-accent" />
                </div>
                <h3 className="font-bold uppercase tracking-widest text-sm">Contactless Safety</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  From preparation to pickup, your food is handled exclusively by our sanitized automated systems.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-brand-accent rounded-full" />
              <span className="font-mono font-bold text-lg tracking-tighter uppercase">Cymbal<span className="text-brand-accent">Shops</span></span>
            </div>
            <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
              <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
            </div>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              © 2026 CYMBAL RETAIL SYSTEMS INC.
            </p>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
      
      <AIAssistant />
    </div>
  );
}
