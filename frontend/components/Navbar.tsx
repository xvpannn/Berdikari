"use client";

import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollToId, scrollToTop } = useSmoothScroll();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    setIsMenuOpen(false);

    // If we're on a subpage, let the link handle navigation naturally
    if (window.location.pathname !== '/') return;

    e.preventDefault();
    if (id === 'home') {
      scrollToTop();
    } else {
      scrollToId(id);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 lg:px-12 py-4 pointer-events-none">
        <div className="container mx-auto max-w-4xl flex justify-between items-center bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-[0_15px_40px_rgba(15,23,42,0.08)] px-4 lg:px-6 py-3 rounded-2xl transition-all duration-500 pointer-events-auto">
          <Link href="/" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-36 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <img 
                src="/logo.jpg" 
                alt="Berdikari Consultant Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback jika file belum ada atau salah nama
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = "w-10 h-10 bg-cakep-maroon rounded-lg flex items-center justify-center text-white font-black text-sm";
                    fallback.innerText = "C";
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <div className="text-lg font-black text-cakep-heading tracking-tighter group-hover:text-cakep-maroon transition-colors duration-500 leading-none notranslate" translate="no">
              CAKEP
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {['Home', 'About', 'Services', 'Cases'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item === 'Home' ? 'home' : item.toLowerCase())}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-cakep-maroon transition-all relative group"
              >
                {item} <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-cakep-maroon group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/#booking-card" onClick={(e) => handleNavClick(e, 'booking-card')} className="hidden sm:flex group items-center gap-3 bg-cakep-maroon text-white px-5 lg:px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cakep-maroon-dark transition-all duration-500 shadow-md shadow-cakep-maroon/20">
              Consult Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-cakep-maroon-dark hover:text-cakep-maroon transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-cakep-maroon-dark/95 backdrop-blur-xl lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {['Home', 'About', 'Services', 'Cases'].map((item, idx) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item === 'Home' ? 'home' : item.toLowerCase())}
              className={`text-2xl font-black text-white uppercase tracking-[0.3em] hover:text-cakep-maroon transition-all transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/#booking-card"
            onClick={(e) => handleNavClick(e, 'booking-card')}
            className={`mt-10 bg-cakep-maroon text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Start Project Now
          </Link>
        </div>
      </div>
    </>
  );
}
