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
      {/* Hero Header */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-primary px-6 border-b-[8px] border-secondary">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover mix-blend-overlay opacity-60 scale-105 animate-slow-pan"
            alt="Fundación TNS"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-secondary font-bold text-xs tracking-widest uppercase">Fundación TNS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.05] max-w-4xl drop-shadow-lg">
            Impacto Social que <span className="text-secondary">Transforma Vidas</span>
          </h1>
          
          <p className="text-white/80 max-w-2xl mt-4 text-xl leading-relaxed font-light border-l-4 border-secondary pl-6">
            A través de nuestra fundación, materializamos nuestro compromiso con las comunidades vulnerables, la educación y el desarrollo sostenible de Norte de Santander.
          </p>

          <div className="mt-12 flex gap-4">
             <a href="#proyectos" className="px-8 py-4 bg-secondary text-white font-bold rounded-sm uppercase tracking-widest text-sm hover:bg-white hover:text-secondary transition-colors duration-300">
               Ver Donaciones
             </a>
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
