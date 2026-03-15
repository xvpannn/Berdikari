"use client";

import React from 'react';
import { MessageCircle, CheckCircle2, Star, Landmark } from 'lucide-react';

export default function PanicBanner() {
  return (
    <section className="bg-white overflow-hidden">

      {/* Testimonial Section - Refined Editorial Layout */}
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-6 relative">
            <div className="space-y-8">
               <div className="flex gap-1.5">
                 {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-cakep-maroon text-cakep-maroon" />)}
               </div>
               
               <h3 className="text-3xl lg:text-5xl font-black text-cakep-heading tracking-tighter leading-[1.1] uppercase">
                  Kepastian di tengah <br />
                  <span className="text-cakep-maroon italic font-serif font-light lowercase">Ketidakpastian regulasi.</span>
               </h3>

               <div className="relative pl-10 border-l-2 border-slate-100">
                  <p className="text-xl lg:text-2xl font-serif text-slate-500 italic leading-relaxed">
                    "<span className="notranslate" translate="no">Cakep</span> membantu kami menyelesaikan hambatan jalur merah bea cukai dengan sangat cepat. Strategis dan sangat profesional!"
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-100 rounded-full border border-slate-200" />
                     <div>
                        <p className="text-cakep-heading font-black text-sm uppercase tracking-wider">Budi Artawan</p>
                        <p className="text-cakep-maroon text-[9px] font-bold uppercase tracking-[0.2em]">Importer & Distributor Utama</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl">
               <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop" alt="Consultation" className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-cakep-heading/40 to-transparent" />
               <div className="absolute bottom-10 left-10">
                  <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                     <div className="text-cakep-maroon font-black text-2xl tracking-tighter">Verified</div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance Success</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* WA Support Banner - CLEAN LIGHT VERSION */}
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl pb-24">
        <div className="relative rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 p-10 lg:p-20 group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <Landmark size={300} className="text-cakep-maroon" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                   <MessageCircle size={14} className="text-cakep-maroon animate-pulse" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Support</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-cakep-heading tracking-tighter uppercase leading-none">
                   Ada Pertanyaan? <br />
                   <span className="text-cakep-maroon">Hubungi Kami Langsung.</span>
                </h2>
                <p className="text-slate-500 text-lg lg:text-xl font-serif italic max-w-md">
                   Bagi Anda yang di Denpasar dan ingin konsultasi offline, silakan chat WhatsApp kami sekarang juga.
                </p>
             </div>
             
             <div className="flex flex-col items-center lg:items-end gap-6">
                <a href="https://wa.me/628976767762" target="_blank" className="w-full lg:w-auto text-center bg-cakep-heading text-white px-12 py-6 rounded-2xl font-black tracking-widest text-sm hover:bg-cakep-maroon transition-all duration-500 shadow-xl shadow-cakep-heading/20">
                   WHATSAPP BERDIKARI CONSULTANT
                </a>
                <div className="flex items-center gap-3 text-slate-400 font-bold text-[9px] uppercase tracking-[0.3em]">
                   <CheckCircle2 size={16} className="text-cakep-maroon" /> Response dalam waktu kerja (WITA)
                </div>
             </div>
          </div>
        </div>
      </div>

    </section>
  );
}
