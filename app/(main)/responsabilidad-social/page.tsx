import { ContactForm } from '@/components/ui/ContactForm';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SocialGallery } from '@/components/ui/SocialGallery';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Responsabilidad Social | TNS',
  description: 'Nuestro compromiso con las comunidades, el medio ambiente y el desarrollo sostenible de Norte de Santander.',
};

export const dynamic = 'force-dynamic';

export default async function ResponsabilidadSocial() {
  let projects: any[] = [];
  let csrStats: any[] = [];
  
  try {
    csrStats = await prisma.cSRStat.findMany();
  } catch (_e) {
    console.warn("Failed to fetch CSRStats:", _e);
  }

  try {
    projects = await (prisma as any).socialProject.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (_e) {
    // Prisma client may not have been regenerated yet — gallery will be empty
  }
  return (
    <main className="bg-white text-primary antialiased">
      {/* Hero Header Rediseñado para Fundación de Niños */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-sky-50 px-6">
        {/* Elementos juguetones de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl"></div>
          <div className="absolute top-48 -left-24 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenido de Texto */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <img 
              src="/fundacion.png" 
              alt="Logo Fundación TNS" 
              className="w-64 md:w-80 mb-8 drop-shadow-md hover:scale-105 transition-transform duration-300" 
            />
            
            <h1 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight leading-[1.15] drop-shadow-sm">
              Construyendo un futuro <span className="text-secondary relative inline-block">
                lleno de sonrisas
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400 opacity-80" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-slate-600 max-w-xl mt-6 text-xl leading-relaxed font-medium">
              A través de nuestra fundación, materializamos nuestro compromiso con los niños, las comunidades vulnerables y la educación en Norte de Santander.
            </p>

            <div className="mt-10 flex gap-4">
               <a href="#proyectos" className="px-8 py-4 bg-secondary text-white font-bold rounded-full shadow-lg shadow-secondary/30 uppercase tracking-wide text-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
                 <span>Descubre nuestro impacto</span>
                 <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">favorite</span>
               </a>
            </div>
          </div>

          {/* Contenedor de Imagen Juguetón */}
          <div className="relative w-full flex justify-center items-center mt-12 lg:mt-0">
            <div className="relative w-full max-w-md aspect-square">
              {/* Formas coloridas de fondo */}
              <div className="absolute inset-0 bg-yellow-400 rounded-[40px] rotate-6 scale-105 opacity-50"></div>
              <div className="absolute inset-0 bg-sky-400 rounded-[40px] -rotate-3 scale-105 opacity-50"></div>
              
              {/* Imagen Principal */}
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
                className="absolute inset-0 w-full h-full object-cover rounded-[40px] border-8 border-white shadow-2xl z-10 hover:rotate-0 transition-transform duration-500"
                alt="Niños sonriendo - Fundación TNS"
              />
              
              {/* Decoraciones flotantes */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink-400 rounded-full shadow-lg flex items-center justify-center text-white z-20">
                <span className="material-symbols-outlined text-3xl">star</span>
              </div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-full shadow-xl border-4 border-sky-100 flex items-center justify-center p-4 z-20">
                <img src="/fundacion.png" alt="Icono" className="object-contain w-full h-full drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="text-center mb-16">
          <span className="label-technical text-primary/40 mb-4 block">Nuestro Alcance</span>
          <p className="text-2xl text-primary/80 font-medium max-w-3xl mx-auto leading-relaxed">
            Comunidades en las que tenemos presencia activa y continua: <br/>
            <span className="font-bold text-secondary text-3xl">Tibú, Sardinata y San Agustín de los Pozos.</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden border border-primary/5 bg-white">
          {/* Left colored block */}
          <div className="md:w-1/3 bg-secondary text-white py-16 px-10 flex flex-col justify-center items-center text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2">Algunas Cifras</span>
            <h3 className="text-4xl lg:text-5xl font-black uppercase leading-[1.1]">Nuestro Impacto</h3>
          </div>

          {/* Right stats block */}
          <div className="md:w-2/3 bg-white py-16 px-4 md:px-10 flex flex-col md:flex-row justify-around items-center gap-12 md:gap-4 md:divide-x md:divide-primary/10">
            {csrStats.length > 0 ? (
              csrStats.map((stat, idx) => {
                const numberValue = parseInt(stat.value) || 0;
                // Extraer el símbolo (como "M", "+", "%") removiendo los números
                const symbol = stat.value.replace(/[0-9]/g, '').trim() || '+';
                
                return (
                  <div key={stat.id} className="text-center w-full flex-1 px-4 group hover:-translate-y-2 transition-transform duration-300 cursor-default">
                    <div className="text-7xl font-light text-primary flex items-center justify-center mb-4 tracking-tighter group-hover:scale-110 group-hover:text-secondary transition-all duration-500">
                      <AnimatedCounter value={numberValue} duration={2000} />
                      <span className="text-secondary font-medium ml-1 text-6xl group-hover:scale-110 transition-transform duration-500">{symbol}</span>
                    </div>
                    <div className="text-[0.80rem] font-bold text-primary/60 tracking-widest uppercase group-hover:text-primary/90 transition-colors duration-300">{stat.label}</div>
                  </div>
                );
              })
            ) : (
              <div className="text-center w-full text-primary/50 italic">
                Agrega cifras en el panel administrativo para mostrarlas aquí.
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center md:text-right px-2">
          <p className="text-xs text-primary/40 font-medium italic">
            * Cifras actualizadas a: febrero de 2026.
          </p>
        </div>

      </section>

      <div id="proyectos">
        <SocialGallery projects={projects} />
      </div>

      <ContactForm />
    </main>
  );
}
