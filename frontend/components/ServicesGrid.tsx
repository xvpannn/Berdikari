"use client";

import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  Users2, 
  Handshake, 
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const services = [
  {
    id: "building",
    title: "Perizinan Bangunan",
    desc: "Amankan aset properti Anda dengan legalitas yang diakui negara. Kami menangani seluruh birokrasi teknis agar pembangunan tetap berjalan sesuai rencana.",
    icon: <Building2 size={24} />,
    details: [
      { name: "PBG (Persetujuan Bangunan Gedung)", subDesc: "Pastikan fondasi hukum konstruksi Anda kuat sejak awal. Kami membantu pengurusan izin untuk bangunan baru hingga renovasi besar tanpa hambatan penyegelan." },
      { name: "SLF (Sertifikat Laik Fungsi)", subDesc: "Tingkatkan nilai dan kepercayaan aset properti Anda. Sertifikasi ini adalah bukti nyata bahwa gedung Anda aman digunakan dan memenuhi standar kelayakan operasional." },
      { name: "SIPA (Izin Penggunaan Air)", subDesc: "Lindungi keberlanjutan operasional bisnis Anda. Kami memastikan pemanfaatan air tanah dilakukan secara sah dan sesuai dengan regulasi lingkungan hidup." }
    ]
  },
  {
    id: "legal",
    title: "Legalitas Usaha",
    desc: "Bangun fondasi bisnis yang profesional dan terlindungi secara hukum. Kami mempermudah langkah awal Anda dalam mendirikan entitas bisnis yang kredibel.",
    icon: <Briefcase size={24} />,
    details: [
      { name: "Pendirian PT & CV", subDesc: "Ubah ide bisnis Anda menjadi entitas legal yang diakui mitra dan perbankan. Kami siapkan seluruh akta dan pengesahan dengan standar hukum yang ketat." },
      { name: "Izin Usaha & NIB (OSS)", subDesc: "Dapatkan akses penuh ke ekosistem bisnis digital Indonesia. Kami bantu integrasi data perusahaan Anda ke sistem OSS RBA untuk penerbitan izin yang cepat." },
      { name: "Dokumen Legal Bisnis", subDesc: "Lengkapi perisai hukum perusahaan Anda. Dari SIUP hingga dokumen pendukung lainnya, kami pastikan administrasi bisnis Anda tertata rapi dan patuh regulasi." }
    ]
  },
  {
    id: "foreign",
    title: "Tenaga Kerja Asing",
    desc: "Delegasikan kerumitan izin tinggal ekspatriat kepada kami. Fokuskan tenaga ahli Anda pada pengembangan bisnis, sementara kami menjaga kepatuhan mereka.",
    icon: <Users2 size={24} />,
    details: [
      { name: "KITAS & KITAP", subDesc: "Berikan ketenangan bekerja bagi talenta mancanegara Anda. Kami kelola proses izin tinggal terbatas hingga tetap dengan akurasi data yang tinggi." },
      { name: "RPTKA (Rencana Penggunaan TKA)", subDesc: "Penuhi syarat utama mempekerjakan tenaga ahli asing secara sah. Kami susun rencana penggunaan TKA Anda agar selaras dengan kebutuhan strategis perusahaan." },
      { name: "Notifikasi / Notifikasi Kerja", subDesc: "Hilangkan risiko pelanggaran administratif tenaga kerja. Kami pastikan setiap pemberitahuan kerja terdaftar secara resmi di kementerian terkait." }
    ]
  },
  {
    id: "consultancy",
    title: "Konsultasi Bisnis",
    desc: "Dapatkan panduan strategis untuk menavigasi kompleksitas regulasi di Indonesia. Kami bantu Anda melihat celah risiko dan peluang ekspansi yang lebih aman.",
    icon: <Handshake size={24} />,
    details: [
      { name: "Audit Kepatuhan Perizinan", subDesc: "Cegah penalti dan sanksi denda sejak dini. Kami lakukan pemeriksaan menyeluruh terhadap seluruh izin Anda untuk memastikan semuanya masih berlaku dan valid." },
      { name: "Strategi Perizinan & Risiko", subDesc: "Temukan jalur birokrasi yang paling efisien. Kami berikan analisis mendalam untuk meminimalisir biaya dan waktu dalam setiap proses pengurusan izin." },
      { name: "Business Expansion Guide", subDesc: "Perluas jangkauan operasional Anda dengan percaya diri. Kami dampingi langkah ekspansi Anda ke wilayah baru dengan pemetaan regulasi lokal yang akurat." }
    ]
  }
];

export default function ServicesGrid() {
  const { scrollToId } = useSmoothScroll();
  const [expanded, setExpanded] = useState<string | null>("building");

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-baseline mb-24 gap-12 border-b border-slate-100 pb-12">
          <div className="space-y-4">
             <h2 className="text-5xl lg:text-7xl font-black text-cakep-heading tracking-tighter uppercase leading-none">
                Layanan <br />
                <span className="font-serif italic font-light text-cakep-maroon lowercase">Utama Kami</span>
             </h2>
          </div>
          <div className="max-w-xs text-right hidden lg:block">
            <p className="text-slate-400 text-sm font-serif italic leading-relaxed">
              "Memberikan kepastian hukum dan perizinan untuk setiap langkah strategis bisnis Anda di Indonesia."
            </p>
          </div>
        </div>

        {/* Master List Layout - Elegant & Non-AI feel */}
        <div className="space-y-4">
          {services.map((s) => (
            <div 
              key={s.id}
              className={`group border rounded-3xl transition-all duration-700 overflow-hidden ${
                expanded === s.id 
                  ? 'bg-slate-50 border-cakep-maroon/20' 
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div 
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                className="p-8 lg:p-10 flex items-center justify-between cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    expanded === s.id ? 'bg-cakep-maroon text-white scale-110 shadow-lg shadow-cakep-maroon/20' : 'bg-slate-100 text-cakep-heading'
                  }`}>
                    {s.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl lg:text-3xl font-black text-cakep-heading tracking-tight uppercase">{s.title}</h3>
                    <p className="text-slate-400 font-medium text-sm lg:text-base max-w-xl">{s.desc}</p>
                  </div>
                </div>
                
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  expanded === s.id ? 'bg-cakep-heading border-cakep-heading text-white rotate-180' : 'border-slate-200 text-slate-400 group-hover:border-cakep-maroon group-hover:text-cakep-maroon'
                }`}>
                  {expanded === s.id ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>

              {/* Expansion Detail */}
              <div className={`transition-all duration-700 ease-in-out ${
                expanded === s.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="px-8 pb-10 lg:px-10 lg:pb-14 pt-0">
                   <div className="lg:ml-[104px] grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                      {s.details.map((detail, idx) => (
                        <div key={idx} className="space-y-3 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                           <div className="text-cakep-maroon font-black text-[10px] tracking-widest uppercase">DETAIL 0{idx+1}</div>
                           <h4 className="text-cakep-heading font-black text-base leading-tight">{detail.name}</h4>
                           <p className="text-slate-400 text-xs leading-relaxed">{detail.subDesc}</p>
                        </div>
                      ))}
                   </div>
                   
                   <div className="lg:ml-[104px] mt-10 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-3">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                               <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
                            ))}
                         </div>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Membantu perizinan untuk berbagai mitra bisnis lokal</p>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); scrollToId('booking-card'); }}
                        className="flex items-center gap-4 bg-cakep-maroon text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-cakep-maroon/20 hover:bg-cakep-heading transition-all duration-500"
                      >
                        KONSULTASI PERIZINAN INI <ArrowRight size={14} />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
