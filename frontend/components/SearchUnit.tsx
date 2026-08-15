'use client';

import React from 'react';
import { TipoUnidade } from '../types/unidade';
import { Search, Navigation, Filter, MapPin } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

interface SearchUnitProps {
  busca: string;
  onBuscaChange: (termo: string) => void;
  tipoSelecionado: TipoUnidade | 'TODAS';
  onTipoChange: (tipo: TipoUnidade | 'TODAS') => void;
  onUsarLocalizacao: () => void;
  obtendoLocalizacao: boolean;
  apenasAbertas: boolean;
  onApenasAbertasChange: (valor: boolean) => void;
}

export default function SearchUnit({
  busca,
  onBuscaChange,
  tipoSelecionado,
  onTipoChange,
  onUsarLocalizacao,
  obtendoLocalizacao,
  apenasAbertas,
  onApenasAbertasChange,
}: SearchUnitProps) {
  const { altoContraste } = useAccessibility();

  return (
    <div
      className={`rounded-3xl border-2 p-5 md:p-6 shadow-md space-y-4 ${
        altoContraste ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Campo de Busca Principal e Botão de Localização */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            placeholder="Pesquisar por endereço, bairro ou nome da unidade..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium text-sm text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <button
          onClick={onUsarLocalizacao}
          disabled={obtendoLocalizacao}
          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-bold text-sm shadow-md transition active:scale-98 shrink-0"
        >
          <Navigation className={`w-4 h-4 ${obtendoLocalizacao ? 'animate-spin' : ''}`} />
          <span>{obtendoLocalizacao ? 'Localizando...' : 'Usar minha localização'}</span>
        </button>
      </div>

      {/* Filtros por Tipo de Unidade e Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold uppercase text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </span>

          <button
            onClick={() => onTipoChange('TODAS')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              tipoSelecionado === 'TODAS'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Todas as Unidades
          </button>

          <button
            onClick={() => onTipoChange('UBS')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              tipoSelecionado === 'UBS'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            🩺 Apenas UBS (Postos)
          </button>

          <button
            onClick={() => onTipoChange('UPA')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              tipoSelecionado === 'UPA'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
            }`}
          >
            🚨 Apenas UPAs 24h
          </button>

          <button
            onClick={() => onTipoChange('HOSPITAL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              tipoSelecionado === 'HOSPITAL'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200'
            }`}
          >
            🏥 Hospitais
          </button>
        </div>

        {/* Checkbox Apenas Abertas */}
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={apenasAbertas}
            onChange={(e) => onApenasAbertasChange(e.target.checked)}
            className="w-4 h-4 rounded-md text-sky-600 focus:ring-sky-500 border-slate-300"
          />
          <span>Mostrar apenas unidades abertas agora</span>
        </label>
      </div>
    </div>
  );
}
