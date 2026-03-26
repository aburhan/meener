import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  Thermometer, 
  Droplets, 
  Wifi, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  AlertCircle
} from 'lucide-react';

interface SensorData {
  temp: number;
  humidity: number;
  cpu: number;
  network: string;
}

interface TransactionData {
  hourly: number;
  daily: number;
  revenue: number;
}

interface Location {
  id: string;
  name: string;
  traffic: string;
  status: string;
  sensors: SensorData;
  transactions: TransactionData;
}

interface DevOpsDashboardProps {
  locations: Location[];
}

export default function DevOpsDashboard({ locations }: DevOpsDashboardProps) {
  const totalRevenue = locations.reduce((sum, loc) => sum + loc.transactions.revenue, 0);
  const totalDailyTransactions = locations.reduce((sum, loc) => sum + loc.transactions.daily, 0);

  return (
    <div className="space-y-8">
      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<DollarSign size={20} className="text-brand-accent" />}
          label="Total Network Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend="+12.4%"
        />
        <StatCard 
          icon={<TrendingUp size={20} className="text-brand-accent" />}
          label="Total Transactions"
          value={totalDailyTransactions.toLocaleString()}
          trend="+5.2%"
        />
        <StatCard 
          icon={<Activity size={20} className="text-brand-accent" />}
          label="Active Nodes"
          value={locations.length.toString()}
          trend="100% Up"
        />
        <StatCard 
          icon={<BarChart3 size={20} className="text-brand-accent" />}
          label="Avg. CPU Load"
          value={`${Math.round(locations.reduce((sum, loc) => sum + loc.sensors.cpu, 0) / locations.length)}%`}
          trend="Stable"
        />
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {locations.map((loc) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-brand-primary/10 overflow-hidden flex flex-col"
          >
            {/* Store Header */}
            <div className="bg-brand-primary p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest">{loc.name}</h3>
                <p className="text-[10px] text-brand-accent font-mono uppercase tracking-tighter">Node ID: {loc.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-mono uppercase">Live</span>
              </div>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {/* Transactions Section */}
              <div>
                <h4 className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <BarChart3 size={12} /> Transaction Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 border border-brand-primary/5">
                    <span className="text-[10px] text-gray-400 font-mono block">Hourly Vol.</span>
                    <span className="text-lg font-bold">{loc.transactions.hourly}</span>
                  </div>
                  <div className="p-3 bg-gray-50 border border-brand-primary/5">
                    <span className="text-[10px] text-gray-400 font-mono block">Revenue</span>
                    <span className="text-lg font-bold">${loc.transactions.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Sensors Section */}
              <div>
                <h4 className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity size={12} /> Sensor Telemetry
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <SensorItem icon={<Thermometer size={14} />} label="Temp" value={`${loc.sensors.temp}°C`} />
                  <SensorItem icon={<Droplets size={14} />} label="Humidity" value={`${loc.sensors.humidity}%`} />
                  <SensorItem icon={<Cpu size={14} />} label="CPU Load" value={`${loc.sensors.cpu}%`} />
                  <SensorItem icon={<Wifi size={14} />} label="Network" value={loc.sensors.network} />
                </div>
              </div>

              {/* Health Bar */}
              <div className="pt-4 border-t border-brand-primary/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Node Health</span>
                  <span className="text-[10px] font-bold text-brand-accent">99.9%</span>
                </div>
                <div className="h-1 bg-gray-100 w-full rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent w-[99.9%]" />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-gray-50 border-t border-brand-primary/5 flex justify-between items-center">
              <button className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-brand-accent transition-colors">
                View Logs
              </button>
              <button className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
                <AlertCircle size={12} /> Remote Reboot
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="bg-white border border-brand-primary/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-brand-primary/5 text-brand-primary">
          {icon}
        </div>
        <span className="text-[10px] font-mono font-bold text-brand-accent uppercase">{trend}</span>
      </div>
      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block mb-1">{label}</span>
      <span className="text-2xl font-bold tracking-tighter">{value}</span>
    </div>
  );
}

function SensorItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400">
        {icon}
      </div>
      <div>
        <span className="text-[10px] text-gray-400 font-mono uppercase block">{label}</span>
        <span className="text-xs font-bold">{value}</span>
      </div>
    </div>
  );
}
