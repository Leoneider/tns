import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { uploadFileToSupabase } from '@/lib/supabase-storage';
import FormWithToast from '../../components/FormWithToast';

export default async function EditPolicyPage({ params }: { params: { id: string } }) {
  const policy = await prisma.policy.findUnique({
    where: { id: params.id },
  });

  if (!policy) {
    notFound();
  }

  async function updatePolicy(formData: FormData) {
    'use server';

    const id = formData.get('id') as string;
    const pdfFile = formData.get('pdfFile') as File | null;

    let pdfUrl: string | undefined;
    if (pdfFile && pdfFile.size > 0) {
      pdfUrl = await uploadFileToSupabase(pdfFile, 'politicas', 'application/pdf');
    }

    await prisma.policy.update({
      where: { id },
      data: {
        code: formData.get('code') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        ...(pdfUrl ? { pdfUrl } : {}),
      },
    });

    revalidatePath('/admin/politicas');
    revalidatePath('/politicas');
    redirect('/admin/politicas');
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      {/* Back + Title */}
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/admin/politicas"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Editar Política</h1>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <FormWithToast action={updatePolicy} successMessage="Política actualizada correctamente" className="space-y-6">
          <input type="hidden" name="id" value={policy.id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Código</label>
              <input
                type="text"
                name="code"
                defaultValue={policy.code}
                required
                placeholder="Ej: PO-ME-007"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Título</label>
              <input
                type="text"
                name="title"
                defaultValue={policy.title}
                required
                placeholder="Título de la política"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Descripción</label>
            <textarea
              name="description"
              defaultValue={policy.description}
              required
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">
              Actualizar PDF (Opcional)
            </label>
            <input
              type="file"
              name="pdfFile"
              accept="application/pdf"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            {policy.pdfUrl && (
              <div className="mt-3 border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">PDF actual cargado</p>
                  <a
                    href={policy.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-0.5 block"
                  >
                    Ver PDF actual ↗
                  </a>
                  <p className="text-xs text-emerald-600 mt-1">Sube un archivo nuevo para reemplazar el PDF actual.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end border-t border-gray-100 pt-6">
            <Link
              href="/admin/politicas"
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
