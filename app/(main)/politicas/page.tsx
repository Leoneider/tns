import { ContactForm } from '@/components/ui/ContactForm';

export const metadata = {
  title: 'Políticas | TNS',
  description: 'Conoce los lineamientos que rigen la operación de TNS con integridad y responsabilidad.',
};

const politicas = [
  {
    code: 'PO-ME-001',
    title: 'Política de SIG',
    desc: 'Lineamientos del Sistema Integrado de Gestión que orientan el desempeño de TNS bajo estándares de calidad, seguridad y medio ambiente.',
    pdf: '/certificaciones/PO-ME-001 POLITICA DE SIG.pdf',
  },
  {
    code: 'PO-ME-003',
    title: 'Política de Prevención del Consumo de Alcohol, Tabaco y Otras Sustancias Psicoactivas',
    desc: 'Compromiso de TNS con ambientes laborales libres de sustancias psicoactivas, en protección de la salud y la seguridad de todos los colaboradores.',
    pdf: '/certificaciones/PO-ME-003 POLITICA DE PREVENCIÓN DEL CONSUMO DE ALCOHOL, TABACO Y OTRAS SUSTANCIAS PSICOACTIVAS.pdf',
  },
  {
    code: 'PO-ME-004',
    title: 'Política de Seguridad Vial',
    desc: 'Directrices para la operación segura de vehículos y la reducción de riesgos en vía, en cumplimiento del Plan Estratégico de Seguridad Vial.',
    pdf: '/certificaciones/PO-ME-004 POLÍTICA DE SEGURIDAD VIAL.pdf',
  },
  {
    code: 'PO-ME-006',
    title: 'Política de Prevención de Acoso Laboral',
    desc: 'Marco de actuación de TNS para prevenir, detectar y atender situaciones de acoso laboral, garantizando un entorno de trabajo digno y respetuoso.',
    pdf: '/certificaciones/PO-ME-006 POLITICA DE PREVENCIÓN DE ACOSO LABORAL.pdf',
  },
];

export default function Politicas() {
  return (
    <div className="pt-20">
      <div className="py-24 bg-primary text-white text-center px-6">
        <span className="label-technical text-white/50 mb-4 block">Transparencia</span>
        <h1 className="text-5xl font-black uppercase">Políticas</h1>
        <p className="text-white/60 max-w-2xl mx-auto mt-4">
          Conoce los lineamientos que rigen nuestra operación con integridad y responsabilidad.
        </p>
      </div>
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          {politicas.map((item, i) => (
            <a
              key={i}
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/10 rounded-sm p-8 hover:border-secondary/40 transition-colors group flex justify-between items-center"
            >
              <div>
                <span className="label-technical text-primary/40 text-xs mb-2 block">{item.code}</span>
                <h3 className="text-lg font-bold group-hover:text-secondary transition-colors mb-2">{item.title}</h3>
                <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-2xl text-primary/20 group-hover:text-secondary transition-colors ml-8 flex-shrink-0">↗</span>
            </a>
          ))}
        </div>
      </section>
      <ContactForm />
    </div>
  );
}

