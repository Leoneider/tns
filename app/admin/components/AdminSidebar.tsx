"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  FileText, 
  LayoutDashboard, 
  Newspaper, 
  Users,
  Truck,
  Image as ImageIcon
} from 'lucide-react';

const navItems = [
  { href: '/admin/servicios', label: 'Servicios', icon: Truck },
  { href: '/admin/textos', label: 'Textos Generales', icon: FileText },
  { href: '/admin/noticias', label: 'Gestión de Noticias', icon: Newspaper },
  { href: '/admin/proyectos-sociales', label: 'Proyectos Sociales', icon: ImageIcon },
  { href: '/admin/cifras', label: 'Cifras CSR', icon: BarChart3 },
  { href: '/admin/clientes', label: 'Clientes Destacados', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-gray-200/50 shadow-sm flex flex-col hidden md:flex sticky top-0 h-screen">
      <div className="p-6 border-b border-gray-100/50">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
          TNS Admin
        </h2>
        <p className="text-xs text-gray-500 mt-1">Panel de Control</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-red-50 text-red-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-gray-400'}`} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100/50">
        <Link 
          href="/" 
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Volver al sitio
        </Link>
      </div>
    </aside>
  );
}
