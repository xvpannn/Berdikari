"use client";

import React from 'react';
import Footer from '../../../components/Footer';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cases } from '../../../data/cases';
import SectionHeader from '../../../components/ui/SectionHeader';
import CaseCard from '../../../components/ui/CaseCard';

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cakep-maroon/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
          <SectionHeader
            badge="Portfolio Tracking"
            title="Studi"
            italicTitle="Kasus Kami"
            description="Kumpulan kisah sukses CAKEP Legal dalam mendampingi klien menghadapi tantangan regulasi dan perizinan yang kompleks."
            className="max-w-3xl"
          />
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {cases.map((c, i) => (
              <CaseCard key={i} caseData={c} variant="full" />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-cakep-maroon-dark relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cakep-maroon/10 to-transparent" />
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-10">
            Ingin Bisnis Anda Jadi <br /> <span className="text-cakep-maroon">Success Story</span> Berikutnya?
          </h2>
          <Link href="/#booking-card" className="inline-flex items-center gap-4 bg-cakep-maroon text-white px-10 py-5 rounded-2xl font-black tracking-[0.2em] text-xs hover:bg-white hover:text-cakep-maroon-dark transition-all duration-500 shadow-xl shadow-cakep-maroon/20">
            KONSULTASI SEKARANG <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
