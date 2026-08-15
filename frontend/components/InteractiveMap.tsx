'use client';

import React, { useState } from 'react';
import { Unidade, TipoUnidade } from '../types/unidade';
import { MapPin, Navigation, Clock, Phone, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

interface InteractiveMapProps {
  unidades: Unidade[];
  onSelectUnidade?: (unidade: Unidade) => void;
}

export default function InteractiveMap({ unidades, onSelectUnidade }: InteractiveMapProps) {
  const [filtroTipo, setFiltroTipo] = useState<TipoUnidade | 'TODOS'>('TODOS');
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<Unidade | null>(
    unidades[0] || null
  );
  const { altoContraste, t } = useAccessibility();

  const unidadesFiltradas = unidades.filter((u) => {
    if (filtroTipo === 'TODOS') return true;
    return u.tipo === filtroTipo;
  });

  const abrirRotaGoogleMaps = (u: Unidade) => {
    const destination = `${u.latitude},${u.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`rounded-3xl border-2 shadow-xl p-6 md:p-8 transition-all ${
        altoContraste ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 mb-2">
            <MapPin className="w-3.5 h-3.5" /> Mapa Interativo & Status de Filas
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Geolocalização das Unidades de Saúde
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Visualize os pontos de atenção, estimativa de espera e traçe sua rota até o posto.
          </p>
        </div>

        {/* Filtros por Tipo de Unidade no Mapa */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
          {(['TODOS', 'UBS', 'UPA'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                filtroTipo === tipo
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tipo === 'TODOS' ? 'Todas' : tipo}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Visualização: Lista Interativa + Detalhes do Pino Selecionado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Painel do Mapa Interativo (Visualizador de Pinos Simulado com Coordenadas) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 text-white min-h-[380px] relative flex flex-col justify-between overflow-hidden border border-slate-800 shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Topo do Mapa */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-full backdrop-blur-md border border-slate-700 text-xs text-sky-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GPS Ativo — Município Selecionado</span>
            </div>
          </div>

          {/* Grid de Pinos das Unidades no Mapa */}
          <div className="relative z-10 my-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {unidadesFiltradas.map((u) => {
              const isSelected = unidadeSelecionada?.id === u.id;
              const isUpa = u.tipo === 'UPA';

              return (
                <button
                  key={u.id}
                  onClick={() => {
                    setUnidadeSelecionada(u);
                    if (onSelectUnidade) onSelectUnidade(u);
                  }}
                  className={`p-3 rounded-2xl border text-left transition transform hover:scale-105 active:scale-95 ${
                    isSelected
                      ? 'bg-sky-600 text-white border-white shadow-xl ring-4 ring-sky-500/30'
                      : isUpa
                      ? 'bg-slate-800/90 border-rose-500/40 text-slate-100 hover:bg-slate-800'
                      : 'bg-slate-800/90 border-emerald-500/40 text-slate-100 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                        isUpa ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {u.tipo}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Unidade Operacional" />
                  </div>
                  <h4 className="font-extrabold text-xs line-clamp-1">{u.nome}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-sky-400" /> {u.distanciaKm || '1.2'} km de você
                  </p>
                </button>
              );
            })}
          </div>

          {/* Legenda de Status de Filas */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Fila Baixa</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Fila Média</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Atendimento Intenso</span>
            </div>
          </div>
        </div>

        {/* Painel lateral: Detalhes e Traçado de Rota da Unidade Selecionada */}
        <div className="lg:col-span-5 space-y-4">
          {unidadeSelecionada ? (
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    unidadeSelecionada.tipo === 'UPA'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {unidadeSelecionada.tipo} — {unidadeSelecionada.tipo === 'UPA' ? 'Pronto Atendimento 24h' : 'Atenção Básica'}
                </span>

                <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Aberta Agora
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                  {unidadeSelecionada.nome}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
                  <span>{unidadeSelecionada.endereco}</span>
                </p>
              </div>

              {/* Informações de Fila e Atendimento */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Tempo de Espera</span>
                  <span className="font-extrabold text-sm text-sky-600 flex items-center gap-1 mt-0.5">
                    <Clock className="w-4 h-4" /> ~20 min
                  </span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Distância</span>
                  <span className="font-extrabold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                    <Navigation className="w-4 h-4 text-emerald-600" /> {unidadeSelecionada.distanciaKm || '1.5'} km
                  </span>
                </div>
              </div>

              {/* Botões de Ação: Ligar & Traçar Rota no Google Maps */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => abrirRotaGoogleMaps(unidadeSelecionada)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-2xl text-xs transition shadow-md active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Traçar Rota no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </button>

                {unidadeSelecionada.telefone && (
                  <a
                    href={`tel:${unidadeSelecionada.telefone.replace(/\D/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-2xl text-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Ligar: {unidadeSelecionada.telefone}</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
              Clique em uma unidade no mapa para visualizar detalhes e traçar a rota.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
