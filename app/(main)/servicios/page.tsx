import { ServicesGrid } from '@/components/ui/ServicesGrid';
import { ContactSection } from '@/components/ui/ContactSection';

export const metadata = {
  title: 'Servicios | TNS',
  description: 'Portafolio de servicios de TNS: transporte de carga líquida y seca, recurso humano y tecnológico especializado.',
};

export default function Servicios() {
  return (
    <div className="pt-20">
      <div className="py-24 bg-gray-950 text-white text-center px-6">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-4 block">Portafolio</span>
        <h1 className="text-5xl font-black uppercase">Nuestros Servicios</h1>
        <p className="text-white/50 max-w-2xl mx-auto mt-4">
          Soluciones logísticas especializadas en transporte de carga líquida y seca con
          los más altos estándares de seguridad en Colombia.
        </p>
      </div>
      <ServicesGrid />
      <ContactSection />
    </div>
  );
}

