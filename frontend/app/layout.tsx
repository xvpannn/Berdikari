import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

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
  metadataBase: new URL("https://berdikariconsultant.com"),
  title: "Berdikari Consultant | Jasa Perizinan & Legalitas Usaha di Bali",
  description: "Konsultan perizinan terpercaya di Bali. Pengurusan PT, CV, NIB, PBG, SLF, KITAS, IMTA – cepat, transparan, konsultasi gratis.",
  keywords: [
    "jasa perizinan usaha Bali", 
    "konsultan legalitas Bali", 
    "pengurusan PT CV Bali", 
    "KITAS Bali konsultan", 
    "konsultan perizinan Denpasar",
    "jasa PBG SLF Bali",
    "pengurusan NIB OSS Bali",
    "izin usaha ekspat Bali",
    "konsultan perizinan bangunan Bali",
    "RPTKA IMTA Bali"
  ],
  authors: [{ name: "Berdikari Consultant" }],
  alternates: {
    canonical: "https://berdikariconsultant.com/",
  },
  openGraph: {
    type: "website",
    url: "https://berdikariconsultant.com/",
    title: "Berdikari Consultant | Jasa Perizinan & Legalitas Usaha di Bali",
    description: "Konsultan perizinan terpercaya di Bali. PT, CV, NIB, KITAS, PBG, SLF.",
    siteName: "Berdikari Consultant",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Berdikari Consultant - Perizinan Bali",
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berdikari Consultant | Jasa Perizinan & Legalitas Usaha di Bali",
    description: "Konsultan perizinan terpercaya di Bali. PT, CV, NIB, KITAS, PBG, SLF.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
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
        <JsonLd />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-white text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
