'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

export default function DisclaimerBanner({ texto }: { texto?: string }) {
  const { altoContraste } = useAccessibility();

  return (
    <div
      className={`rounded-2xl p-4 md:p-5 border flex items-start gap-3.5 shadow-xs transition-colors ${
        altoContraste
          ? 'bg-yellow-950/40 border-yellow-400 text-yellow-200'
          : 'bg-amber-50 border-amber-200 text-amber-900'
      }`}
    >
      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 shrink-0 mt-0.5">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
      </div>
      <div className="text-xs leading-relaxed font-medium">
        <p className="font-bold text-amber-950 uppercase tracking-wide mb-1 text-[11px]">
          Orientação Oficial do Sistema
        </p>
        <p>
          {texto ||
            'Esta ferramenta não realiza diagnóstico médico, não prescreve tratamentos nem afirma que você não precisa de atendimento. Seu objetivo é apenas orientar a busca inicial na rede. Em caso de dúvida ou sintomas graves, procure avaliação profissional presencial ou acione o SAMU 192.'}
        </p>
      </div>
    </div>
  );
}
