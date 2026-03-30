import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { uploadImageToSupabase } from '@/lib/supabase-storage';
import FormWithToast from '../components/FormWithToast';

async function createClient(formData: FormData) {
  'use server';

  let logoUrl = '';
  const logoFile = formData.get('logoFile') as File | null;
  
  if (logoFile && logoFile.size > 0) {
    try {
      logoUrl = await uploadImageToSupabase(logoFile, 'clientes');
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  }

  await prisma.client.create({
    data: {
      name: formData.get('name') as string,
      logoUrl: logoUrl,
      // @ts-ignore
      websiteUrl: (formData.get('websiteUrl') as string) || null,
    }
  });
  revalidatePath('/admin/clientes');
  revalidatePath('/');
}

async function deleteClient(formData: FormData) {
  'use server';
  await prisma.client.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/admin/clientes');
  revalidatePath('/');
}

export default async function ClientesPage() {
  const clients = await prisma.client.findMany();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Clientes Destacados</h1>
        <p className="text-gray-500 text-lg">
          Agrega, edita o elimina los clientes que se muestran en el sitio web.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-black pb-1">+</span>
          Añadir Nuevo Cliente
        </h2>
        <FormWithToast
          action={createClient}
          successMessage="Cliente añadido con éxito"
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <input
              type="text"
              name="name"
              placeholder="Nombre del cliente (ej. Palnorte)"
              required
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
            />
            <input
              type="file"
              name="logoFile"
              accept="image/*"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            <button
              type="submit"
              className="sm:w-auto rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-50"
            >
              Añadir Cliente
            </button>
          </div>
          <p className="text-xs text-gray-400 pl-1">Logo recomendado: 400×200px, fondo transparente (PNG / SVG / WEBP)</p>
        </FormWithToast>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Lista de Clientes <span className="text-sm font-normal text-gray-400 ml-2">{clients.length} registrados</span>
        </h2>

        {clients.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            No hay clientes registrados todavía.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {clients.map((c) => (
            <div
              key={c.id}
              className="group relative flex flex-col items-center justify-between gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-orange-100 hover:shadow-md transition-all text-center overflow-hidden"
            >
              {/* Logo or Placeholder */}
              {c.logoUrl ? (
                <div className="relative w-24 h-16">
                  <Image
                    src={c.logoUrl}
                    alt={c.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-24 h-16 rounded-xl bg-orange-50 flex items-center justify-center">
                  <span className="text-3xl font-black text-orange-300">
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex flex-col items-center">
                <span className="font-semibold text-gray-800 text-sm leading-tight text-center">{c.name}</span>
              </div>

              {/* Action buttons (appear on hover) */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex">
                <Link
                  href={`/admin/clientes/${c.id}`}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-bl-2xl transition-colors text-sm text-center"
                >
                  Editar
                </Link>
                <FormWithToast
                  action={deleteClient}
                  successMessage="Cliente eliminado correctamente"
                  resetOnSuccess={false}
                  className="flex-1"
                >
                  <input type="hidden" name="id" value={c.id} />
                  <button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-br-2xl transition-colors text-sm disabled:opacity-50"
                  >
                    Eliminar
                  </button>
                </FormWithToast>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
