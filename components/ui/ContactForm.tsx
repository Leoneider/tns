"use client";

import { Phone, Mail } from 'lucide-react';

type ContactFormProps = {
  description?: string;
  withSection?: boolean;
};

export const ContactForm = ({
  description = 'Estamos listos para optimizar su logística. Contáctenos hoy mismo.',
  withSection = true,
}: ContactFormProps) => {
  const card = (
    <div className="bg-white rounded-sm shadow-2xl overflow-hidden grid lg:grid-cols-5">
      {/* Left info panel */}
      <div className="lg:col-span-2 bg-primary p-12 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase mb-4">
            Hablemos de su <span className="text-secondary">Proyecto</span>
          </h2>
          <p className="text-white/60 mb-12">{description}</p>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-white/40">Ocaña</div>
                <div className="font-bold text-sm">318 2172113 · 318 8682509</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-white/40">Cúcuta</div>
                <div className="font-bold text-sm">310 2915013</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-white/40 mb-1">Correos</div>
                <div className="text-sm break-all leading-relaxed font-medium">
                  gerencia@transportadorestns.com
                </div>
                <div className="text-sm break-all leading-relaxed font-medium mt-1">
                  gerencia.tnscucuta@gmail.com
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div>
                <div className="text-xs uppercase font-bold text-white/40 mb-1">Redes Sociales</div>
                <a
                  href="https://www.instagram.com/transportadorestns?igsh=MTBobW9wbDc1bWY3MA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-secondary transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80 shrink-0" fill="currentColor" aria-hidden="true">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.75A4 4 0 003.75 7.75v8.5a4 4 0 004 4h8.5a4 4 0 004-4v-8.5a4 4 0 00-4-4zm4.25 2.5a5.75 5.75 0 11-5.75 5.75A5.76 5.76 0 0112 6.25zm0 1.75A4 4 0 1016 12a4 4 0 00-4-4zm6.25-.19a1.31 1.31 0 11-1.31 1.31 1.31 1.31 0 011.31-1.31z" />
                  </svg>
                  <span>@transportadorestns</span>
                </a>
                <a
                  href="https://www.facebook.com/share/18ebjpeVXu/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 text-sm font-medium text-white hover:text-secondary transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80 shrink-0" fill="currentColor" aria-hidden="true">
                    <path d="M13.62 21v-7.78h2.63l.39-3.03h-3.02V8.26c0-.88.25-1.48 1.52-1.48h1.62V4.07c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.43-3.96 4.06v2.18H8v3.03h2.43V21z" />
                  </svg>
                  <span>Transportadores de Norte de Santander</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="lg:col-span-3 p-12">
        <h3 className="text-2xl font-black uppercase text-primary mb-8">Envíenos un Mensaje</h3>
        <form className="grid sm:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="label-technical">Nombre Completo</label>
            <input type="text" className="input-minimal" placeholder="Juan Pérez" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label-technical">Correo Electrónico</label>
            <input type="email" className="input-minimal" placeholder="juan@empresa.com" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label-technical">Teléfono</label>
            <input type="tel" className="input-minimal" placeholder="+57 300 000 0000" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label-technical">Tipo de Servicio</label>
            <select className="input-minimal bg-transparent">
              <option>Carga Pesada</option>
              <option>Logística Express</option>
              <option>Transporte Seguro</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="label-technical">Mensaje</label>
            <textarea
              className="input-minimal min-h-[100px]"
              placeholder="Cuéntenos sobre sus necesidades de transporte..."
            />
          </div>
          <div className="sm:col-span-2">
            <button className="w-full bg-secondary text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-primary transition-all">
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (!withSection) {
    return card;
  }

  return (
    <section className="py-24 bg-surface-low">
      <div className="max-w-7xl mx-auto px-6">
        {card}
      </div>
    </section>
  );
};
