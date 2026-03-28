import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const CATEGORIES = [
  { value: 'LIQUID', label: 'Carga Líquida' },
  { value: 'DRY', label: 'Carga Seca' },
  { value: 'RESOURCE', label: 'Recurso Humano y Tecnológico' },
];

const ICONS = ['Droplets', 'Package', 'Truck', 'Users', 'UserCheck', 'ClipboardList', 'Satellite', 'ShieldCheck', 'MapPin'];

async function createService(formData: FormData) {
  'use server';
  await prisma.service.create({
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      details: (formData.get('details') as string) || '',
      category: formData.get('category') as string,
      icon: formData.get('icon') as string,
      order: parseInt(formData.get('order') as string) || 0,
    },
  });
  revalidatePath('/admin/servicios');
  revalidatePath('/servicios');
  revalidatePath('/');
}

async function deleteService(formData: FormData) {
  'use server';
  await prisma.service.delete({ where: { id: formData.get('id') as string } });
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
          Administra los servicios que aparecen en la sección de portafolio del sitio web.
        </p>
      </div>

      {/* Create Form */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black pb-1">+</span>
          Agregar Servicio
        </h2>
        <form action={createService} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Título del servicio"
              required
              className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                name="category"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
              >
                <option value="">Categoría...</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <select
                name="icon"
                className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
              >
                {ICONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>
          <textarea
            name="description"
            placeholder="Descripción del servicio..."
            required
            rows={4}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-y"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                name="details"
                placeholder="Productos separados por coma (solo para Carga Líquida/Seca)"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
              />
            </div>
            <input
              type="number"
              name="order"
              placeholder="Orden (ej. 1)"
              min="0"
              className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md"
          >
            Agregar Servicio
          </button>
        </form>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Servicios Actuales{' '}
          <span className="text-sm font-normal text-gray-400 ml-2">{services.length} registrados</span>
        </h2>

        {services.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            No hay servicios registrados.
          </div>
        )}

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex items-start justify-between gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-black text-sm">
                  {service.order}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-gray-900">{service.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${categoryColors[service.category] || 'bg-gray-50 text-gray-600'}`}>
                      {CATEGORIES.find(c => c.value === service.category)?.label ?? service.category}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">{service.icon}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                  {service.details && (
                    <p className="text-xs text-gray-400 mt-1 italic">{service.details}</p>
                  )}
                </div>
              </div>
              <form action={deleteService} className="flex-shrink-0">
                <input type="hidden" name="id" value={service.id} />
                <button
                  type="submit"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 rounded-xl hover:bg-red-50"
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
