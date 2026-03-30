"use client";

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero = ({ onAction }: { onAction?: any }) => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image 
        src="/hero-bg.png" 
        className="w-full h-full object-cover object-center grayscale opacity-35"
        alt="Logistics background"
        fill
        priority
      />
      {/* Cubre centro-izquierda para legibilidad, pero deja ver la imagen en las esquinas */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/60 to-white/0" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/20" />
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="label-technical mb-4 block">Logística de Alto Nivel</span>
        <h1 className="kinetic-headline mb-8">
          Moviendo el <span className="text-secondary">Norte</span> con Precisión
        </h1>
        <p className="text-lg text-primary/70 max-w-md mb-10 leading-relaxed">
          Líderes en transporte terrestre y soluciones logísticas integrales en Norte de Santander. Eficiencia, seguridad y compromiso en cada kilómetro.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="https://wa.me/573182172113"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all group"
          >
            Cotizar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link href="/servicios" className="border border-primary/20 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all inline-block text-center whitespace-nowrap">
            Nuestros Servicios
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative hidden lg:block"
      >
        <div className="aspect-[4/5] bg-primary overflow-hidden rounded-sm relative group">
          <Image 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-700"
            alt="Truck"
            fill
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <div className="text-6xl font-black mb-2">24/7</div>
            <div className="label-technical text-white/60">Operación Continua</div>
          </div>
        </div>
        {/* Floating element */}
        <div className="absolute -top-10 -right-10 bg-secondary p-8 text-white rounded-sm shadow-2xl hidden xl:block">
          <div className="text-4xl font-black mb-1">+150</div>
          <div className="text-xs uppercase tracking-widest font-bold">Vehículos en Flota</div>
        </div>
      </motion.div>
    </div>
  </section>
);
