import { ContactSection } from '@/components/ui/ContactSection';

export const metadata = {
  title: 'Responsabilidad Social | TNS',
  description: 'Nuestro compromiso con las comunidades, el medio ambiente y el desarrollo sostenible de Norte de Santander.',
};

export default function ResponsabilidadSocial() {
  const pilares = [
    { num: '01', title: 'Medio Ambiente', desc: 'Implementamos prácticas de transporte eco-eficiente, reduciendo nuestra huella de carbono año a año con flota renovada y rutas optimizadas.' },
    { num: '02', title: 'Comunidad', desc: 'Apoyamos programas de empleo local y formación técnica en logística para jóvenes de la región nortesantandereana.' },
    { num: '03', title: 'Seguridad Vial', desc: 'Capacitamos permanentemente a nuestros conductores y promovemos campañas de educación vial en las vías que operamos.' },
  ];

  return (
    <div className="pt-20">
      <div className="py-24 bg-primary text-white text-center px-6">
        <span className="label-technical text-white/50 mb-4 block">Compromiso</span>
        <h1 className="text-5xl font-black uppercase">Responsabilidad Social</h1>
        <p className="text-white/60 max-w-2xl mx-auto mt-4">
          Nuestro compromiso con las comunidades, el medio ambiente y el desarrollo sostenible de Norte de Santander.
        </p>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {pilares.map((item) => (
            <div key={item.num} className="bg-surface-low p-10 rounded-sm">
              <div className="text-secondary text-4xl font-black mb-4">{item.num}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
