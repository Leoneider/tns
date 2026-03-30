import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { uploadImageToSupabase } from '@/lib/supabase-storage';
import FormWithToast from '../../components/FormWithToast';

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const newsItem = await prisma.news.findUnique({
    where: { id: params.id },
  });

  if (!newsItem) {
    notFound();
  }

  async function updateNews(formData: FormData) {
    'use server';

    const id = formData.get('id') as string;
    let imageUrl: string | undefined = undefined;
    
    const imageFile = formData.get('imageFile') as File | null;
    if (imageFile && imageFile.size > 0) {
      try {
        imageUrl = await uploadImageToSupabase(imageFile, 'noticias');
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const dataToUpdate: any = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    };

    if (imageUrl) {
      dataToUpdate.imageUrl = imageUrl;
    }

    await prisma.news.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');
    revalidatePath('/');
    redirect('/admin/noticias');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/admin/noticias" className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-200 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Editar Noticia</h1>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <FormWithToast action={updateNews} successMessage="Noticia actualizada correctamente" className="space-y-6">
          <input type="hidden" name="id" value={newsItem.id} />
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Título de la noticia</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={newsItem.title}
              required 
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Contenido Principal</label>
            <textarea 
              name="content" 
              defaultValue={newsItem.content}
              required 
              rows={8}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-y"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Actualizar Imagen Destacada (Opcional)</label>
            <input 
              type="file" 
              name="imageFile" 
              accept="image/*"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            {newsItem.imageUrl && (
              <div className="mt-4 border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex gap-4 items-center">
                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                  <Image 
                    src={newsItem.imageUrl} 
                    alt="Vista previa" 
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Imagen actual de la noticia</p>
                  <p className="text-xs text-emerald-600 mt-1">Sube un archivo nuevo para reemplazar esta imagen.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end border-t border-gray-100 pt-6">
            <Link 
              href="/admin/noticias"
              className="rounded-xl px-8 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors mr-4"
            >
              Cancelar
            </Link>
            <button 
              type="submit" 
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              Guardar Cambios
            </button>
          </div>
        </FormWithToast>
      </div>
    </div>
  );
}
