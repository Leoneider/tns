export const metadata = {
  title: 'Nosotros | TNS',
  description: 'Nuestra Historia - Compromiso en cada kilómetro.',
};

export default function Nosotros() {
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
              <p className="text-lg leading-relaxed text-primary/80 font-medium">
                Somos una empresa regionalista, fundada en el año 2014 por un grupo de empresarios visionarios del sector transporte en el departamento. Nuestro propósito inicial fue consolidar una red logística que no solo movilizara carga, sino que impulsara el desarrollo económico de Norte de Santander.
              </p>
              <p className="text-lg leading-relaxed text-primary/70">
                A lo largo de una década, TNS ha evolucionado integrando tecnología de vanguardia y procesos de seguridad rigurosos, convirtiéndonos en el referente de confiabilidad para la industria nacional e internacional que transita por nuestras rutas.
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
              <p className="text-lg leading-relaxed text-primary/70 font-medium">
                Transportadores de Norte de Santander S.A.S. brinda servicios de transporte terrestre de carga integral, superando las expectativas de nuestros aliados estratégicos mediante la excelencia operativa, la seguridad en la cadena de suministro y un equipo humano altamente calificado.
              </p>
            </div>
            {/* Visión */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary text-4xl" data-icon="visibility">visibility</span>
                <h3 className="editorial-h2 text-2xl uppercase tracking-tight">Visión</h3>
              </div>
              <p className="text-lg leading-relaxed text-primary/70 font-medium">
                Para el año 2030, TNS se proyecta como la empresa líder en soluciones logísticas del nororiente colombiano, reconocida por su innovación digital, sostenibilidad ambiental y por ser el motor principal de la competitividad regional en el comercio exterior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Valores */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center lg:text-left">
          <h2 className="editorial-h2 mb-16 text-white uppercase tracking-tight text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 text-center">
            {[
              { num: '01', title: 'Seguridad', desc: 'Protegemos cada entrega con rigurosos estándares operativos y monitoreo constante.' },
              { num: '02', title: 'Calidad', desc: 'Garantizamos eficiencia y precisión en absolutamente toda nuestra cadena logística.' },
              { num: '03', title: 'Servicio', desc: 'Brindamos atención personalizada y soluciones ágiles a todos nuestros aliados.' },
              { num: '04', title: 'Ética', desc: 'Actuamos con máxima transparencia, honestidad y rectitud empresarial e institucional.' },
              { num: '05', title: 'Respeto', desc: 'Valoramos profundamente a nuestro gran equipo, a los clientes y al entorno social.' },
              { num: '06', title: 'Calidez', desc: 'Fomentamos sólidas relaciones cercanas y amigables en cada interacción comercial.' },
            ].map((v) => (
              <div key={v.num} className="group h-56 lg:h-64 [perspective:1000px] cursor-pointer">
                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Frente */}
                  <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-sm p-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left [backface-visibility:hidden]">
                    <div className="text-secondary text-5xl font-black mb-4">{v.num}</div>
                    <h4 className="text-2xl font-bold">{v.title}</h4>
                  </div>
                  {/* Dorso (Hover) */}
                  <div className="absolute inset-0 bg-secondary border border-secondary rounded-sm p-8 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <p className="text-white text-base lg:text-lg font-medium leading-relaxed drop-shadow-sm">{v.desc}</p>
                  </div>
                </div>
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
