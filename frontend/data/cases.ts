export interface Case {
  id: string;
  title: string;
  category: string;
  img: string;
  desc: string;
}

export const cases: Case[] = [
  { 
    title: "PBG Kompleks Villa Uluwatu", 
    category: "Bangunan",
    id: "01", 
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    desc: "Penyelesaian Izin PBG dan SLF untuk proyek 12 unit villa mewah dalam waktu 4 bulan."
  },
  { 
    title: "KITAS Eksklusif CEO Multinasional", 
    category: "Tenaga Kerja Asing",
    id: "02", 
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop",
    desc: "Pengurusan RPTKA dan KITAS Investor untuk manajemen level atas dari Singapura."
  },
  { 
    title: "Pendirian Holding Company Bali", 
    category: "Legalitas Usaha",
    id: "03", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
    desc: "Strukturisasi legalitas untuk grup bisnis kuliner dan properti dengan NIB terpadu."
  },
  { 
    title: "Audit Kepatuhan Pajak & Izin", 
    category: "Konsultasi Bisnis",
    id: "04", 
    img: "https://images.unsplash.com/photo-1454165833762-02ac1f40b9c7?q=80&w=2070&auto=format&fit=crop",
    desc: "Membantu klien meminimalisir risiko penalti regulasi melalui audit kepatuhan menyeluruh."
  }
];
