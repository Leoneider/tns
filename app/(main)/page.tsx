import { Hero } from '@/components/ui/Hero';
import { ServicesGrid } from '@/components/ui/ServicesGrid';
import { TrackingSection } from '@/components/ui/TrackingSection';
import { AboutSection } from '@/components/ui/AboutSection';
import { ContactForm } from '@/components/ui/ContactForm';
import { FaqSection } from '@/components/ui/FaqSection';
import { Metadata } from 'next';
import { faqJsonLd, websiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Soluciones logísticas de clase mundial con ADN regional. Transporte de carga líquida y seca en Colombia.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const showTrackingSection = process.env.SHOW_TRACKING_SECTION === 'true';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <ServicesGrid />
      {showTrackingSection && <TrackingSection />}
      <AboutSection />
      <ContactForm />
      <FaqSection />
    </>
  );
}
