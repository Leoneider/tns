"use client";

import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import { Toaster } from 'sonner';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Toaster position="top-center" richColors />
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:pl-0 h-full overflow-hidden">
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
            TNS Admin
          </h1>
        </header>
        <main className="flex-1 p-6 md:p-10 overflow-auto w-full max-w-7xl mx-auto flex flex-col items-center">
          <Toaster position="top-center" richColors />
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
