'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

interface ServiceCardProps {
  titulo: string;
  subtitulo: string;
  descricao: string;
  icone: React.ReactNode;
  variante: 'upa' | 'ubs' | 'duvida' | 'samu';
  href: string;
  tagPopular?: string;
}

export default function ServiceCard({
  titulo,
  subtitulo,
  descricao,
  icone,
  variante,
  href,
  tagPopular,
}: ServiceCardProps) {
  const { altoContraste } = useAccessibility();

  let borderStyles = 'border-cyan-200 bg-cyan-50/60 hover:border-cyan-400 hover:shadow-[0_16px_38px_rgba(101,200,208,0.12)]';
  let badgeColor = 'bg-cyan-100 text-cyan-800 border-cyan-200';
  let iconBg = 'bg-cyan-50 text-cyan-700 border-cyan-200';
  let buttonStyle = 'bg-cyan-700 hover:bg-cyan-800 text-white';
  let titleStyle = 'text-slate-900 group-hover:text-cyan-700';

  if (variante === 'upa') {
    borderStyles = 'border-rose-200 bg-rose-50/60 hover:border-rose-400 hover:shadow-[0_16px_36px_rgba(239,68,68,0.10)]';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
    iconBg = 'bg-rose-50 text-rose-600 border-rose-200';
    buttonStyle = 'bg-rose-600 hover:bg-rose-700 text-white';
    titleStyle = 'text-slate-900 group-hover:text-rose-700';
  } else if (variante === 'ubs') {
    borderStyles = 'border-cyan-200 bg-cyan-50/60 hover:border-cyan-400 hover:shadow-[0_16px_36px_rgba(101,200,208,0.12)]';
    badgeColor = 'bg-cyan-100 text-cyan-800 border-cyan-200';
    iconBg = 'bg-cyan-50 text-cyan-700 border-cyan-200';
    buttonStyle = 'bg-cyan-700 hover:bg-cyan-800 text-white';
    titleStyle = 'text-slate-900 group-hover:text-cyan-700';
  } else if (variante === 'duvida') {
    borderStyles = 'border-blue-200 bg-blue-50/60 hover:border-blue-400 hover:shadow-[0_16px_36px_rgba(0,113,188,0.12)]';
    badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
    iconBg = 'bg-blue-50 text-blue-700 border-blue-200';
    buttonStyle = 'bg-blue-700 hover:bg-blue-800 text-white';
    titleStyle = 'text-slate-900 group-hover:text-blue-700';
  } else if (variante === 'samu') {
    borderStyles = 'border-red-200 bg-red-50/60 hover:border-red-400 hover:shadow-[0_16px_36px_rgba(220,38,38,0.10)]';
    badgeColor = 'bg-red-100 text-red-800 border-red-200';
    iconBg = 'bg-red-50 text-red-600 border-red-200';
    buttonStyle = 'bg-red-600 hover:bg-red-700 text-white';
    titleStyle = 'text-slate-900 group-hover:text-red-700';
  }

  if (altoContraste) {
    borderStyles = 'border-yellow-400 bg-black text-yellow-300';
    buttonStyle = 'bg-yellow-400 text-black font-extrabold';
    titleStyle = 'text-yellow-300 group-hover:text-yellow-200';
  }

  return (
    <div
      className={`group relative flex flex-col justify-between p-6 md:p-7 rounded-3xl border-2 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition-all duration-300 ${borderStyles}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`p-3.5 rounded-2xl border ${iconBg} shadow-xs transition-transform duration-300 group-hover:scale-105`}>
            {icone}
          </div>
          {tagPopular && (
            <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border ${badgeColor}`}>
              {tagPopular}
            </span>
          )}
        </div>

        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em] block mb-2">
          {subtitulo}
        </span>
        <h3 className={`text-xl md:text-2xl font-extrabold transition-colors mb-2 leading-tight ${titleStyle}`}>
          {titulo}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {descricao}
        </p>
      </div>

      <Link
        href={href}
        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-sm md:text-base transition-all shadow-md active:scale-[0.99] ${buttonStyle}`}
      >
        <span>Acessar Orientação</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
