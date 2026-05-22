import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.transportadorestns.com"),
  title: "TNS - Transportadores de Norte de Santander",
  description: "Prestamos el servicio especializado de transporte de carga seca y líquida en Colombia. Soluciones logísticas de clase mundial con ADN regional.",
  keywords: ["transporte de carga", "carga seca", "carga líquida", "logística", "transporte Colombia", "TNS", "Transportadores de Norte de Santander", "Norte de Santander", "Cúcuta"],
  authors: [{ name: "TNS" }],
  openGraph: {
    title: "TNS - Transportadores de Norte de Santander",
    description: "Prestamos el servicio especializado de transporte de carga seca y líquida en Colombia, aplicando protocolos de seguridad, control operativo y trazabilidad.",
    url: "https://www.transportadorestns.com",
    siteName: "TNS Transportadores",
    images: [
      {
        url: "/tns-logo.png",
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
    description: "Prestamos el servicio especializado de transporte de carga seca y líquida en Colombia.",
    images: ["/tns-logo.png"],
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
