import React from 'react';
import { Plus, Flame, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  stock?: number;
}

export default function ProductCard({ product, onAddToCart, stock }: ProductCardProps) {
  const isOutOfStock = stock === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group bg-white border border-brand-primary/5 hover:border-brand-accent transition-all duration-300 flex flex-col h-full ${isOutOfStock ? 'opacity-60 grayscale-[0.5]' : ''}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.tags.map(tag => (
            <span key={tag} className="bg-brand-primary text-white text-[10px] font-mono uppercase tracking-widest px-2 py-1">
              {tag}
            </span>
          ))}
          {isOutOfStock && (
            <span className="bg-red-600 text-white text-[10px] font-mono uppercase tracking-widest px-2 py-1">
              Out of Stock
            </span>
          )}
        </div>
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="bg-white text-brand-primary p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Info size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight group-hover:text-brand-accent transition-colors">
            {product.name}
          </h3>
          <span className="font-mono text-sm font-bold text-brand-primary/80">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-primary/5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-400 font-mono text-[10px] uppercase tracking-wider">
              <Flame size={12} className="text-orange-500" />
              {product.calories} kcal
            </div>
            {stock !== undefined && (
              <div className={`font-mono text-[10px] uppercase tracking-wider ${stock <= 10 ? 'text-orange-500' : 'text-gray-400'}`}>
                Stock: {stock}
              </div>
            )}
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest hover:text-brand-accent transition-colors group/btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? 'Unavailable' : 'Add to Order'}
            <div className="w-8 h-8 bg-brand-primary text-white flex items-center justify-center group-hover/btn:bg-brand-accent group-hover/btn:text-brand-primary transition-colors">
              <Plus size={16} />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
