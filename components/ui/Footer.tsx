"use client";

import { Truck } from 'lucide-react';
import Image from 'next/image';

export const Footer = () => (
  <footer className="bg-primary text-white py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <Image
              src="/tns-logo.png"
              alt="TNS Logo"
              width={160}
              height={60}
              className="w-auto h-10 brightness-0 invert"
            />
          </div>
          <p className="text-white/50 max-w-sm leading-relaxed">
            Transportadores de Norte de Santander S.A.S. - Soluciones logísticas de clase mundial con ADN regional.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase font-bold tracking-widest mb-6 text-white/40">Compañía</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-secondary transition-colors">Nosotros</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Servicios</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Sostenibilidad</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Trabaje con nosotros</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase font-bold tracking-widest mb-6 text-white/40">Legal</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-secondary transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Política de Privacidad</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">SST</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">PQRSD</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase font-bold tracking-widest">
        <div>© 2026 TNS S.A.S. Todos los derechos reservados.</div>
        <div>Diseñado para la excelencia logística.</div>
      </div>
    </div>
  </footer>
);
