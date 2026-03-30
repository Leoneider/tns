import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { uploadImageToSupabase } from '@/lib/supabase-storage';
import FormWithToast from '../../components/FormWithToast';

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
  });

  if (!client) {
    notFound();
  }

  async function updateClient(formData: FormData) {
    'use server';

    const id = formData.get('id') as string;
    let logoUrl: string | undefined = undefined;

    const logoFile = formData.get('logoFile') as File | null;
    if (logoFile && logoFile.size > 0) {
      try {
        logoUrl = await uploadImageToSupabase(logoFile, 'clientes');
      } catch (error) {
        console.error('Error uploading logo:', error);
      }
    }

    const dataToUpdate: Record<string, unknown> = {
      name: formData.get('name') as string,
      websiteUrl: (formData.get('websiteUrl') as string) || null,
    };

    if (logoUrl) {
      dataToUpdate.logoUrl = logoUrl;
    }

    await prisma.client.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath('/admin/clientes');
    revalidatePath('/');
    redirect('/admin/clientes');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/admin/clientes"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Editar Cliente</h1>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <FormWithToast action={updateClient} successMessage="Cliente actualizado correctamente" className="space-y-6">
          <input type="hidden" name="id" value={client.id} />

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">
              Nombre del cliente
            </label>
            <input
              type="text"
              name="name"
              defaultValue={client.name}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">
              Sitio web <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              type="url"
              name="websiteUrl"
              defaultValue={client.websiteUrl ?? ''}
              placeholder="https://ejemplo.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">
              Actualizar Logo <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              type="file"
              name="logoFile"
              accept="image/*"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            <p className="text-xs text-gray-500 pl-2 mt-1">Recomendado: 400×200px, fondo transparente (PNG/SVG/WEBP)</p>

            {/* Logo preview */}
            {client.logoUrl && (
              <div className="mt-4 border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex gap-4 items-center">
                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0 flex items-center justify-center p-2">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Logo actual</p>
                  <p className="text-xs text-orange-600 mt-1">Sube un archivo nuevo para reemplazar este logo.</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end border-t border-gray-100 pt-6 gap-3">
            <Link
              href="/admin/clientes"
              className="rounded-xl px-8 py-3 text-gray-600 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              Guardar Cambios
            </button>
          </div>
        </FormWithToast>
      </div>
    </div>
  );
}
