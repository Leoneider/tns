import { ContactForm } from '@/components/ui/ContactForm';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SocialGallery } from '@/components/ui/SocialGallery';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Responsabilidad Social | TNS',
  description: 'Nuestro compromiso con las comunidades, el medio ambiente y el desarrollo sostenible de Norte de Santander.',
};

export default async function ResponsabilidadSocial() {
  let projects: any[] = [];
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
      <section className="relative pt-40 pb-24 overflow-hidden bg-primary px-6">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover grayscale opacity-70 object-center"
            alt="Apoyo a la Educación y Comunidad"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="label-technical text-white/50 mb-4 block">Compromiso Corporativo</span>
          <h1 className="kinetic-headline text-white mb-6 tracking-tight">Responsabilidad Social</h1>
          <p className="text-white/70 max-w-2xl mx-auto mt-4 text-lg leading-relaxed">
            Nuestro compromiso inquebrantable con las comunidades vulnerables, la educación y el desarrollo sostenible de Norte de Santander.
          </p>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-xl text-primary/80 font-medium">
            Comunidades en las que se tiene presencia: <span className="font-bold text-secondary">Tibú, Sardinata y San Agustín de los Pozos.</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden border border-primary/5">
          {/* Left colored block */}
          <div className="md:w-1/3 bg-secondary text-white py-16 px-10 flex flex-col justify-center items-center text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2">Algunas Cifras</span>
            <h3 className="text-4xl lg:text-5xl font-black uppercase leading-[1.1]">Nuestro Impacto</h3>
          </div>

          {/* Right stats block */}
          <div className="md:w-2/3 bg-white py-16 px-4 md:px-10 flex flex-col md:flex-row justify-around items-center gap-12 md:gap-4">

            <div className="text-center w-full px-4 group hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <div className="text-7xl font-light text-primary flex items-center justify-center mb-4 tracking-tighter group-hover:scale-110 group-hover:text-secondary transition-all duration-500">
                <AnimatedCounter value={20} duration={2000} /><span className="text-secondary font-medium ml-1 text-6xl group-hover:scale-110 transition-transform duration-500">+</span>
              </div>
              <div className="text-[0.80rem] font-bold text-primary/60 tracking-widest uppercase group-hover:text-primary/90 transition-colors duration-300">Familias Impactadas</div>
            </div>

            <div className="text-center w-full px-4 border-t md:border-t-0 md:border-l border-primary/10 pt-12 md:pt-0 group hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <div className="text-7xl font-light text-primary flex items-center justify-center mb-4 tracking-tighter group-hover:scale-110 group-hover:text-secondary transition-all duration-500">
                <AnimatedCounter value={7} duration={2000} /><span className="text-secondary font-medium ml-1 text-6xl group-hover:scale-110 transition-transform duration-500">+</span>
              </div>
              <div className="text-[0.80rem] font-bold text-primary/60 tracking-widest uppercase group-hover:text-primary/90 transition-colors duration-300">Instituciones Educativas</div>
            </div>

            <div className="text-center w-full px-4 border-t md:border-t-0 md:border-l border-primary/10 pt-12 md:pt-0 group hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <div className="text-7xl font-light text-primary flex items-center justify-center mb-4 tracking-tighter group-hover:scale-110 group-hover:text-secondary transition-all duration-500">
                <AnimatedCounter value={64} duration={2000} /><span className="text-secondary font-medium ml-1 text-6xl text-secondary group-hover:scale-110 transition-transform duration-500">+</span>
              </div>
              <div className="text-[0.80rem] font-bold text-primary/60 tracking-widest uppercase group-hover:text-primary/90 transition-colors duration-300">Materiales Educativos</div>
            </div>

          </div>
        </div>

        <div className="mt-4 text-center md:text-right px-2">
          <p className="text-xs text-primary/40 font-medium italic">
            * Cifras actualizadas a: febrero de 2026.
          </p>
        </div>

      </section>

      <SocialGallery projects={projects} />

      <ContactForm />
    </main>
  );
}
