'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

export default function DisclaimerBanner({ texto }: { texto?: string }) {
  const { altoContraste } = useAccessibility();

  return (
    <div
      className={`rounded-3xl p-5 md:p-6 border-2 flex items-start gap-3.5 shadow-sm transition-colors ${
        altoContraste
          ? 'bg-yellow-950/50 border-yellow-400 text-yellow-200'
          : 'bg-blue-50 border-blue-200 text-blue-950'
      }`}
    >
      <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5 flex-none">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="text-xs leading-relaxed font-medium">
        <p className="font-bold text-blue-900 uppercase tracking-wide mb-2 text-[11px]\">
          Aviso Importante
        </p>
        <p className="text-blue-800">
          {texto ||
            'Esta ferramenta não realiza diagnóstico médico, não prescreve tratamentos nem afirma que você não precisa de atendimento. Seu objetivo é apenas orientar a busca inicial na rede. Em caso de dúvida ou sintomas graves, procure avaliação profissional presencial ou acione o SAMU 192.'}
        </p>
      </div>
    </div>
  );
}
