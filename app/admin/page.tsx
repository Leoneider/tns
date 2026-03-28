import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FileText, Newspaper, BarChart3, Users, ArrowRight, Truck } from 'lucide-react';

export default async function AdminDashboard() {
  // Stats
  const textsCount = await prisma.pageContent.count();
  const newsCount = await prisma.news.count();
  const csrCount = await prisma.cSRStat.count();
  const clientsCount = await prisma.client.count();
  const servicesCount = await prisma.service.count();

  const cards = [
    { title: 'Servicios', count: servicesCount, icon: Truck, href: '/admin/servicios', color: 'bg-red-50 text-red-600', border: 'border-red-100' },
    { title: 'Textos Generales', count: textsCount, icon: FileText, href: '/admin/textos', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
    { title: 'Noticias publicadas', count: newsCount, icon: Newspaper, href: '/admin/noticias', color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
    { title: 'Cifras actuales', count: csrCount, icon: BarChart3, href: '/admin/cifras', color: 'bg-purple-50 text-purple-600', border: 'border-purple-100' },
    { title: 'Clientes destacados', count: clientsCount, icon: Users, href: '/admin/clientes', color: 'bg-orange-50 text-orange-600', border: 'border-orange-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resumen General</h1>
        <p className="text-gray-500 text-lg">
          Selecciona una sección en el menú lateral o en las tarjetas abajo para administrar su contenido.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link 
              key={card.title} 
              href={card.href}
              className={`bg-white rounded-3xl p-6 shadow-sm border hover:border-transparent ${card.border} hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-48 relative overflow-hidden`}
            >
              <div className="flex justify-between items-start z-10">
                <div className={`p-4 rounded-2xl ${card.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="p-2 bg-gray-50 rounded-full group-hover:bg-gray-100 transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700" />
                </div>
              </div>
              <div className="z-10 mt-4">
                <p className="text-4xl font-black text-gray-800 tracking-tight">{card.count}</p>
                <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">{card.title}</p>
              </div>
              
              {/* Decorative background element */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-10 ${card.color.split(' ')[0]} mix-blend-multiply group-hover:scale-150 transition-transform duration-500`} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
