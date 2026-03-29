import { ContactForm } from '@/components/ui/ContactForm';

export const metadata = {
  title: 'Políticas | TNS',
  description: 'Conoce los lineamientos que rigen la operación de TNS con integridad y responsabilidad.',
};

const politicas = [
  { title: 'Política de Privacidad', desc: 'Describimos cómo recopilamos, usamos y protegemos los datos personales de nuestros clientes y colaboradores conforme a la Ley 1581 de 2012.' },
  { title: 'Términos y Condiciones', desc: 'Condiciones generales que rigen la prestación de nuestros servicios de transporte y logística a nivel nacional.' },
  { title: 'Política de Seguridad y Salud en el Trabajo (SST)', desc: 'Nuestro compromiso con entornos laborales seguros, la prevención de accidentes y el bienestar de todo nuestro equipo.' },
  { title: 'PQRSD', desc: 'Canal oficial para radicar Peticiones, Quejas, Reclamos, Sugerencias y Denuncias. Respondemos en máximo 15 días hábiles.' },
  { title: 'Política Ambiental', desc: 'Lineamientos para la gestión responsable de residuos, emisiones y consumo de recursos en toda nuestra cadena operativa.' },
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
            <div key={i} className="border border-primary/10 rounded-sm p-8 hover:border-secondary/40 transition-colors group">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-secondary transition-colors mb-2">{item.title}</h3>
                  <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <span className="text-2xl text-primary/20 group-hover:text-secondary transition-colors ml-8">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
