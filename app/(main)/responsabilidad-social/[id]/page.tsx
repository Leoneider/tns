import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const revalidate = 0; // Ensures fresh data if needed, or rely on normal Next.js caching

export async function generateMetadata({ params }: { params: { id: string } }) {
  const projectItem = await (prisma as any).socialProject.findUnique({
    where: { id: params.id },
  });

  if (!projectItem) return { title: "Proyecto no encontrado | Fundación TNS" };

  return {
    title: `${projectItem.title} | Fundación TNS`,
    description: projectItem.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectItem = await (prisma as any).socialProject.findUnique({
    where: { id: params.id },
  });

  if (!projectItem) {
    notFound();
  }

  // Fetch related projects (last 3 excluding the current one)
  const relatedProjects = await (prisma as any).socialProject.findMany({
    where: {
      id: { not: params.id },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const formattedDate = new Date(projectItem.createdAt).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Since the content is plain text, let's split it into paragraphs intelligently
  // If content is empty, fallback to description.
  const textContent = projectItem.content?.trim() || projectItem.description;
  const paragraphs = textContent.split("\n").filter((p: string) => p.trim() !== "");
  
  // We'll treat the first paragraph differently to match the quote-like "kinetic-editorial-border" design
  const firstParagraph = paragraphs.shift();

  return (
    <main className="pt-24 pb-20 fade-in-up">
      {/* Hero Article Header */}
      <header className="max-w-7xl mx-auto px-6 mb-16">
        <Link href="/responsabilidad-social#proyectos" className="inline-flex items-center text-sm font-bold text-primary/40 hover:text-secondary transition-colors mb-10 group">
          <span className="material-symbols-outlined mr-2 text-lg group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Volver a Proyectos
        </Link>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-secondary font-bold tracking-widest text-xs uppercase py-1 px-3 bg-secondary/10 rounded-sm">
              Donación / Impacto
            </span>
            <span className="text-primary/60 text-xs font-semibold uppercase tracking-widest">
              {formattedDate}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[-[-[-3.5rem]-]-] leading-[1.1] font-black tracking-tighter text-primary max-w-4xl">
            {projectItem.title}
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Article Body */}
        <article className="lg:col-span-8 space-y-12">
          {projectItem.imageUrl && (
            <div className="aspect-[21/9] w-full overflow-hidden rounded-lg bg-surface-low relative">
              <Image
                alt={projectItem.title}
                className="w-full h-full object-cover"
                src={projectItem.imageUrl}
                fill
                unoptimized
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-primary/80 leading-[1.8] space-y-8 font-sans">
            {firstParagraph && (
              <p className="text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-secondary pl-6 text-primary/70">
                {firstParagraph}
              </p>
            )}

            {paragraphs.map((para: string, idx: number) => (
              <p key={idx} className="text-lg">
                {para}
              </p>
            ))}

            {/* If there was no content, just a fallback */}
            {!firstParagraph && paragraphs.length === 0 && (
              <p className="text-lg text-primary/60">
                El contenido de este proyecto no está disponible.
              </p>
            )}
          </div>

          {/* Tags & Share */}
          <div className="pt-12 border-t border-primary/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex gap-2">
              <span className="px-4 py-1.5 text-xs font-bold bg-surface-low text-primary/60 rounded-full uppercase tracking-wider">
                Fundación TNS
              </span>
              <span className="px-4 py-1.5 text-xs font-bold bg-surface-low text-primary/60 rounded-full uppercase tracking-wider">
                Impacto Social
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-primary/40 uppercase tracking-widest">
                Compartir:
              </span>
              {/* WhatsApp Share implementation */}
              <a
                href={`https://api.whatsapp.com/send?text=Conoce más sobre este impacto de la Fundación TNS: ${projectItem.title}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-low text-primary/60 hover:bg-green-500 hover:text-white transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.062 3.966L0 16l4.223-1.108c1.157.635 2.454.968 3.766.97h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Sidebar: Related Projects */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="sticky top-32">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-secondary"></span>
              Más Proyectos
            </h3>

            <div className="flex flex-col gap-10">
              {relatedProjects.length === 0 ? (
                <p className="text-primary/40 text-sm">No hay más proyectos por el momento.</p>
              ) : (
                relatedProjects.map((related: any) => {
                  const relatedDate = new Date(related.createdAt).toLocaleDateString("es-CO", {
                    month: "long",
                    year: "numeric"
                  });
                  return (
                    <Link href={`/responsabilidad-social/${related.id}`} key={related.id} className="group block">
                      {related.imageUrl ? (
                        <div className="aspect-video w-full overflow-hidden rounded-md mb-4 bg-surface-low relative">
                          <Image
                            src={related.imageUrl}
                            alt={related.title}
                            fill
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full overflow-hidden rounded-md mb-4 bg-primary/5 flex items-center justify-center text-primary/20 text-3xl font-black uppercase transition-all duration-500">
                          {new Date(related.createdAt).toLocaleDateString("es-CO", { month: "short" })}
                        </div>
                      )}

                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">
                        • {relatedDate}
                      </span>
                      <h4 className="text-lg font-bold leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
