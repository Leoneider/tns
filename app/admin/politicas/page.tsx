import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import FormWithToast from '../components/FormWithToast';
import DeleteConfirmModal from './DeleteConfirmModal';
import { uploadFileToSupabase } from '@/lib/supabase-storage';

// ─── Server Actions ───────────────────────────────────────────────────────────

async function createPolicy(formData: FormData) {
  'use server';

  const pdfFile = formData.get('pdfFile') as File | null;
  if (!pdfFile || pdfFile.size === 0) {
    return { error: 'Debes adjuntar un archivo PDF.' };
  }

  const pdfUrl = await uploadFileToSupabase(pdfFile, 'politicas', 'application/pdf');

  const lastPolicy = await prisma.policy.findFirst({ orderBy: { order: 'desc' } });
  const nextOrder = (lastPolicy?.order ?? 0) + 1;

  await prisma.policy.create({
    data: {
      code: formData.get('code') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      pdfUrl,
      order: nextOrder,
    },
  });

  revalidatePath('/admin/politicas');
  revalidatePath('/politicas');
}

async function deletePolicy(formData: FormData) {
  'use server';
  await prisma.policy.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/admin/politicas');
  revalidatePath('/politicas');
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PoliticasAdminPage() {
  const policies = await prisma.policy.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Políticas</h1>
        <p className="text-gray-500 text-lg">
          Agrega, edita o elimina las políticas que aparecen en el sitio público.
        </p>
      </div>

      {/* Form: Nueva política */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black pb-1">+</span>
          Agregar Política
        </h2>
        <FormWithToast action={createPolicy} successMessage="Política agregada exitosamente" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="code"
              placeholder="Código (ej: PO-ME-007)"
              required
              className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono text-sm"
            />
            <input
              type="text"
              name="title"
              placeholder="Título de la política"
              required
              className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <textarea
            name="description"
            placeholder="Descripción breve de la política..."
            required
            rows={3}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-y"
          />
          <div>
            <input
              type="file"
              name="pdfFile"
              accept="application/pdf"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            <p className="text-xs text-gray-400 mt-1 pl-2">Solo archivos PDF</p>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md"
            >
              Agregar Política
            </button>
          </div>
        </FormWithToast>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Políticas Activas
          <span className="ml-2 text-sm font-normal text-gray-400">({policies.length})</span>
        </h2>

        {policies.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            No hay políticas registradas aún.
          </div>
        )}

        <div className="space-y-4">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="flex items-center justify-between gap-4 border border-gray-200 rounded-2xl px-6 py-4 bg-white hover:bg-gray-50/50 transition-colors"
            >
              {/* Info */}
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg font-mono whitespace-nowrap flex-shrink-0">
                  {policy.code}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{policy.title}</p>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{policy.description}</p>
                </div>
              </div>

              {/* Actions — icon only + CSS tooltip */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* Ver PDF */}
                <div className="relative group/pdf">
                  <a
                    href={policy.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    aria-label="Ver PDF"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium bg-gray-900 text-white rounded-lg opacity-0 group-hover/pdf:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Ver PDF
                  </span>
                </div>

                {/* Editar */}
                <div className="relative group/edit">
                  <Link
                    href={`/admin/politicas/${policy.id}`}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    aria-label="Editar política"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>
                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium bg-gray-900 text-white rounded-lg opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Editar
                  </span>
                </div>

                {/* Eliminar */}
                <DeleteConfirmModal policy={policy} deleteAction={deletePolicy} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
