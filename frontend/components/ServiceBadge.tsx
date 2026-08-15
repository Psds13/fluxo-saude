'use client';

import React from 'react';
import { Servico } from '../types/unidade';

export default function ServiceBadge({ servico }: { servico: Servico }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition">
      🔹 {servico.nome}
    </span>
  );
}
