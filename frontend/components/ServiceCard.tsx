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

  let borderStyles = 'border-slate-200 hover:border-sky-500';
  let badgeColor = 'bg-sky-100 text-sky-800';
  let iconBg = 'bg-sky-50 text-sky-600 border-sky-200';
  let buttonStyle = 'bg-sky-600 hover:bg-sky-700 text-white';

  if (variante === 'upa') {
    borderStyles = 'border-rose-200 hover:border-rose-500 hover:shadow-rose-100/50';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
    iconBg = 'bg-rose-50 text-rose-600 border-rose-200';
    buttonStyle = 'bg-rose-600 hover:bg-rose-700 text-white';
  } else if (variante === 'ubs') {
    borderStyles = 'border-emerald-200 hover:border-emerald-500 hover:shadow-emerald-100/50';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    iconBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    buttonStyle = 'bg-emerald-700 hover:bg-emerald-800 text-white';
  } else if (variante === 'samu') {
    borderStyles = 'border-red-400 bg-red-50/50 hover:border-red-600';
    badgeColor = 'bg-red-600 text-white';
    iconBg = 'bg-red-600 text-white';
    buttonStyle = 'bg-red-700 hover:bg-red-800 text-white font-extrabold';
  }

  if (altoContraste) {
    borderStyles = 'border-yellow-400 bg-black text-yellow-300';
    buttonStyle = 'bg-yellow-400 text-black font-extrabold';
  }

  return (
    <div
      className={`group relative flex flex-col justify-between p-6 md:p-7 rounded-3xl border-2 shadow-xs hover:shadow-xl transition-all duration-300 bg-white ${borderStyles}`}
    >
      <div>
        {/* Header do Card */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`p-3.5 rounded-2xl border ${iconBg} shadow-xs transition-transform group-hover:scale-105`}>
            {icone}
          </div>
          {tagPopular && (
            <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border ${badgeColor}`}>
              {tagPopular}
            </span>
          )}
        </div>

        {/* Textos */}
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
          {subtitulo}
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors mb-2 leading-tight">
          {titulo}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {descricao}
        </p>
      </div>

      {/* Botão de Ação Grande e Acessível */}
      <Link
        href={href}
        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-sm md:text-base transition shadow-md active:scale-[0.99] ${buttonStyle}`}
      >
        <span>Acessar Orientação</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
