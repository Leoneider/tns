import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

async function createNews(formData: FormData) {
  'use server';
  await prisma.news.create({
    data: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      imageUrl: (formData.get('imageUrl') as string) || null,
    }
  });
  revalidatePath('/admin/noticias');
  revalidatePath('/noticias');
  revalidatePath('/'); // in case news are shown on homepage
}

async function deleteNews(formData: FormData) {
  'use server';
  await prisma.news.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/admin/noticias');
  revalidatePath('/noticias');
  revalidatePath('/');
}

export default async function NoticiasPage() {
  const newsList = await prisma.news.findMany({ orderBy: { date: 'desc' } });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Noticias</h1>
        <p className="text-gray-500 text-lg">
          Publica nuevas noticias o elimina publicaciones antiguas.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black pb-1">+</span>
          Publicar Noticia
        </h2>
        <form action={createNews} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="title" 
              placeholder="Título de la noticia" 
              required 
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
            />
            <input 
              type="url" 
              name="imageUrl" 
              placeholder="URL de la imagen destacada (opcional)" 
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
          </div>
          <textarea 
            name="content" 
            placeholder="Contenido principal..." 
            required 
            rows={6}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-y"
          ></textarea>
          <div className="flex">
            <button 
              type="submit" 
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md"
            >
              Publicar Noticia
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Noticias Publicadas</h2>
        
        {newsList.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            Aún no has publicado ninguna noticia.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {newsList.map((n) => (
            <div key={n.id} className="group relative flex flex-col justify-between bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
              {n.imageUrl && (
                <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                  <Image 
                    src={n.imageUrl} 
                    alt={n.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized //! Remove this if we switch to configured remote patterns 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 pr-4">{n.title}</h3>
                </div>
                
                <p className="text-xs font-semibold text-emerald-600 mb-4 bg-emerald-50 w-fit px-2 py-1 rounded inline-block">
                  {new Date(n.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                
                <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                  {n.content}
                </p>

                <form action={deleteNews} className="mt-auto border-t border-gray-100 pt-4">
                  <input type="hidden" name="id" value={n.id} />
                  <button 
                    type="submit" 
                    className="w-full text-center text-red-600 hover:bg-red-50 bg-white border border-red-200 font-medium py-2 rounded-xl transition-colors text-sm"
                  >
                    Eliminar Noticia
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
