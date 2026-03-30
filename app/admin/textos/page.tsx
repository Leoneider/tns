import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import FormWithToast from '../components/FormWithToast';

const SECTIONS = [
  {
    key: 'nosotros_historia_1',
    label: 'Historia (Párrafo 1)',
    defaultValue: 'Somos una empresa regionalista, fundada en el año 2014 por un grupo de empresarios visionarios del sector transporte en el departamento. Nuestro propósito inicial fue consolidar una red logística que no solo movilizara carga, sino que impulsara el desarrollo económico de Norte de Santander.'
  },
  {
    key: 'nosotros_historia_2',
    label: 'Historia (Párrafo 2)',
    defaultValue: 'A lo largo de una década, TNS ha evolucionado integrando tecnología de vanguardia y procesos de seguridad rigurosos, convirtiéndonos en el referente de confiabilidad para la industria nacional e internacional que transita por nuestras rutas.'
  },
  {
    key: 'nosotros_mision',
    label: 'Misión',
    defaultValue: 'Transportadores de Norte de Santander S.A.S. brinda servicios de transporte terrestre de carga integral, superando las expectativas de nuestros aliados estratégicos mediante la excelencia operativa, la seguridad en la cadena de suministro y un equipo humano altamente calificado.'
  },
  {
    key: 'nosotros_vision',
    label: 'Visión',
    defaultValue: 'Para el año 2030, TNS se proyecta como la empresa líder en soluciones logísticas del nororiente colombiano, reconocida por su innovación digital, sostenibilidad ambiental y por ser el motor principal de la competitividad regional en el comercio exterior.'
  }
];

async function updateAllTexts(formData: FormData) {
  'use server';

  for (const section of SECTIONS) {
    const value = formData.get(section.key) as string;
    if (value) {
      await prisma.pageContent.upsert({
        where: { key: section.key },
        update: { value },
        create: { key: section.key, value },
      });
    }
  }

  revalidatePath('/admin/textos');
  revalidatePath('/nosotros');
}

export default async function TextosPage() {
  const contents = await prisma.pageContent.findMany({
    where: { key: { in: SECTIONS.map(s => s.key) } }
  });

  const contentMap = contents.reduce((acc, current) => {
    acc[current.key] = current.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Textos - Sección Nosotros</h1>
        <p className="text-gray-500 text-lg">
          Modifica los textos principales de la sección &quot;Nosotros&quot; (Historia, Misión, Visión).
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <FormWithToast action={updateAllTexts} successMessage="Textos actualizados exitosamente" resetOnSuccess={false} className="space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.key} className="space-y-2">
              <label className="block text-xl font-bold text-gray-800">
                {section.label}
              </label>
              <textarea
                name={section.key}
                defaultValue={contentMap[section.key] !== undefined ? contentMap[section.key] : section.defaultValue}
                required
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-y text-gray-700 leading-relaxed"
              ></textarea>
            </div>
          ))}

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="rounded-xl bg-gray-900 hover:bg-black text-white font-medium px-8 py-3 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              Guardar Todos los Cambios
            </button>
          </div>
        </FormWithToast>
      </div>
    </div>
  );
}
