import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Suspense } from "react";
import { localBusinessJsonLd, organizationJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import GoogleAnalyticsRouteTracker from "@/components/GoogleAnalyticsRouteTracker";

const inter = Inter({ subsets: ["latin"] });

import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | TNS",
  },
  description: "Prestamos el servicio especializado de transporte de carga seca y líquida en Colombia. Soluciones logísticas de clase mundial con ADN regional.",
  keywords: ["transporte de carga", "carga seca", "carga líquida", "logística", "transporte Colombia", "TNS", "Transportadores de Norte de Santander", "Norte de Santander", "Cúcuta"],
  authors: [{ name: "TNS" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: "Prestamos el servicio especializado de transporte de carga seca y líquida en Colombia, aplicando protocolos de seguridad, control operativo y trazabilidad.",
    url: SITE_URL,
    siteName: "TNS Transportadores",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TNS - Transportadores de Norte de Santander",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <Suspense fallback={null}>
          <GoogleAnalyticsRouteTracker />
        </Suspense>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
