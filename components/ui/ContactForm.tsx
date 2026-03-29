"use client";

import { Phone, Mail } from 'lucide-react';

export const ContactForm = () => (
  <section className="py-24 bg-surface-low">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-white rounded-sm shadow-2xl overflow-hidden grid lg:grid-cols-5">
        {/* Left info panel */}
        <div className="lg:col-span-2 bg-primary p-12 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase mb-4">
              Hablemos de su <span className="text-secondary">Proyecto</span>
            </h2>
            <p className="text-white/60 mb-12">
              Estamos listos para optimizar su logística. Contáctenos hoy mismo.
            </p>

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
                    gerencia@transportadoresdenortedesantander.com.co
                  </div>
                  <div className="text-sm break-all leading-relaxed font-medium mt-1">
                    gerencia.tnscucuta@gmail.com
                  </div>
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
    </div>
  </section>
);
