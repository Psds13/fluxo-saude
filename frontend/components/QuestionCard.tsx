'use client';

import React from 'react';
import { Pergunta } from '../types/triagem';
import { Volume2, HelpCircle } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

interface QuestionCardProps {
  pergunta: Pergunta;
  numeroEtapa: number;
}

export default function QuestionCard({ pergunta, numeroEtapa }: QuestionCardProps) {
  const { altoContraste, leitorVoz, falarTexto } = useAccessibility();

  const handleAudio = () => {
    falarTexto(`${pergunta.texto}. ${pergunta.subtexto || ''}`);
  };

  return (
    <div
      className={`p-6 md:p-8 rounded-3xl border-2 shadow-lg transition-all ${
        altoContraste ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 text-sky-800 border border-sky-200">
          <HelpCircle className="w-3.5 h-3.5" /> Pergunta {numeroEtapa}
        </span>

        {/* Botão Ouvir Pergunta */}
        <button
          onClick={handleAudio}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          title="Ouvir texto da pergunta"
        >
          <Volume2 className="w-4 h-4 text-sky-600" />
          <span>Ouvir Pergunta</span>
        </button>
      </div>

      <h2 className="text-xl md:text-2xl font-extrabold leading-snug mb-3">
        {pergunta.texto}
      </h2>

      {pergunta.subtexto && (
        <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal bg-slate-50 p-4 rounded-2xl border border-slate-100">
          💡 <strong>Exemplo:</strong> {pergunta.subtexto}
        </p>
      )}
    </div>
  );
}
