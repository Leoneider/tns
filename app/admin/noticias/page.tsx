import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { uploadImageToSupabase } from '@/lib/supabase-storage';
import FormWithToast from '../components/FormWithToast';

async function createNews(formData: FormData) {
  'use server';

  let imageUrl = null;
  const imageFile = formData.get('imageFile') as File | null;
  
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadImageToSupabase(imageFile, 'noticias');
    } catch (error) {
      console.error("Error uploading image:", error);
      // In a real app we might return an error state here, for now it will proceed without image or crash
    }
  }

  await prisma.news.create({
    data: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      imageUrl: imageUrl,
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
          Publica nuevas noticias, edita las existentes o elimina publicaciones antiguas.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black pb-1">+</span>
          Publicar Noticia
        </h2>
        <FormWithToast action={createNews} successMessage="Noticia publicada exitosamente" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="title" 
              placeholder="Título de la noticia" 
              required 
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
            />
            <div className="w-full">
              <input 
                type="file" 
                name="imageFile" 
                accept="image/*"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              <p className="text-xs text-gray-500 pl-2">Tamaño recomendado: 800x600 px o superior (Horizontal)</p>
            </div>
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
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              Publicar Noticia
            </button>
          </div>
        </FormWithToast>
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
                    unoptimized 
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

                <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-gray-100">
                  <Link 
                    href={`/admin/noticias/${n.id}`}
                    className="w-full text-center text-emerald-700 hover:bg-emerald-50 bg-white border border-emerald-200 font-medium py-2 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar Noticia
                  </Link>
                  <FormWithToast action={deleteNews} successMessage="Noticia eliminada correctamente" resetOnSuccess={false}>
                    <input type="hidden" name="id" value={n.id} />
                    <button 
                      type="submit" 
                      className="w-full text-center text-red-600 hover:bg-red-50 bg-white border border-red-200 font-medium py-2 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar Noticia
                    </button>
                  </FormWithToast>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
