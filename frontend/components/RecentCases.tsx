"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cases } from '../data/cases';
import SectionHeader from './ui/SectionHeader';
import CaseCard from './ui/CaseCard';

export default function RecentCases() {
  return (
    <section id="cases" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <SectionHeader
            badge="Portfolio Tracking"
            title="STUDI"
            italicTitle="Kasus Terbaru"
            description="Kumpulan bukti nyata profesionalisme kami dalam mendampingi klien."
            align="left"
            className="mb-0"
          />
          <div className="hidden lg:block border-r-4 border-cakep-maroon/20 pr-8 text-right">
             <p className="text-slate-400 text-sm font-serif italic max-w-[200px]">Dokumentasi perizinan strategis klien kami di berbagai sektor.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          {cases.slice(0, 2).map((c, i) => (
            <CaseCard
              key={i}
              caseData={c}
              variant="compact"
              className="bg-white"
            />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/cases" className="group flex items-center gap-5 bg-white border border-slate-100 px-12 py-5 rounded-full text-cakep-heading font-black tracking-[0.3em] text-[10px] uppercase hover:bg-cakep-maroon hover:text-white hover:border-cakep-maroon transition-all duration-700 shadow-sm hover:shadow-xl hover:shadow-cakep-maroon/20">
            LIHAT SELURUH PORTOFOLIO <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
