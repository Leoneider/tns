import { ContactSection } from '@/components/ui/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctenos para optimizar su logística. Estamos listos para atenderle.',
  alternates: {
    canonical: '/contacto',
  },
};

export default function Contacto() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  );
}
