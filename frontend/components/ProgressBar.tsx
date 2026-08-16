'use client';

import React from 'react';
import { useAccessibility } from './AccessibilityContext';

interface ProgressBarProps {
  etapaAtual: number;
  totalEtapas: number;
  porcentagem: number;
}

export default function ProgressBar({ etapaAtual, totalEtapas, porcentagem }: ProgressBarProps) {
  const { altoContraste } = useAccessibility();

  return (
    <div className="w-full space-y-2 mb-6">
      <div className="flex justify-between items-center text-xs md:text-sm font-extrabold text-slate-700">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          Etapa {etapaAtual} de {totalEtapas}
        </span>
        <span className="text-blue-700 font-black">{porcentagem}% concluído</span>
      </div>

      {/* Track da Barra */}
      <div
        className={`w-full h-3.5 rounded-full overflow-hidden p-0.5 border ${
          altoContraste ? 'bg-zinc-800 border-yellow-400' : 'bg-slate-200 border-slate-300'
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            altoContraste
              ? 'bg-yellow-400'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm'
          }`}
          style={{ width: `${Math.min(100, Math.max(5, porcentagem))}%` }}
        />
      </div>
    </div>
  );
}
