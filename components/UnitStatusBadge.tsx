'use client';

import React from 'react';
import { StatusUnidade } from '../types/unidade';

export default function UnitStatusBadge({ status }: { status: StatusUnidade }) {
  switch (status) {
    case 'ABERTA':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          🟢 Aberta
        </span>
      );
    case 'ATENDIMENTO_ALTERADO':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          🟡 Atendimento com Alteração
        </span>
      );
    case 'FECHADA':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          🔴 Fechada
        </span>
      );
    case 'SERVICO_INDISPONIVEL':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-300">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          ⚠️ Serviço Indisponível
        </span>
      );
    default:
      return null;
  }
}
