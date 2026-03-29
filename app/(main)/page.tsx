import { Hero } from '@/components/ui/Hero';
import { ServicesGrid } from '@/components/ui/ServicesGrid';
import { TrackingSection } from '@/components/ui/TrackingSection';
import { AboutSection } from '@/components/ui/AboutSection';
import { ContactForm } from '@/components/ui/ContactForm';

export const metadata = {
  title: 'TNS - Transportadores de Norte de Santander',
  description: 'Soluciones logísticas de clase mundial con ADN regional. Transporte de carga líquida y seca en Colombia.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <TrackingSection />
      <AboutSection />
      <ContactForm />
    </>
  );
}
