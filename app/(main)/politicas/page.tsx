import { ContactForm } from '@/components/ui/ContactForm';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Políticas | TNS',
  description: 'Conoce los lineamientos que rigen la operación de TNS con integridad y responsabilidad.',
};

export default async function Politicas() {
  const politicas = await prisma.policy.findMany({ orderBy: { order: 'asc' } });

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
        {politicas.length === 0 ? (
          <p className="text-center text-primary/40 py-12">
            No hay políticas disponibles por el momento.
          </p>
        ) : (
          <div className="space-y-4">
            {politicas.map((item) => (
              <a
                key={item.id}
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary/10 rounded-sm p-8 hover:border-secondary/40 transition-colors group flex justify-between items-center"
              >
                <div>
                  <span className="label-technical text-primary/40 text-xs mb-2 block">{item.code}</span>
                  <h3 className="text-lg font-bold group-hover:text-secondary transition-colors mb-2">{item.title}</h3>
                  <p className="text-primary/60 text-sm leading-relaxed">{item.description}</p>
                </div>
                <span className="text-2xl text-primary/20 group-hover:text-secondary transition-colors ml-8 flex-shrink-0">↗</span>
              </a>
            ))}
          </div>
        )}
      </section>
      <ContactForm />
    </div>
  );
}

