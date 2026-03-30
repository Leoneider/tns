import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Nosotros | TNS',
  description: 'Nuestra Historia - Compromiso en cada kilómetro.',
};

export default async function Nosotros() {
  const contents = await prisma.pageContent.findMany({
    where: { 
      key: { in: ['nosotros_historia_1', 'nosotros_historia_2', 'nosotros_mision', 'nosotros_vision'] } 
    }
  });

  const contentMap = contents.reduce((acc, current) => {
    acc[current.key] = current.value;
    return acc;
  }, {} as Record<string, string>);

  const historia1 = contentMap['nosotros_historia_1'] || 'Somos una empresa regionalista, fundada en el año 2014 por un grupo de empresarios visionarios del sector transporte en el departamento. Nuestro propósito inicial fue consolidar una red logística que no solo movilizara carga, sino que impulsara el desarrollo económico de Norte de Santander.';
  const historia2 = contentMap['nosotros_historia_2'] || 'A lo largo de una década, TNS ha evolucionado integrando tecnología de vanguardia y procesos de seguridad rigurosos, convirtiéndonos en el referente de confiabilidad para la industria nacional e internacional que transita por nuestras rutas.';
  const mision = contentMap['nosotros_mision'] || 'Transportadores de Norte de Santander S.A.S. brinda servicios de transporte terrestre de carga integral, superando las expectativas de nuestros aliados estratégicos mediante la excelencia operativa, la seguridad en la cadena de suministro y un equipo humano altamente calificado.';
  const vision = contentMap['nosotros_vision'] || 'Para el año 2030, TNS se proyecta como la empresa líder en soluciones logísticas del nororiente colombiano, reconocida por su innovación digital, sostenibilidad ambiental y por ser el motor principal de la competitividad regional en el comercio exterior.';

  return (
    <main className="bg-white text-primary">
      {/* Hero Section: Editorial Style */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="label-technical text-secondary mb-4 block">Nuestra Historia</span>
            <h1 className="kinetic-headline mb-8">
              Compromiso en cada <span className="text-secondary">Kilómetro</span>.
            </h1>
          </div>
          <div className="relative group">
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 -z-10 rounded-sm"></div>
            <img 
              alt="TNS Logistics en la carretera al atardecer" 
              className="w-full aspect-video object-cover rounded-sm shadow-2xl transition-transform duration-700 group-hover:scale-105" 
              data-alt="Los camiones circulan por una carretera al atardecer" 
              src="https://images.unsplash.com/photo-1745956983820-6e960f7e8472?auto=format&fit=crop&q=80&w=2000"
            />
          </div>
        </div>
      </section>
      
      {/* Section: Reseña Histórica */}
      <section className="py-24 bg-surface-low">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3">
              <h2 className="editorial-h2 border-l-4 border-secondary pl-6 leading-none">Trayectoria Institucional</h2>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <p className="text-lg leading-relaxed text-primary/80 font-medium whitespace-pre-line">
                {historia1}
              </p>
              <p className="text-lg leading-relaxed text-primary/70 whitespace-pre-line">
                {historia2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Misión & Visión */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Misión */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary text-4xl" data-icon="track_changes">track_changes</span>
                <h3 className="editorial-h2 text-2xl uppercase tracking-tight">Misión</h3>
              </div>
              <p className="text-lg leading-relaxed text-primary/70 font-medium whitespace-pre-line">
                {mision}
              </p>
            </div>
            {/* Visión */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary text-4xl" data-icon="visibility">visibility</span>
                <h3 className="editorial-h2 text-2xl uppercase tracking-tight">Visión</h3>
              </div>
              <p className="text-lg leading-relaxed text-primary/70 font-medium whitespace-pre-line">
                {vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Valores */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="label-technical text-secondary mb-4 block">Principios Corporativos</span>
            <h2 className="editorial-h2 text-white uppercase tracking-tight">Nuestros Valores</h2>
            <p className="mt-4 text-white/60 text-lg">
              Los pilares fundamentales que guían cada kilómetro que recorremos y cada decisión que tomamos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Seguridad', desc: 'Protegemos cada entrega con rigurosos estándares operativos y monitoreo constante.', icon: 'security', img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800' },
              { title: 'Calidad', desc: 'Garantizamos eficiencia y precisión en absolutamente toda nuestra cadena logística.', icon: 'workspace_premium', img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800' },
              { title: 'Servicio', desc: 'Brindamos atención personalizada y soluciones ágiles a todos nuestros aliados.', icon: 'support_agent', img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800' },
              { title: 'Ética', desc: 'Actuamos con máxima transparencia, honestidad y rectitud empresarial e institucional.', icon: 'balance', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800' },
              { title: 'Respeto', desc: 'Valoramos profundamente a nuestro gran equipo, a los clientes y al entorno social.', icon: 'diversity_3', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800' },
              { title: 'Calidez', desc: 'Fomentamos sólidas relaciones cercanas y amigables en cada interacción comercial.', icon: 'volunteer_activism', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800' },
            ].map((v, i) => (
              <div 
                key={i} 
                className="group relative rounded-2xl overflow-hidden hover:-translate-y-2 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 min-h-[360px] border border-white/10"
              >
                {/* Background Image */}
                <img 
                  src={v.img} 
                  alt={v.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 z-0" 
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black/95 group-hover:from-black/40 group-hover:via-black/80 group-hover:to-secondary/90 transition-colors duration-500 z-0"></div>
                
                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-secondary group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg">
                    <span className="material-symbols-outlined text-3xl">{v.icon}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:translate-x-2 transition-transform duration-500">{v.title}</h3>
                  
                  <p className="text-white/70 leading-relaxed text-base group-hover:text-white/95 group-hover:translate-x-2 transition-all duration-500 delay-75">
                    {v.desc}
                  </p>
                </div>
                
                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-red-500 group-hover:w-full transition-all duration-700 ease-out z-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kinetic Milestone Component (Asymmetric Image Section) */}
      <section className="py-24 bg-surface-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-0">
          <div className="lg:col-span-6 pr-0 lg:pr-12 relative z-10">
            <div className="bg-white p-10 lg:p-12 shadow-sm rounded-sm border-l-8 border-secondary">
              <h2 className="editorial-h2 mb-6">Excelencia en el Norte</h2>
              <p className="text-lg text-primary/70 mb-8 leading-relaxed">
                Nuestra sede principal en Cúcuta actúa como el epicentro de operaciones que conecta el interior del país con las fronteras internacionales, garantizando que cada despacho cumpla con los estándares más altos de la industria.
              </p>
              <div className="flex gap-12 border-t border-primary/10 pt-8">
                <div>
                  <div className="text-4xl font-black text-secondary">10+</div>
                  <div className="label-technical mt-2 text-primary/60">Años de Exp.</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-secondary">500+</div>
                  <div className="label-technical mt-2 text-primary/60">Rutas Activas</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 -ml-0 lg:-ml-24 mt-8 lg:mt-0 overflow-hidden rounded-sm group">
            <img 
              alt="Mapa de Colombia con rutas desde Norte de Santander" 
              className="w-full h-[500px] object-cover rounded-sm group-hover:scale-110 transition-transform duration-700 shadow-xl" 
              data-alt="Mapa estilizado de Colombia con flechas rojas saliendo del departamento de Norte de Santander hacia el resto del país" 
              src="/mapa_colombia.png"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
