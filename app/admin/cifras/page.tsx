import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function createCSRStat(formData: FormData) {
  'use server';
  await prisma.cSRStat.create({
    data: {
      label: formData.get('label') as string,
      value: formData.get('value') as string,
    }
  });
  revalidatePath('/admin/cifras');
  revalidatePath('/responsabilidad-social');
}

async function deleteCSRStat(formData: FormData) {
  'use server';
  await prisma.cSRStat.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/admin/cifras');
  revalidatePath('/responsabilidad-social');
}

export default async function CifrasPage() {
  const csrStats = await prisma.cSRStat.findMany();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cifras CSR</h1>
        <p className="text-gray-500 text-lg">
          Gestiona las estadísticas de Responsabilidad Social Corporativa.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black pb-1">+</span>
          Añadir Nueva Cifra
        </h2>
        <form action={createCSRStat} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input 
            type="text" 
            name="label" 
            placeholder="Etiqueta (ej. Familias impactadas)" 
            required 
            className="w-full sm:flex-1 rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
          />
          <input 
            type="text" 
            name="value" 
            placeholder="Valor (ej. +60)" 
            required 
            className="w-full sm:w-48 rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-bold text-center text-purple-600"
          />
          <button 
            type="submit" 
            className="w-full sm:w-auto rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
          >
            Añadir Cifra
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Cifras Actuales</h2>
        
        {csrStats.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
             No hay cifras añadidas todavía.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {csrStats.map((s) => (
            <div key={s.id} className="relative group p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-purple-100 hover:shadow-md transition-all text-center flex flex-col justify-center items-center h-48">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-indigo-600 mb-2">
                {s.value}
              </span>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-widest mt-2 px-4 leading-tight">
                {s.label}
              </span>
              
              {/* Delete Button (appears on hover) */}
              <form action={deleteCSRStat} className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <input type="hidden" name="id" value={s.id} />
                <button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-b-2xl transition-colors shadow-sm text-sm"
                >
                  Eliminar
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
