import { Metadata } from 'next';
import AdminLayoutWrapper from './components/AdminLayoutWrapper';
import { Toaster } from 'sonner';

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
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  );
}
