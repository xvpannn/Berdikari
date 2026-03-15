"use client";

import React from 'react';
import { Shield, ArrowRight, Landmark } from 'lucide-react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function HeroSection() {
  const { scrollToId } = useSmoothScroll();

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center bg-white overflow-hidden pt-16 pb-12 animate-fade-in-up">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cakep-maroon/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100 shadow-sm transition-transform hover:scale-105">
                <Shield size={14} className="text-cakep-maroon" />
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Mitra Strategis</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-cakep-heading leading-[1.1] tracking-tighter">
                Legalitas <br />
                tanpa hambatan.
              </h1>
            </div>
            
            <p className="text-slate-400 max-w-lg text-lg italic font-serif leading-relaxed border-l-4 border-cakep-maroon/20 pl-6 ml-1">
              Premium <span className="text-cakep-heading font-black not-italic">Bangunan, Bisnis, & Tenaga Kerja Asing</span> perizinan strategis. <span className="notranslate" translate="no">CAKEP | <span className="font-bold">Berdikari Consultant</span></span> memastikan ekspansi bisnis Anda berjalan aman.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-2 items-center sm:items-stretch">
              <button onClick={() => scrollToId('booking-card')} className="group flex items-center justify-center gap-4 bg-cakep-maroon px-10 py-5 rounded-xl text-white font-black tracking-[0.15em] text-xs hover:bg-cakep-maroon-dark transition-all duration-700 shadow-lg shadow-cakep-maroon/20 hover:-translate-y-1">
                KONSULTASI GRATIS <ArrowRight className="group-hover:translate-x-2 transition-transform duration-700" size={16} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative z-10 w-full h-[450px] lg:h-[550px] bg-slate-50 border-[10px] border-white shadow-xl rounded-[3rem] overflow-hidden flex flex-col group transition-all duration-1000">
              <div className="flex-1 flex items-center justify-center p-12 relative overflow-hidden bg-white">
                 <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
                    <div className="text-[180px] font-black text-cakep-heading -rotate-12">CKP</div>
                 </div>
                 
                 <div className="relative z-10 w-48 h-48 bg-white shadow-lg border border-slate-100 rounded-[2.5rem] flex items-center justify-center group-hover:rotate-6 transition-all duration-1000">
                    <Landmark size={80} className="text-cakep-maroon group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 
                  <div className="absolute top-12 right-6 bg-white/80 backdrop-blur-xl shadow-xl p-6 rounded-2xl border border-white/50 -rotate-6 group-hover:rotate-0 transition-all duration-1000">
                    <div className="text-cakep-maroon font-black text-2xl mb-1 tracking-tighter">Strategic</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Partnership</div>
                  </div>

                 <div className="absolute bottom-12 left-6 bg-cakep-maroon shadow-lg p-6 rounded-full flex items-center justify-center text-white scale-100 animate-bounce">
                    <Shield size={28} />
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
