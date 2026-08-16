'use client';

import React from 'react';
import Link from 'next/link';
import { Unidade } from '../types/unidade';
import UnitStatusBadge from './UnitStatusBadge';
import ServiceBadge from './ServiceBadge';
import { MapPin, Phone, Clock, Navigation, Bus, CalendarCheck, ChevronRight } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

export default function UnitCard({ unidade }: { unidade: Unidade }) {
  const { altoContraste } = useAccessibility();

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${unidade.nome}, ${unidade.endereco}, ${unidade.numero}, ${unidade.bairro}, ${unidade.cidade}`
  )}`;

  return (
    <div
      className={`rounded-3xl border p-6 md:p-7 shadow-[0_12px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_40px_rgba(101,200,208,0.10)] transition-all duration-300 flex flex-col justify-between ${
        altoContraste ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-900 border-slate-200 hover:border-cyan-300'
      }`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                unidade.tipo === 'UPA'
                  ? 'bg-rose-100 text-rose-900 border border-rose-300'
                  : unidade.tipo === 'UBS'
                  ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                  : 'bg-blue-100 text-blue-900 border border-blue-300'
              }`}
            >
              {unidade.tipo === 'UBS' ? '🩺 UBS / Posto' : unidade.tipo === 'UPA' ? '🚨 UPA 24h' : '🏥 Hospital'}
            </span>

            {unidade.distanciaKm !== undefined && (
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                📍 {unidade.distanciaKm} km de você
              </span>
            )}
          </div>

          <UnitStatusBadge status={unidade.status} />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 leading-snug hover:text-cyan-700 transition-colors">
          <Link href={`/unidades/${unidade.id}`}>{unidade.nome}</Link>
        </h3>

        <div className="space-y-1.5 text-xs md:text-sm text-slate-600">
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
            <span>
              {unidade.endereco}, {unidade.numero} — <strong>{unidade.bairro}</strong>, {unidade.cidade}/{unidade.estado}
            </span>
          </p>
          {unidade.referencia && (
            <p className="text-[11px] text-slate-400 pl-6">
              Ref: {unidade.referencia}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
            <span className="font-semibold">{unidade.horarioFuncionamento}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
            <a href={`tel:${unidade.telefone.replace(/\D/g, '')}`} className="font-bold hover:underline">
              {unidade.telefone}
            </a>
          </div>
        </div>

        {unidade.statusDescricao && (
          <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            ℹ️ {unidade.statusDescricao}
          </p>
        )}

        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
            Serviços Disponíveis:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {unidade.servicos.slice(0, 4).map((serv) => (
              <ServiceBadge key={serv.id} servico={serv} />
            ))}
            {unidade.servicos.length > 4 && (
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                +{unidade.servicos.length - 4} mais
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-5 mt-4 border-t border-slate-100 space-y-3">
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <CalendarCheck className="w-3 h-3 text-slate-400" />
            Informação atualizada em: {unidade.ultimaAtualizacao}
          </span>
          <span className="text-emerald-700 font-bold">Oficial SUS</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition shadow-sm"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Como Chegar</span>
          </a>

          <Link
            href={`/unidades/${unidade.id}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition"
          >
            <span>Ver Detalhes</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}
