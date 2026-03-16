import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://berdikariconsultant.com"), // Ganti dengan domain asli nanti
  title: {
    default: "CAKEP | Berdikari Consultant — Jasa Perizinan Strategis di Bali",
    template: "%s | Berdikari Consultant"
  },
  description: "Berdikari Consultant membantu navigasi legalitas bisnis di Bali. Ahli dalam PBG/SLF, Izin HOREKA, KITAS, dan Konsultasi Bisnis Strategis.",
  keywords: ["Jasa Perizinan Bali", "Pengurusan PBG Bali", "SLF Bali", "Legalitas Usaha Bali", "Konsultan Bisnis Bali", "KITAS Bali", "Berdikari Consultant"],
  authors: [{ name: "Berdikari Consultant" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CAKEP | Berdikari Consultant — Strategic Compliance for Business Expansion",
    description: "Mitra strategis perizinan dan legalitas bisnis terpercaya di Denpasar, Bali.",
    url: "https://berdikariconsultant.com",
    siteName: "Berdikari Consultant",
    images: [
      {
        url: "/logo.jpg", // Menggunakan logo yang sudah ada di public
        width: 1200,
        height: 630,
        alt: "Berdikari Consultant Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAKEP | Berdikari Consultant",
    description: "Jasa Perizinan Strategis di Bali",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": "Berdikari Consultant",
              "url": "https://berdikariconsultant.com",
              "logo": "https://berdikariconsultant.com/logo.jpg",
              "description": "Jasa Perizinan dan Konsultan Bisnis Strategis di Bali (PBG, SLF, NIB, KITAS).",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Pulau Selayar No.18",
                "addressLocality": "Denpasar",
                "addressRegion": "Bali",
                "postalCode": "80113",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-8.672396",
                "longitude": "115.214521"
              },
              "telephone": "+628976767762",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ],
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-white text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
