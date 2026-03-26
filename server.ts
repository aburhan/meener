import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3000;

// Mock Data for Real-time Feeds
let locations = [
  { 
    id: 'loc-1', 
    name: 'Downtown Hub', 
    traffic: 'Moderate', 
    status: 'Open',
    sensors: { temp: 21.5, humidity: 45, cpu: 12, network: '980Mbps' },
    transactions: { hourly: 124, daily: 2840, revenue: 34200 }
  },
  { 
    id: 'loc-2', 
    name: 'Tech Plaza', 
    traffic: 'Quiet', 
    status: 'Open',
    sensors: { temp: 22.1, humidity: 42, cpu: 8, network: '1.2Gbps' },
    transactions: { hourly: 45, daily: 1120, revenue: 12500 }
  },
  { 
    id: 'loc-3', 
    name: 'Station East', 
    traffic: 'Busy', 
    status: 'Open',
    sensors: { temp: 23.4, humidity: 48, cpu: 28, network: '850Mbps' },
    transactions: { hourly: 210, daily: 4500, revenue: 52100 }
  },
];

let inventory = {
  '1': { stock: 45, threshold: 10, demand: 'High' },
  '2': { stock: 12, threshold: 15, demand: 'Medium' },
  '3': { stock: 8, threshold: 10, demand: 'Low' },
  '4': { stock: 100, threshold: 20, demand: 'High' },
  '5': { stock: 30, threshold: 10, demand: 'Medium' },
  '6': { stock: 5, threshold: 10, demand: 'Medium' },
};

// Real-time Simulation Loop
setInterval(() => {
  // Randomly update traffic and sensors
  locations = locations.map(loc => ({
    ...loc,
    traffic: ['Quiet', 'Moderate', 'Busy'][Math.floor(Math.random() * 3)],
    sensors: {
      ...loc.sensors,
      temp: +(loc.sensors.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
      cpu: Math.floor(Math.random() * 40) + 5,
    },
    transactions: {
      ...loc.transactions,
      hourly: Math.floor(loc.transactions.hourly + (Math.random() - 0.5) * 10),
      revenue: loc.transactions.revenue + Math.floor(Math.random() * 50)
    }
  }));

  // Randomly decrease stock
  Object.keys(inventory).forEach(id => {
    if (inventory[id].stock > 0 && Math.random() > 0.7) {
      inventory[id].stock -= 1;
    }
  });

  // Broadcast to all clients
  const update = JSON.stringify({ type: 'REALTIME_UPDATE', locations, inventory });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(update);
    }
  });
}, 5000);

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ type: 'INITIAL_STATE', locations, inventory }));

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    if (data.type === 'RESTOCK') {
      const { productId, amount } = data;
      if (inventory[productId]) {
        inventory[productId].stock += amount;
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'REALTIME_UPDATE', locations, inventory }));
          }
        });
      }
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
