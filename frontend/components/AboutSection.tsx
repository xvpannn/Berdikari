"use client";

import React from 'react';
import { ShieldCheck, Target, Eye, HeartHandshake, FileCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        
        {/* Main Header & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
               <span className="w-1.5 h-1.5 bg-cakep-maroon rounded-full" />
               <span className="text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase">Profil Perusahaan</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-cakep-heading tracking-tighter uppercase leading-none">
               Tentang <br />
               <span className="text-cakep-maroon italic font-serif font-light lowercase">Kami</span>
            </h2>
            <div className="w-20 h-1.5 bg-cakep-maroon rounded-full" />
          </div>
          
          <div className="lg:col-span-7 space-y-8">
            <p className="text-xl lg:text-2xl font-serif text-slate-500 italic leading-relaxed">
              "Berdikari Consultant hadir sebagai unit bisnis strategis dari <span className="text-cakep-heading font-black not-italic notranslate" translate="no">PT. Cahaya Kencana Prawira</span> di Denpasar, Bali, untuk menjadi mitra terpercaya dalam menavigasi kompleksitas legalitas usaha."
            </p>
            <p className="text-slate-400 leading-relaxed font-medium">
              Didukung oleh tim profesional berpengalaman, kami berkomitmen memberikan solusi perizinan yang efisien, transparan, dan sepenuhnya sesuai regulasi guna mendukung pertumbuhan bisnis Anda di Indonesia.
            </p>
          </div>
        </div>

        {/* Corporate Legal Card - Trust Builder */}
        <div className="bg-slate-50 rounded-[3rem] p-8 lg:p-16 border border-slate-100 mb-24 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <ShieldCheck size={280} className="text-cakep-maroon" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-cakep-maroon font-black text-[10px] tracking-[0.3em] uppercase">Status Legalitas</h4>
                <h3 className="text-2xl lg:text-3xl font-black text-cakep-heading tracking-tight notranslate" translate="no">PT. Cahaya Kencana Prawira</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">NIB (Nomor Induk Berusaha)</div>
                   <div className="text-cakep-heading font-black text-sm tracking-widest">030 326 0125 234</div>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">KBLI Terdaftar</div>
                   <div className="text-cakep-heading font-black text-sm tracking-widest">70209 — Konsultasi Manajemen</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-500 text-xs italic font-serif">
                <FileCheck size={18} className="text-cakep-maroon" />
                <span>Terdaftar sebagai Pengusaha Kena Pajak (PKP) untuk transparansi transaksi finansial Anda.</span>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-8 border-l lg:border-slate-200 lg:pl-16">
               <p className="text-slate-500 text-sm leading-relaxed italic">
                 Seluruh kegiatan operasional dijalankan berdasarkan izin resmi dan kepatuhan hukum yang berlaku di Indonesia, memastikan keamanan mutlak bagi setiap klien kami.
               </p>
               <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-black text-cakep-heading uppercase tracking-tighter">Bali</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Headquarter</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="text-center">
                    <div className="text-2xl font-black text-cakep-heading uppercase tracking-tighter">Official</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Licensed Entity</div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-6 group">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-cakep-maroon group-hover:bg-cakep-maroon group-hover:text-white transition-all duration-500 shadow-sm">
              <Eye size={28} />
            </div>
            <div className="space-y-3">
              <h5 className="font-black text-cakep-heading text-lg tracking-tight uppercase">Visi</h5>
              <p className="text-slate-400 text-sm leading-relaxed">Menjadi konsultan perizinan terdepan di Bali yang memberikan solusi komprehensif dan terpercaya bagi pelaku usaha.</p>
            </div>
          </div>

          <div className="space-y-6 group">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-cakep-maroon group-hover:bg-cakep-maroon group-hover:text-white transition-all duration-500 shadow-sm">
              <Target size={28} />
            </div>
            <div className="space-y-3">
              <h5 className="font-black text-cakep-heading text-lg tracking-tight uppercase">Misi</h5>
              <p className="text-slate-400 text-sm leading-relaxed">Memberikan layanan konsultasi profesional yang transparan, tepat waktu, dan memiliki standar kualitas tinggi.</p>
            </div>
          </div>

          <div className="space-y-6 group">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-cakep-maroon group-hover:bg-cakep-maroon group-hover:text-white transition-all duration-500 shadow-sm">
              <HeartHandshake size={28} />
            </div>
            <div className="space-y-3">
              <h5 className="font-black text-cakep-heading text-lg tracking-tight uppercase">Komitmen</h5>
              <p className="text-slate-400 text-sm leading-relaxed">Membangun hubungan jangka panjang dengan integritas, keahlian mendalam, dan dedikasi penuh di setiap layanan.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
