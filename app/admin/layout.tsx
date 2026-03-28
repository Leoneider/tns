import { Metadata } from 'next';
import AdminSidebar from './components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Panel Administrativo | TNS',
  description: 'Gestión de contenidos del sitio web Transportadores de Norte de Santander',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-0 h-full overflow-hidden">
        {/* Mobile Header Placeholder (Can add a mobile menu button here later) */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
            TNS Admin
          </h1>
          {/* A menu bar icon would go here to toggle a mobile sidebar */}
        </header>

        {/* Dynamic Content Route */}
        <main className="flex-1 p-6 md:p-10 overflow-auto w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
