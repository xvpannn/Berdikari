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
  title: "CAKEP | Berdikari Consultant — Jasa Perizinan Strategis di Bali",
  description: "Berdikari Consultant (PT. Cahaya Kencana Prawira) membantu navigasi legalitas bisnis di Bali. Ahli dalam PBG/SLF, Izin HOREKA, KITAS, dan Konsultasi Bisnis Strategis.",
  keywords: ["Jasa Perizinan Bali", "Pengurusan PBG Bali", "SLF Bali", "Legalitas Usaha Bali", "Konsultan Bisnis Bali", "KITAS Bali", "Berdikari Consultant"],
  authors: [{ name: "Berdikari Consultant" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "CAKEP | Berdikari Consultant — Strategic Compliance for Business Expansion",
    description: "Mitra strategis perizinan dan legalitas bisnis terpercaya di Denpasar, Bali.",
    url: "https://berdikariconsultant.com",
    siteName: "Berdikari Consultant",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} bg-white text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
