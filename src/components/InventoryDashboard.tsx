import React from 'react';
import { Package, TrendingUp, AlertTriangle, RefreshCw, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data/products';

interface InventoryItem {
  stock: number;
  threshold: number;
  demand: 'Low' | 'Medium' | 'High';
}

interface InventoryDashboardProps {
  inventory: Record<string, InventoryItem>;
  onRestock: (id: string, amount: number) => void;
}

export default function InventoryDashboard({ inventory, onRestock }: InventoryDashboardProps) {
  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    if (stock <= threshold) return { label: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
    return { label: 'In Stock', color: 'text-green-600 bg-green-50' };
  };

  const getDemandIcon = (demand: string) => {
    switch (demand) {
      case 'High': return <TrendingUp size={14} className="text-red-500" />;
      case 'Medium': return <TrendingUp size={14} className="text-yellow-500" />;
      case 'Low': return <TrendingUp size={14} className="text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white border border-brand-primary/10 p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary text-white flex items-center justify-center">
            <Package size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tighter uppercase">Smart Inventory Control</h2>
            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Real-time supply chain monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">System Health</span>
            <span className="text-xs font-bold text-brand-accent">OPTIMAL</span>
          </div>
          <div className="w-12 h-[1px] bg-brand-primary/10" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Last Sync</span>
            <span className="text-xs font-mono">JUST NOW</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => {
          const inv = inventory[product.id] || { stock: 0, threshold: 0, demand: 'Low' };
          const status = getStockStatus(inv.stock, inv.threshold);
          const isLow = inv.stock <= inv.threshold;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center justify-between p-4 border ${isLow ? 'border-orange-200 bg-orange-50/30' : 'border-brand-primary/5'} hover:border-brand-primary/20 transition-all`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-gray-100 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 font-mono uppercase tracking-widest ${status.color}`}>
                      {status.label}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                      {getDemandIcon(inv.demand)}
                      {inv.demand} Demand
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Current Stock</span>
                  <span className={`text-lg font-mono font-bold ${isLow ? 'text-orange-600' : 'text-brand-primary'}`}>
                    {inv.stock}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Threshold</span>
                  <span className="text-lg font-mono text-gray-400">
                    {inv.threshold}
                  </span>
                </div>
                <div className="w-[1px] h-8 bg-brand-primary/10" />
                <button
                  onClick={() => onRestock(product.id, 20)}
                  className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest hover:text-brand-accent transition-colors group"
                >
                  Restock
                  <div className="w-8 h-8 bg-brand-primary text-white flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-primary transition-colors">
                    <RefreshCw size={14} />
                  </div>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {Object.values(inventory).some(inv => inv.stock <= inv.threshold) && (
        <div className="mt-8 p-4 bg-orange-50 border border-orange-200 flex items-center gap-4">
          <AlertTriangle className="text-orange-500" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-orange-800 uppercase tracking-widest font-mono">Restock Alert</h4>
            <p className="text-xs text-orange-700">Multiple items are below their safety threshold. Automated restock orders have been queued.</p>
          </div>
          <button className="text-xs font-mono font-bold uppercase tracking-widest text-orange-800 hover:underline">
            Approve All
          </button>
        </div>
      )}
    </div>
  );
}
