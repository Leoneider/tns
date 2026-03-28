import prisma from '@/lib/prisma';
import Image from 'next/image';
import { ClientsCarousel } from './ClientsCarousel';
import {
  Droplets,
  Package,
  Users,
  UserCheck,
  Truck,
  ClipboardList,
  Satellite,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

// Map icon string names to actual Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  Package,
  Users,
  UserCheck,
  Truck,
  ClipboardList,
  Satellite,
};

export async function ServicesGrid() {
  const [services, clients] = await Promise.all([
    prisma.service.findMany({ orderBy: { order: 'asc' } }),
    prisma.client.findMany({ orderBy: { order: 'asc' } })
  ]);
  const liquidService = services.find((s) => s.category === 'LIQUID');
  const dryService = services.find((s) => s.category === 'DRY');
  const resourceServices = services.filter((s) => s.category === 'RESOURCE');

  return (
    <div className="bg-white">
      {/* ---------- CARGA LÍQUIDA ---------- */}
      {liquidService && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600 bg-red-50 px-4 py-2 rounded-full mb-6">
                  <Droplets className="w-4 h-4" />
                  Carga Líquida
                </span>
                <h2 className="text-4xl font-black text-gray-900 uppercase leading-tight mb-6">
                  Transporte de <br />
                  <span className="text-red-600">fluidos especializados</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-10">
                  {liquidService.description}
                </p>
                {liquidService.details && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
                      Productos que transportamos
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {liquidService.details.split(',').map((product) => (
                        <span
                          key={product}
                          className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                          {product.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/liquid-cargo.png"
                  alt="Transporte de carga líquida - cisterna TNS"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">Carga Líquida</p>
                  <p className="text-white/70 text-sm mt-1">Operación segura y certificada</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- SEPARATOR ---------- */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-10" />

      {/* ---------- CARGA SECA ---------- */}
      {dryService && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image (left on this one) */}
              <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                <Image
                  src="/dry-cargo.png"
                  alt="Transporte de carga seca - TNS"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">Carga Seca</p>
                  <p className="text-white/70 text-sm mt-1">Trazabilidad total de mercancía</p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700 bg-amber-50 px-4 py-2 rounded-full mb-6">
                  <Package className="w-4 h-4" />
                  Carga Seca
                </span>
                <h2 className="text-4xl font-black text-gray-900 uppercase leading-tight mb-6">
                  Transporte de <br />
                  <span className="text-amber-600">mercancía seca</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-10">
                  {dryService.description}
                </p>
                {dryService.details && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
                      Productos que transportamos
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {dryService.details.split(',').map((product) => (
                        <span
                          key={product}
                          className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          {product.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- RECURSOS HUMANOS & TECNOLÓGICOS ---------- */}
      {resourceServices.length > 0 && (
        <section className="py-24 bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-4 block">
                Capacidad operativa
              </span>
              <h2 className="text-4xl font-black uppercase leading-tight">
                Recurso Humano &amp;{' '}
                <span className="text-red-500">Tecnológico</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Combinamos talento humano especializado con tecnología de punta para garantizar
                operaciones logísticas eficientes, seguras y trazables.
              </p>
            </div>

            {/* First row: up to 3 cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourceServices.slice(0, 3).map((resource) => {
                const Icon = ICON_MAP[resource.icon] ?? Package;
                return (
                  <div
                    key={resource.id}
                    className="group flex items-start gap-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
                  >
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-red-600/20 group-hover:bg-red-600/30 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-snug mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Second row: remaining cards centered */}
            {resourceServices.length > 3 && (
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                {resourceServices.slice(3).map((resource) => {
                  const Icon = ICON_MAP[resource.icon] ?? Package;
                  return (
                    <div
                      key={resource.id}
                      className="group flex items-start gap-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                    >
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-red-600/20 group-hover:bg-red-600/30 flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-snug mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------- CERTIFICACIONES ---------- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600 mb-4 block">
              Calidad garantizada
            </span>
            <h2 className="text-4xl font-black text-gray-900 uppercase leading-tight">
              Nuestras{' '}
              <span className="text-red-600">Certificaciones</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              Estándares internacionales que respaldan la calidad, seguridad y gestión
              ambiental de nuestras operaciones.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* ISO 9001 */}
            <div className="group flex flex-col items-center bg-gray-50 hover:bg-white border border-gray-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
              <div className="relative w-28 h-28 mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/certificaciones/ISO-9001.png"
                  alt="Certificación ISO 9001"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">
                ISO 9001
              </p>
              <p className="text-gray-800 font-black text-xl mt-1">GC 492</p>
              <p className="text-gray-500 text-xs mt-2 text-center leading-relaxed">
                Sistema de Gestión de Calidad
              </p>
            </div>

            {/* ISO 45001 */}
            <div className="group flex flex-col items-center bg-gray-50 hover:bg-white border border-gray-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
              <div className="relative w-28 h-28 mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/certificaciones/GM1190-2019-45001-1.png"
                  alt="Certificación ISO 45001"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">
                ISO 45001
              </p>
              <p className="text-gray-800 font-black text-xl mt-1">GS 1200</p>
              <p className="text-gray-500 text-xs mt-2 text-center leading-relaxed">
                Seguridad y Salud en el Trabajo
              </p>
            </div>

            {/* ISO 14001 */}
            <div className="group flex flex-col items-center bg-gray-50 hover:bg-white border border-gray-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
              <div className="relative w-28 h-28 mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/certificaciones/ISO-14001.png"
                  alt="Certificación ISO 14001"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">
                ISO 14001
              </p>
              <p className="text-gray-800 font-black text-xl mt-1">GA 741</p>
              <p className="text-gray-500 text-xs mt-2 text-center leading-relaxed">
                Gestión Ambiental
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CLIENTES ---------- */}
      {clients.length > 0 && <ClientsCarousel clients={clients} />}
    </div>
  );
}
