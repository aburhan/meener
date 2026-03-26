import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { products } from '../data/products';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm your Cymbal Shops assistant. How can I help you find the perfect meal today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are a helpful and friendly assistant for "Cymbal Shops", an automated retail food chain. 
          Your goal is to help customers choose food from our menu. 
          Here is our menu: ${JSON.stringify(products)}.
          Be concise, professional, and highlight the "automated" and "fresh" nature of our shops.
          Always recommend items based on their preferences.`,
        },
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      });

      const text = response.text || "I'm sorry, I couldn't process that.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having a bit of trouble connecting right now. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand-accent hover:text-brand-primary transition-all z-50"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50 border border-brand-primary/10"
          >
            <div className="bg-brand-primary p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-brand-accent" />
                <span className="font-mono text-sm uppercase tracking-widest">Cymbal AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-brand-accent">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex flex-col max-w-[80%]",
                  m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm",
                    m.role === 'user' 
                      ? "bg-brand-primary text-white rounded-tr-none" 
                      : "bg-white border border-brand-primary/10 text-brand-primary rounded-tl-none"
                  )}>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-brand-primary/50 text-xs font-mono">
                  <Loader2 size={14} className="animate-spin" />
                  CYMBAL AI IS THINKING...
                </div>
              )}
            </div>

            <div className="p-4 border-t border-brand-primary/10 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our menu..."
                  className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-accent outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping}
                  className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
