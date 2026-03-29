import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TNS - Transportadores de Norte de Santander",
  description: "Soluciones logísticas de clase mundial con ADN regional. Transporte de carga líquida y seca en Colombia.",
  openGraph: {
    title: "TNS - Transportadores de Norte de Santander",
    description: "Soluciones logísticas de clase mundial con ADN regional. Transporte de carga líquida y seca en Colombia.",
    url: "https://www.tns.com.co", // Asegúrate de actualizar esto con tu dominio real
    siteName: "TNS",
    images: [
      {
        url: "/tns-logo.png", // Se usará tu logotipo como imagen de previsualización por defecto
        width: 1200,
        height: 630,
        alt: "TNS - Logística y Transporte",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TNS - Transportadores de Norte de Santander",
    description: "Soluciones logísticas de clase mundial con ADN regional. Transporte de carga líquida y seca en Colombia.",
    images: ["/tns-logo.png"], // Se usa la misma imagen para Twitter
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
