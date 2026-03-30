import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { uploadImageToSupabase } from '@/lib/supabase-storage';

const CATEGORIES = [
  { value: 'LIQUID', label: 'Carga Líquida' },
  { value: 'DRY', label: 'Carga Seca' },
  { value: 'RESOURCE', label: 'Recurso Humano y Tecnológico' },
];

const ICONS = ['Droplets', 'Package', 'Truck', 'Users', 'UserCheck', 'ClipboardList', 'Satellite', 'ShieldCheck', 'MapPin'];

async function updateService(formData: FormData) {
  'use server';

  const id = formData.get('id') as string;
  const imageFile = formData.get('imageFile') as File | null;
  let imageUrl: string | undefined = undefined;

  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadImageToSupabase(imageFile, 'servicios');
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const dataToUpdate: any = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    details: (formData.get('details') as string) || '',
    icon: formData.get('icon') as string,
    order: parseInt(formData.get('order') as string) || 0,
  };

  if (imageUrl) {
    (dataToUpdate as any).imageUrl = imageUrl;
  }

  await prisma.service.update({
    where: { id },
    data: dataToUpdate,
  });
  revalidatePath('/admin/servicios');
  revalidatePath('/servicios');
  revalidatePath('/');
}

const categoryColors: Record<string, string> = {
  LIQUID: 'bg-blue-50 text-blue-700 border-blue-100',
  DRY: 'bg-amber-50 text-amber-700 border-amber-100',
  RESOURCE: 'bg-purple-50 text-purple-700 border-purple-100',
};

export default async function ServiciosAdminPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Servicios</h1>
        <p className="text-gray-500 text-lg">
          Edita la información de tus servicios actuales. (La creación y eliminación de bloques ha sido deshabilitada para mantener la estructura de la página).
        </p>
      </div>

      {/* Services Edit Forms */}
      <div className="space-y-6">
        {services.map((service) => (
          <form
            key={service.id}
            action={updateService}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 relative overflow-hidden focus-within:ring-2 focus-within:ring-red-500/20"
          >
            {/* Indicador visual de categoría */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${categoryColors[service.category]?.split(' ')[0] || 'bg-gray-200'}`} />

            <div className="flex items-center justify-between mb-6 pl-2">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${categoryColors[service.category] || 'bg-gray-50'}`}>
                  {CATEGORIES.find(c => c.value === service.category)?.label || service.category}
                </span>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                  ID: <code className="bg-gray-50 px-2 py-0.5 rounded text-xs">{service.id}</code>
                </span>
              </div>
            </div>

            <input type="hidden" name="id" value={service.id} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Título del Servicio</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={service.title}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-bold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Ícono</label>
                  <select
                    name="icon"
                    defaultValue={service.icon}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-gray-700"
                  >
                    {ICONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Orden de aparición</label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={service.order.toString()}
                    min="0"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">Descripción detallada</label>
              <textarea
                name="description"
                defaultValue={service.description}
                required
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-y text-gray-600 leading-relaxed"
              ></textarea>
            </div>

            {service.category !== 'RESOURCE' && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">
                  Productos / Elementos Sub-servicio (Separados por coma)
                </label>
                <input
                  type="text"
                  name="details"
                  defaultValue={service.details}
                  placeholder="Ejemplo: Hidrocarburo, Combustible, Petróleo..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm text-gray-600"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 pl-1">
                Imagen Destacada (Opcional)
              </label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              <p className="text-xs text-gray-500 pl-2">Tamaño recomendado: 800x600 px o superior (Horizontal). Se usa en Carga Líquida y Carga Seca.</p>
              {(service as any).imageUrl && (
                <div className="mt-4 border border-gray-100 rounded-xl p-4 bg-gray-50/50 flex gap-4 items-center">
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                    <img 
                      src={(service as any).imageUrl} 
                      alt="Vista previa" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Imagen actual publicada</p>
                    <p className="text-xs text-green-600 mt-1">Si seleccionas un archivo nuevo arriba, esta imagen se reemplazará.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-gray-100 pt-6">
              <button
                type="submit"
                className="rounded-xl bg-gray-900 hover:bg-black text-white font-medium px-8 py-2.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        ))}
      </div>
      
      {services.length === 0 && (
        <div className="p-12 text-center text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
          No hay servicios en la base de datos.
        </div>
      )}
    </div>
  );
}
