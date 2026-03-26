import React from 'react';
import { ShoppingBag, Menu, User, Search } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-brand-accent rounded-full animate-pulse" />
              </div>
              <span className="font-mono font-bold text-xl tracking-tighter uppercase">Cymbal<span className="text-brand-accent">Shops</span></span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-mono uppercase tracking-wider hover:text-brand-accent transition-colors">Menu</a>
              <a href="#" className="text-sm font-mono uppercase tracking-wider hover:text-brand-accent transition-colors">Locations</a>
              <a href="#" className="text-sm font-mono uppercase tracking-wider hover:text-brand-accent transition-colors">About</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User size={20} />
            </button>
            <button 
              onClick={onOpenCart}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-accent text-brand-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
