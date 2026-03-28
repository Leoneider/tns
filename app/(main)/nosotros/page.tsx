import { AboutSection } from '@/components/ui/AboutSection';
import { ContactSection } from '@/components/ui/ContactSection';

export const metadata = {
  title: 'Nosotros | TNS',
  description: 'Más de dos décadas moviendo el futuro de Norte de Santander con integridad y eficiencia.',
};

export default function Nosotros() {
  return (
    <div className="pt-20">
      <div className="py-24 bg-surface-low text-center px-6">
        <span className="label-technical text-primary/40 mb-4 block">Quiénes somos</span>
        <h1 className="kinetic-headline mb-4">Sobre TNS</h1>
        <p className="text-primary/60 max-w-2xl mx-auto">
          Más de dos décadas moviendo el futuro de Norte de Santander con integridad y eficiencia.
        </p>
      </div>
      <AboutSection />
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black uppercase mb-16">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'Integridad', desc: 'Actuamos con transparencia y honestidad en cada trato comercial.' },
              { num: '02', title: 'Seguridad', desc: 'La protección de su carga y de nuestro personal es la prioridad absoluta.' },
              { num: '03', title: 'Innovación', desc: 'Invertimos constantemente en tecnología para mejorar nuestros procesos.' },
            ].map((v) => (
              <div key={v.num}>
                <div className="text-secondary text-4xl font-black mb-4">{v.num}</div>
                <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                <p className="text-white/50 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
