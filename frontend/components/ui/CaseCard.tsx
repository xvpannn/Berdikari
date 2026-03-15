import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Case } from '../../data/cases';

interface CaseCardProps {
  caseData: Case;
  variant?: 'compact' | 'full';
  className?: string;
}

export default function CaseCard({ caseData, variant = 'compact', className = '' }: CaseCardProps) {
  if (variant === 'compact') {
    return (
      <Link href="/cases" className={`group relative transition-all duration-1000 ${className}`}>
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-[2.5rem] shadow-lg group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-1000 bg-white border-[4px] border-white">
          <img src={caseData.img} alt={caseData.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />

          <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md shadow-md rounded-xl flex items-center justify-center text-2xl font-black text-cakep-heading group-hover:bg-cakep-maroon group-hover:text-white transition-all duration-700 z-20 group-hover:rotate-6">
            {caseData.id}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-cakep-maroon-dark via-cakep-maroon-dark/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute bottom-10 left-10 right-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
            <div className="flex items-center gap-2.5 bg-cakep-maroon/20 px-3 py-1 rounded-full w-fit mb-4 border border-cakep-maroon/10">
              <CheckCircle2 size={12} className="text-cakep-maroon" />
              <span className="text-[8px] font-black tracking-[0.2em] text-cakep-maroon uppercase">SUCCESS STORY</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
              <h3 className="text-white text-3xl lg:text-4xl font-black tracking-tighter leading-none pr-6">{caseData.title}</h3>
              <div className="bg-cakep-maroon p-5 rounded-xl text-white group-hover:rotate-45 transition-transform duration-700 shadow-lg shadow-cakep-maroon/50">
                <ArrowUpRight size={28} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="relative h-[450px] lg:h-[550px] overflow-hidden rounded-[3rem] shadow-xl transition-all duration-1000 bg-white border-[6px] border-white mb-8">
        <img
          src={caseData.img}
          alt={caseData.title}
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cakep-maroon-dark/90 via-cakep-maroon-dark/20 to-transparent transition-opacity duration-700" />

        <div className="absolute top-8 left-8">
          <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] text-cakep-maroon shadow-sm">
            {caseData.category.toUpperCase()}
          </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10">
          <div className="flex items-center gap-2.5 bg-cakep-maroon/30 backdrop-blur-md px-4 py-1.5 rounded-full w-fit mb-6 border border-white/20">
            <CheckCircle2 size={14} className="text-white" />
            <span className="text-[9px] font-black tracking-[0.2em] text-white uppercase">SUCCESS STORY</span>
          </div>
          <h3 className="text-white text-4xl font-black tracking-tighter leading-none mb-4">{caseData.title}</h3>
        </div>
      </div>
      <div className="px-6">
        <p className="text-slate-400 text-lg italic font-serif leading-relaxed mb-6 max-w-md">
          "{caseData.desc}"
        </p>
      </div>
    </div>
  );
}
