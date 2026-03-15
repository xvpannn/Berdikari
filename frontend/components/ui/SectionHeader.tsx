import React from 'react';

interface SectionHeaderProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  italicTitle?: string;
}

export default function SectionHeader({ 
  badge, 
  title, 
  description, 
  align = 'left',
  className = '',
  italicTitle
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col space-y-6 ${alignClasses[align]} ${className}`}>
      <div className="inline-flex items-center gap-3 bg-cakep-maroon/5 px-4 py-2 rounded-full border border-cakep-maroon/10 w-fit">
        <span className="w-2 h-2 bg-cakep-maroon rounded-full animate-pulse" />
        <span className="text-[9px] font-black tracking-[0.3em] text-cakep-maroon uppercase">{badge}</span>
      </div>
      
      <h2 className="text-5xl lg:text-7xl font-black text-cakep-heading uppercase tracking-tighter leading-[0.9]">
        {title}
        {italicTitle && (
          <> <br /> <span className="text-cakep-maroon italic font-serif font-light lowercase">{italicTitle}</span></>
        )}
      </h2>
      
      <p className={`text-slate-400 max-w-xs text-lg lg:text-xl italic font-serif leading-relaxed ${align === 'left' ? 'border-l-4 pl-8' : align === 'right' ? 'border-r-4 pr-8' : ''} border-cakep-maroon/10`}>
        {description}
      </p>
    </div>
  );
}
