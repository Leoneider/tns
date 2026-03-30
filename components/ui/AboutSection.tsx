import Image from 'next/image';

export const AboutSection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <Image 
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000" 
            className="w-full aspect-square object-cover grayscale rounded-sm"
            alt="Office"
            width={1000}
            height={1000}
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-surface-low -z-10" />
        </div>
        
        <div>
          <span className="label-technical mb-4 block">Nuestra Historia</span>
          <h2 className="editorial-h2 mb-8">Compromiso con el Desarrollo de la Región</h2>
          <div className="space-y-6 text-primary/70 leading-relaxed">
            <p>
              Fundada en el corazón de Norte de Santander, TNS ha evolucionado de ser una pequeña empresa familiar a convertirse en el referente logístico del departamento.
            </p>
            <p>
              Nuestra misión es conectar empresas y personas, superando las barreras geográficas con tecnología de punta y un equipo humano altamente calificado que entiende el valor de cada entrega.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-primary/10 pt-12">
            <div>
              <div className="text-3xl font-black text-secondary">25+</div>
              <div className="text-xs uppercase font-bold tracking-widest mt-1">Años de Trayectoria</div>
            </div>
            <div>
              <div className="text-3xl font-black text-secondary">500+</div>
              <div className="text-xs uppercase font-bold tracking-widest mt-1">Clientes Corporativos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
