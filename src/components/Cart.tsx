import React from 'react';
import { Plus, Minus, X, ShoppingBag, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [checkoutStep, setCheckoutStep] = React.useState(0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate automated checkout steps
    setTimeout(() => setCheckoutStep(1), 1500);
    setTimeout(() => setCheckoutStep(2), 3000);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutStep(0);
      alert("Order placed! Your automated pickup locker is #42.");
      onClose();
    }, 4500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-brand-primary/10 flex items-center justify-between bg-brand-primary text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-accent" />
                <h2 className="font-mono text-sm uppercase tracking-widest">Your Order</h2>
              </div>
              <button onClick={onClose} className="hover:text-brand-accent transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-mono text-xs uppercase tracking-widest">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-100 rounded-none overflow-hidden flex-shrink-0 border border-brand-primary/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 border border-brand-primary/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 border border-brand-primary/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-brand-primary/10 bg-gray-50">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider font-mono">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider font-mono">
                    <span>Automation Fee</span>
                    <span className="text-brand-accent">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold uppercase tracking-widest font-mono pt-2 border-t border-brand-primary/5">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full tech-button h-12 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {checkoutStep === 0 && "Initializing..."}
                      {checkoutStep === 1 && "Syncing with Locker..."}
                      {checkoutStep === 2 && "Finalizing..."}
                    </>
                  ) : (
                    "Checkout Now"
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
