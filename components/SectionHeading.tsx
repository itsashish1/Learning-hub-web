
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, badge, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-block px-4 py-1 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase bg-blue-50 border border-blue-100 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
