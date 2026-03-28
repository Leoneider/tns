import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function updateContent(formData: FormData) {
  'use server';
  await prisma.pageContent.update({
    where: { id: formData.get('id') as string },
    data: { value: formData.get('value') as string }
  });
  revalidatePath('/admin/textos');
  revalidatePath('/'); // assuming texts might be used globally
}

async function createContent(formData: FormData) {
  'use server';
  await prisma.pageContent.create({
    data: { 
      key: formData.get('key') as string, 
      value: formData.get('value') as string 
    }
  });
  revalidatePath('/admin/textos');
  revalidatePath('/');
}

export default async function TextosPage() {
  const contents = await prisma.pageContent.findMany();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Textos Generales</h1>
        <p className="text-gray-500 text-lg">
          Agrega o actualiza textos clave de la página (ej. Misión, Visión, Descripción).
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black">+</span>
          Añadir Nuevo Texto
        </h2>
        <form action={createContent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="key" 
              placeholder="Identificador (ej. mision)" 
              required 
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>
          <textarea 
            name="value" 
            placeholder="Contenido del texto..." 
            required 
            rows={4}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-y"
          ></textarea>
          <button 
            type="submit" 
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 transition-colors shadow-sm hover:shadow-md"
          >
            Añadir Texto
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
         <h2 className="text-xl font-bold text-gray-800 mb-6">Textos Existentes</h2>
         <div className="space-y-6">
            {contents.length === 0 && (
              <p className="text-gray-500 p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
                No hay textos almacenados en la base de datos.
              </p>
            )}
            {contents.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-bold text-gray-800 mb-3 bg-white px-3 py-1 rounded-md border border-gray-200 inline-block shadow-sm">
                  {item.key}
                </h3>
                <form action={updateContent} className="space-y-3">
                  <input type="hidden" name="id" value={item.id} />
                  <textarea 
                    name="value" 
                    defaultValue={item.value} 
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 transition-all shadow-sm"
                    >
                      Actualizar texto
                    </button>
                  </div>
                </form>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
