import { ContactSection } from '@/components/ui/ContactSection';

export const metadata = {
  title: 'Contacto | TNS',
  description: 'Contáctenos para optimizar su logística. Estamos listos para atenderle.',
};

export default function Contacto() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  );
}
