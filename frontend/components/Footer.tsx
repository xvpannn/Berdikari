"use client";

import React from 'react';
import { MapPin, Phone, Mail, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white py-24 border-t-4 border-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-slate-100">

          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-32 h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="/logo.jpg" 
                  alt="Berdikari Consultant Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "w-8 h-8 bg-cakep-maroon rounded-lg flex items-center justify-center text-white font-black text-sm";
                      fallback.innerText = "C";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="text-xl font-black text-cakep-heading tracking-tighter group-hover:text-cakep-maroon transition-colors duration-500 notranslate" translate="no">
                CAKEP
              </div>
            </div>

            <p className="text-slate-500 max-w-xs text-base leading-relaxed italic font-serif border-l-4 border-cakep-maroon pl-6">
              "Strategic Compliance for Business Expansion."
            </p>


          </div>

          <div className="space-y-8">
            <h3 className="text-lg font-black text-cakep-heading uppercase tracking-tight border-b-2 border-cakep-maroon/20 w-fit pb-2">Services</h3>
            <ul className="space-y-4 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
              <li><a href="/#services" className="hover:text-cakep-maroon transition underline-offset-4 decoration-cakep-maroon/30">Building (PBG/SLF)</a></li>
              <li><a href="/#services" className="hover:text-cakep-maroon transition underline-offset-4 decoration-cakep-maroon/30">Legal Property</a></li>
              <li><a href="/#services" className="hover:text-cakep-maroon transition underline-offset-4 decoration-cakep-maroon/30">Business Legal</a></li>
              <li><a href="/#services" className="hover:text-cakep-maroon transition underline-offset-4 decoration-cakep-maroon/30">Foreign Permits</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-lg font-black text-cakep-heading uppercase tracking-tight border-b-2 border-cakep-maroon/20 w-fit pb-2">Quick Links</h3>
            <ul className="space-y-4 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
              <li><a href="/#booking-card" className="hover:text-cakep-maroon transition">Booking</a></li>
              <li><a href="/cases" className="hover:text-cakep-maroon transition">Track Case</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-lg font-black text-cakep-heading uppercase tracking-tight border-b-2 border-cakep-maroon/20 w-fit pb-2">Contact</h3>
            <ul className="space-y-6 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
              <li className="flex gap-4 items-start"><MapPin size={16} className="text-cakep-maroon shrink-0" /> Jl. Selayar No.18, Denpasar Barat, Denpasar</li>
              <li className="flex gap-4 items-start"><Phone size={16} className="text-cakep-maroon shrink-0" />
                <a href="https://wa.me/628976767762" target="_blank" rel="noopener noreferrer" className="hover:text-cakep-maroon transition">+62 897-676-7762</a>
              </li>
              <li className="flex gap-4 items-start"><Mail size={16} className="text-cakep-maroon shrink-0" />
                <a href="mailto:berdikariconsultantbali@gmail.com" className="hover:text-cakep-maroon transition">berdikariconsultantbali@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[9px] uppercase font-black tracking-[0.4em] notranslate" translate="no">
            © 2026 CAKEP | BERDIKARI CONSULTANT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-full border border-slate-100 shadow-sm opacity-60">
            <Shield size={14} className="text-cakep-maroon" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Compliance Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
