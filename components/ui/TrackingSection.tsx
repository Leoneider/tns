"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock } from 'lucide-react';

export const TrackingSection = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!trackingId) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full border-l border-white/20 transform skew-x-12 translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="label-technical text-white/50 mb-4 block">Monitoreo en Tiempo Real</span>
            <h2 className="text-5xl font-black uppercase mb-8">Rastree su <span className="text-secondary">Carga</span></h2>
            <p className="text-lg text-white/60 mb-12">
              Ingrese su número de guía para conocer el estado actual y la ubicación exacta de su envío.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Ej: TNS-982341"
                className="flex-1 bg-white/10 border border-white/20 px-6 py-4 rounded-sm focus:outline-none focus:border-secondary transition-all text-white placeholder:text-white/30"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-secondary px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all disabled:opacity-50"
              >
                {isSearching ? 'Buscando...' : 'Consultar'}
              </button>
            </div>

            {isSearching && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-white/5 border border-white/10 rounded-sm flex items-center gap-4"
              >
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span className="text-sm font-mono tracking-tighter">Conectando con satélite TNS-Alpha...</span>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-8 border border-white/10 rounded-sm">
              <MapPin className="text-secondary mb-4" />
              <div className="text-2xl font-bold mb-1">Cúcuta</div>
              <div className="text-xs uppercase text-white/40 font-bold">Centro de Operaciones</div>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 rounded-sm">
              <Clock className="text-secondary mb-4" />
              <div className="text-2xl font-bold mb-1">99.8%</div>
              <div className="text-xs uppercase text-white/40 font-bold">Entregas a Tiempo</div>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 rounded-sm col-span-2">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase font-bold text-white/40">Rutas Activas Hoy</span>
                <span className="text-secondary font-mono">LIVE</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  className="h-full bg-secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
