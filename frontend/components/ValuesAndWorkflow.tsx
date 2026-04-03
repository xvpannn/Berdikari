"use client";

import React from 'react';
import { 
  Users, 
  Timer, 
  Tag, 
  MessageSquare, 
  Search, 
  FileText, 
  Cog, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function ValuesAndWorkflow() {
  const values = [
    {
      icon: <Users size={24} />,
      title: "Tim Profesional",
      description: "Didukung oleh tim ahli berpengalaman di bidang perizinan dan legalitas usaha yang siap memberikan solusi terbaik untuk kebutuhan bisnis Anda."
    },
    {
      icon: <Timer size={24} />,
      title: "Proses Cepat",
      description: "Kami memahami pentingnya waktu dalam bisnis. Proses pengurusan dokumen dilakukan secara efisien dengan timeline yang jelas dan transparan."
    },
    {
      icon: <Tag size={24} />,
      title: "Harga Kompetitif",
      description: "Layanan berkualitas tinggi dengan harga yang bersaing dan transparan. Tidak ada biaya tersembunyi dalam setiap layanan yang kami berikan."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Konsultasi Gratis",
      description: "Dapatkan konsultasi awal gratis untuk memahami kebutuhan perizinan dan legalitas usaha Anda sebelum memulai proses pengurusan."
    }
  ];

  const workflow = [
    {
      icon: <Search size={32} />,
      title: "Konsultasi",
      description: "Analisa kebutuhan legalitas"
    },
    {
      icon: <FileText size={32} />,
      title: "Pengajuan Dokumen",
      description: "Pemeriksaan & verifikasi berkas"
    },
    {
      icon: <Cog size={32} />,
      title: "Proses Perizinan",
      description: "Koordinasi dengan instansi"
    },
    {
      icon: <CheckCircle2 size={32} />,
      title: "Serah Terima",
      description: "Dokumen legalitas selesai"
    }
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* Keunggulan Kami Section */}
      <section className="py-24 border-b border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="mb-16">
             <div className="inline-flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 mb-6">
                <span className="w-1.5 h-1.5 bg-cakep-maroon rounded-full" />
                <span className="text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase">Our Advantages</span>
             </div>
             <h2 className="text-4xl lg:text-5xl font-black text-cakep-heading tracking-tighter uppercase leading-none">
                Keunggulan <br />
                <span className="text-cakep-maroon italic font-serif font-light lowercase">Kami</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {values.map((item, index) => (
              <div key={index} className="flex gap-6 group hover:translate-x-2 transition-transform duration-500">
                <div className="shrink-0 w-16 h-16 bg-slate-50 text-cakep-maroon flex items-center justify-center rounded-2xl border border-slate-100 group-hover:bg-cakep-maroon group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-cakep-maroon/20">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-black text-cakep-heading tracking-tight uppercase">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alur Kerja Layanan Section */}
      <section className="py-24 relative overflow-hidden bg-slate-50/50">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl text-center">
          <div className="mb-20 space-y-4">
             <h3 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase text-cakep-heading">
                Alur Kerja <span className="text-cakep-maroon">Layanan</span>
             </h3>
             <div className="w-20 h-1 bg-cakep-maroon/20 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
             {/* Desktop Connector Lines */}
             <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />

            {workflow.map((item, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="mb-8 relative">
                   {/* Hexagon Shape Container */}
                   <div 
                      style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                      className="w-32 h-32 bg-white border border-slate-200 flex items-center justify-center group-hover:bg-cakep-maroon group-hover:border-cakep-maroon transition-all duration-700 shadow-xl relative z-10"
                   >
                     <div className="text-cakep-maroon group-hover:text-white group-hover:scale-110 transition-all duration-500">
                        {item.icon}
                     </div>
                   </div>
                   
                   {/* Step Number */}
                   <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-cakep-heading text-white font-black text-xs flex items-center justify-center z-20 shadow-lg">
                      {index + 1}
                   </div>
                </div>

                <div className="space-y-2">
                   <h4 className="font-black text-cakep-heading tracking-widest uppercase text-sm group-hover:text-cakep-maroon transition-colors">
                      {item.title}
                   </h4>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">
                      {item.description}
                   </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 pt-12 border-t border-slate-100">
             <div className="inline-flex items-center gap-4 text-slate-400 font-serif italic text-sm">
                <span>Efisiensi Operasional Membuahkan Hasil Maksimal.</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
