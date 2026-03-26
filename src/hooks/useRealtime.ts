import { useState, useEffect, useRef } from 'react';

export function useRealtime() {
  const [data, setData] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.host}`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'INITIAL_STATE' || message.type === 'REALTIME_UPDATE') {
        setData(message);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const restock = (productId: string, amount: number) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'RESTOCK', productId, amount }));
    }
  };

  return { data, restock };
}
