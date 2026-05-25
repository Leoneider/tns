"use client";

import Image from 'next/image';
import Link from 'next/link';

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

          <div className="mt-8">
            <h4 className="text-xs uppercase font-bold tracking-widest mb-4 text-white/40">Redes Sociales</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://www.instagram.com/transportadorestns?igsh=MTBobW9wbDc1bWY3MA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/80 hover:text-secondary transition-colors"
              >
                <span className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_50%,#6228d7_100%)] shadow-md shadow-black/30 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden="true">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.75A4 4 0 003.75 7.75v8.5a4 4 0 004 4h8.5a4 4 0 004-4v-8.5a4 4 0 00-4-4zm4.25 2.5a5.75 5.75 0 11-5.75 5.75A5.76 5.76 0 0112 6.25zm0 1.75A4 4 0 1016 12a4 4 0 00-4-4zm6.25-.19a1.31 1.31 0 11-1.31 1.31 1.31 1.31 0 011.31-1.31z" />
                  </svg>
                </span>
                <span>@transportadorestns</span>
              </a>
              <a
                href="https://www.facebook.com/share/18ebjpeVXu/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/80 hover:text-secondary transition-colors"
              >
                <span className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1877F2] shadow-md shadow-black/30 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor" aria-hidden="true">
                    <path d="M13.62 21v-7.78h2.63l.39-3.03h-3.02V8.26c0-.88.25-1.48 1.52-1.48h1.62V4.07c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.43-3.96 4.06v2.18H8v3.03h2.43V21z" />
                  </svg>
                </span>
                <span>Transportadores de Norte de Santander</span>
              </a>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs uppercase font-bold tracking-widest mb-6 text-white/40">Compañía</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/nosotros" className="hover:text-secondary transition-colors">Nosotros</Link></li>
            <li><Link href="/servicios" className="hover:text-secondary transition-colors">Servicios</Link></li>
            <li><Link href="/responsabilidad-social" className="hover:text-secondary transition-colors">Responsabilidad Social</Link></li>
            <li><Link href="/contacto" className="hover:text-secondary transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase font-bold tracking-widest mb-6 text-white/40">Legal</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/politicas" className="hover:text-secondary transition-colors">Políticas</Link></li>
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
