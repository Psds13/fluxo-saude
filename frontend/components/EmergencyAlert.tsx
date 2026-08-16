'use client';

import React from 'react';
import { PhoneCall, AlertOctagon, ArrowUpRight } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

export default function EmergencyAlert() {
  const { altoContraste, t } = useAccessibility();

  return (
    <div
      className={`rounded-3xl p-6 md:p-8 border-2 shadow-[0_18px_40px_rgba(225,87,74,0.08)] transition-all ${
        altoContraste
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-gradient-to-br from-rose-50 via-white to-rose-100 text-slate-900 border-rose-200'
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 uppercase tracking-wider border border-rose-200">
            <AlertOctagon className="w-4 h-4 text-rose-600 animate-bounce" />
            {t('situacao_emergencia', 'Situação de Emergência Grave')}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-rose-900">
            🚑 {t('preciso_atendimento_agora', 'Preciso de atendimento agora')}
          </h2>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            Em caso de perda de consciência, dor forte no peito, dificuldade grave para respirar ou acidentes graves, <strong>não espere</strong> pela triagem web. Procure emergência imediata ou ligue para o SAMU 192.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 space-y-2">
          <a
            href="tel:192"
            className="w-full md:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-rose-600 text-white hover:bg-rose-500 font-black text-lg md:text-xl shadow-lg transition active:scale-95"
          >
            <PhoneCall className="w-6 h-6 text-white animate-pulse" />
            <span>{t('ligar_samu_192', 'LIGAR SAMU 192')}</span>
            <ArrowUpRight className="w-5 h-5 text-rose-100" />
          </a>
          <p className="text-[11px] text-slate-600 text-center font-medium">
            Ligação gratuita de qualquer telefone
          </p>
        </div>
      </div>
    </div>
  );
}
