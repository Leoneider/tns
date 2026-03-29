import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

async function createProject(formData: FormData) {
  'use server';
  await (prisma as any).socialProject.create({
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      order: 0,
    }
  });
  revalidatePath('/admin/proyectos-sociales');
  revalidatePath('/responsabilidad-social');
}

async function deleteProject(formData: FormData) {
  'use server';
  await (prisma as any).socialProject.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/admin/proyectos-sociales');
  revalidatePath('/responsabilidad-social');
}

export default async function SocialProjectsAdmin() {
  const projects: any[] = await (prisma as any).socialProject.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Galería de Proyectos Sociales</h1>
        <p className="text-gray-500 text-lg">
          Gestiona las fotografías y métricas de los proyectos e impactos sociales de TNS.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black pb-1">+</span>
          Subir Nuevo Proyecto
        </h2>
        <form action={createProject} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="title" 
              placeholder="Título del Proyecto (ej. Entrega Kits Tibú)" 
              required 
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
            />
            <input 
              type="url" 
              name="imageUrl" 
              placeholder="URL de la imagen (Unsplash o externa)" 
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
            />
          </div>
          <textarea 
            name="description" 
            placeholder="Breve descripción del impacto..." 
            required 
            rows={4}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-y"
          ></textarea>
          <div className="flex">
            <button 
              type="submit" 
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md"
            >
              Publicar Proyecto
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Galería Actual</h2>
        
        {projects.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            Aún no has publicado ningún proyecto.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="group relative flex flex-col justify-between bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image 
                  src={p.imageUrl} 
                  alt={p.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-md leading-tight mb-2 line-clamp-2">{p.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                  {p.description}
                </p>

                <form action={deleteProject} className="mt-auto border-t border-gray-100 pt-4">
                  <input type="hidden" name="id" value={p.id} />
                  <button 
                    type="submit" 
                    className="w-full text-center text-red-600 hover:bg-red-50 bg-white border border-red-200 font-medium py-2 rounded-xl transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
