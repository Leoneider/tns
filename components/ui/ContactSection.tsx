"use client";

import { Phone, Mail, MapPin, Globe, Share2, MessageSquare } from 'lucide-react';

export const ContactSection = () => (
  <section className="py-24 bg-surface-low">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-white rounded-sm shadow-2xl overflow-hidden grid lg:grid-cols-5">
        <div className="lg:col-span-2 bg-primary p-12 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase mb-8">Hablemos de su <span className="text-secondary">Proyecto</span></h2>
            <p className="text-white/60 mb-12">Estamos listos para optimizar su logística. Contáctenos hoy mismo.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-white/40">Llámenos</div>
                  <div className="font-bold">+57 (607) 583 0000</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-white/40">Escríbanos</div>
                  <div className="font-bold">contacto@tns.com.co</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-white/40">Visítenos</div>
                  <div className="font-bold">Zona Industrial, Cúcuta, N.S.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 p-12">
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
              <textarea className="input-minimal min-h-[100px]" placeholder="Cuéntenos sobre sus necesidades de transporte..." />
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
