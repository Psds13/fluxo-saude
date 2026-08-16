'use client';

import React from 'react';
import { TipoResposta } from '../types/triagem';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

interface AnswerButtonProps {
  resposta: TipoResposta;
  onClick: () => void;
}

export default function AnswerButton({ resposta, onClick }: AnswerButtonProps) {
  const { altoContraste } = useAccessibility();

  if (resposta === 'SIM') {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-5 md:p-6 rounded-2xl border-2 font-extrabold text-lg md:text-xl shadow-md transition-all active:scale-[0.98] ${
          altoContraste
            ? 'bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-300'
            : 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-700 shadow-cyan-700/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-7 h-7 shrink-0" />
          <span>SIM</span>
        </div>
        <span className="text-xs uppercase font-bold px-3 py-1 bg-white/20 rounded-full">
          Confirmar
        </span>
      </button>
    );
  }

  if (resposta === 'NAO') {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-5 md:p-6 rounded-2xl border-2 font-extrabold text-lg md:text-xl shadow-md transition-all active:scale-[0.98] ${
          altoContraste
            ? 'bg-zinc-800 text-yellow-300 border-yellow-400 hover:bg-zinc-700'
            : 'bg-slate-700 hover:bg-slate-800 text-white border-slate-800 shadow-slate-700/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <XCircle className="w-7 h-7 shrink-0 text-slate-300" />
          <span>NÃO</span>
        </div>
        <span className="text-xs uppercase font-bold px-3 py-1 bg-white/10 rounded-full">
          Negar
        </span>
      </button>
    );
  }

  // Resposta = DUVIDA
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl border font-bold text-sm md:text-base transition-all active:scale-[0.98] ${
        altoContraste
          ? 'bg-black text-yellow-300 border-yellow-400 hover:bg-zinc-900'
          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
        <span className="text-left">Estou em dúvida / Quero procurar atendimento mesmo assim</span>
      </div>
      <span className="text-xs font-semibold text-amber-700 shrink-0 hidden sm:inline">
        Continuar ➔
      </span>
    </button>
  );
}
