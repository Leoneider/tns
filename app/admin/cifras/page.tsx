import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import FormWithToast from '../components/FormWithToast';

export const dynamic = 'force-dynamic';

async function updateCSRStat(formData: FormData) {
  'use server';
  await prisma.cSRStat.update({
    where: { id: formData.get('id') as string },
    data: {
      label: formData.get('label') as string,
      value: formData.get('value') as string,
    }
  });
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
          Modifica los valores de las estadísticas de Responsabilidad Social Corporativa.
          <br/>
          <span className="text-sm border border-orange-200 bg-orange-50 text-orange-700 px-3 py-1 rounded-xl inline-block mt-3">
            El diseño está bloqueado a las 3 métricas principales por requerimiento. No se pueden agregar ni eliminar más cajas.
          </span>
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black pb-1">✏️</span>
          Editar Cifras Actuales
        </h2>
        
        {csrStats.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
             No hay cifras añadidas todavía. Ejecuta el script de semilla para crearlas.
          </div>
        )}

        <div className="flex flex-col gap-6">
          {csrStats.map((s) => (
            <FormWithToast 
              key={s.id} 
              action={updateCSRStat} 
              successMessage="Cifra actualizada correctamente" 
              resetOnSuccess={false}
              className="relative group p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-purple-100 hover:shadow-md transition-all"
            >
              <input type="hidden" name="id" value={s.id} />
              
              <div className="flex flex-col md:flex-row gap-5 items-end justify-between">
                <div className="w-full md:flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                    Label (Texto debajo de la cifra)
                  </label>
                  <input 
                    type="text" 
                    name="label" 
                    defaultValue={s.label}
                    required 
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium uppercase text-sm tracking-wider"
                  />
                </div>
                
                <div className="w-full md:w-48 xl:w-56">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                    Valor exacto (Ej. 20+)
                  </label>
                  <input 
                    type="text" 
                    name="value" 
                    defaultValue={s.value}
                    required 
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-black text-center text-purple-600 text-lg"
                  />
                </div>
                
                <div className="w-full md:w-auto mt-4 md:mt-0">
                  <button 
                    type="submit" 
                    className="w-full md:w-auto bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-medium disabled:opacity-50"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </FormWithToast>
          ))}
        </div>
      </div>
    </div>
  );
}
