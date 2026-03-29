"use client";

import { Phone, Mail, MapPin, Clock, Building2, Star } from 'lucide-react';

const branches = [
  {
    id: 'ocana',
    name: 'Ocaña',
    badge: 'Oficina Principal',
    isMain: true,
    address: 'Carrera 35 # 7 - 40 Barrio La Primavera, Ocaña, Norte de Santander',
    hours: [
      'Lunes a viernes: 08:00 a.m. – 12:00 p.m. y 02:00 p.m. – 06:00 p.m.',
      'Sábados: 08:00 a.m. – 12:00 p.m.',
    ],
    emails: [
      'gerencia@transportadoresdenortedesantander.com.co',
      'directordecontrato@transportadoresdenortedesantander.com.co',
    ],
    phones: ['318 2172113', '318 8682509'],
    mapEmbedUrl:
      'https://www.google.com/maps?q=Carrera+35+%23+7-40+Barrio+La+Primavera,+Oca%C3%B1a,+Norte+de+Santander&output=embed',
  },
  {
    id: 'cucuta',
    name: 'Cúcuta',
    badge: 'Sucursal',
    isMain: false,
    address: 'Av 7 21N – 55 Sevilla ofc. 103, Cúcuta – Centro Gran Estación',
    hours: [
      'Lunes a viernes: 08:00 a.m. – 12:00 p.m. y 02:00 p.m. – 06:00 p.m.',
      'Sábados: 08:00 a.m. – 12:00 p.m.',
    ],
    emails: ['gerencia.tnscucuta@gmail.com'],
    phones: ['310 2915013'],
    mapEmbedUrl:
      'https://www.google.com/maps?q=Av+7+21N-55+Sevilla,+C%C3%BAcuta,+Norte+de+Santander&output=embed',
  },
];

export const ContactSection = () => (
  <section className="bg-surface-low">
    {/* ── Hero banner ── */}
    <div className="relative bg-primary py-20 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.4) 39px,rgba(255,255,255,.4) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.4) 39px,rgba(255,255,255,.4) 40px)',
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center text-white">
        <span className="inline-block uppercase text-xs font-bold tracking-widest text-secondary mb-4 px-4 py-1 border border-secondary/30 rounded-full">
          Nuestras Sucursales
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
          Estamos Cerca de<span className="text-secondary"> Usted</span>
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-lg">
          Contamos con dos puntos de atención para servirle mejor en toda la región.
        </p>
      </div>
    </div>

    {/* ── Branch cards ── */}
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className={`bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col border-t-4 ${
              branch.isMain ? 'border-secondary' : 'border-primary'
            }`}
          >
            {/* Card header */}
            <div
              className={`px-8 py-6 flex items-center justify-between ${
                branch.isMain ? 'bg-primary' : 'bg-surface-low'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    branch.isMain ? 'bg-secondary/20' : 'bg-primary/10'
                  }`}
                >
                  <Building2
                    className={`w-5 h-5 ${branch.isMain ? 'text-secondary' : 'text-primary'}`}
                  />
                </div>
                <div>
                  <h2
                    className={`text-xl font-black uppercase ${
                      branch.isMain ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {branch.name}
                  </h2>
                </div>
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-bold uppercase px-3 py-1 rounded-full ${
                  branch.isMain
                    ? 'bg-secondary text-white'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                {branch.isMain && <Star className="w-3 h-3 fill-current" />}
                {branch.badge}
              </span>
            </div>

            {/* Card body */}
            <div className="px-8 py-6 flex flex-col gap-6 flex-1">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-9 h-9 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest mb-1">
                    Dirección
                  </div>
                  <p className="text-foreground font-medium text-sm leading-relaxed">
                    {branch.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-9 h-9 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest mb-1">
                    Horarios de Atención
                  </div>
                  {branch.hours.map((h, i) => (
                    <p key={i} className="text-sm text-foreground/80 leading-relaxed">
                      {h}
                    </p>
                  ))}
                </div>
              </div>

              {/* Emails */}
              <div className="flex gap-4">
                <div className="w-9 h-9 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest mb-1">
                    {branch.emails.length > 1 ? 'Correos de Atención' : 'Correo de Atención'}
                  </div>
                  {branch.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-sm text-secondary hover:underline break-all leading-relaxed"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              {/* Phones */}
              <div className="flex gap-4">
                <div className="w-9 h-9 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest mb-1">
                    {branch.phones.length > 1 ? 'Celulares' : 'Celular'}
                  </div>
                  {branch.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:+57${phone.replace(/\s/g, '')}`}
                      className="block text-sm font-bold text-foreground hover:text-secondary transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/57${branch.phones[0].replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-sm font-bold uppercase tracking-widest text-sm transition-all ${
                  branch.isMain
                    ? 'bg-secondary text-white hover:bg-primary'
                    : 'bg-primary text-white hover:bg-secondary'
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── Contact form ── */}
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-white rounded-sm shadow-2xl overflow-hidden grid lg:grid-cols-5">
        {/* Left info panel */}
        <div className="lg:col-span-2 bg-primary p-12 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase mb-4">
              Hablemos de su <span className="text-secondary">Proyecto</span>
            </h2>
            <p className="text-white/60 mb-12">
              Estamos listos para optimizar su logística. Envíenos un mensaje y le responderemos a la brevedad.
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
