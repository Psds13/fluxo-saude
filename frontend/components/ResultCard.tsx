'use client';

import React from 'react';
import Link from 'next/link';
import { ResultadoAnalise } from '../types/resultado';
import { MapPin, RefreshCw, Info, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

interface ResultCardProps {
  resultado: ResultadoAnalise;
}

export default function ResultCard({ resultado }: ResultCardProps) {
  const { altoContraste } = useAccessibility();

  let headerGradient = 'from-sky-700 to-sky-900 text-white';
  let badgeColor = 'bg-sky-100 text-sky-900 border-sky-300';
  let iconHeader = '🩺';

  if (resultado.resultado === 'UPA') {
    headerGradient = 'from-rose-700 to-rose-950 text-white';
    badgeColor = 'bg-rose-100 text-rose-900 border-rose-300';
    iconHeader = '🚨';
  } else if (resultado.resultado === 'SAMU') {
    headerGradient = 'from-red-800 to-red-950 text-white';
    badgeColor = 'bg-red-100 text-red-900 border-red-300';
    iconHeader = '🚑';
  }

  return (
    <div className="space-y-6">
      {/* Top Banner de Resultado */}
      <div
        className={`rounded-3xl border-2 shadow-xl overflow-hidden transition-all ${
          altoContraste ? 'bg-black text-yellow-300 border-yellow-400' : ''
        }`}
      >
        <div className={`p-6 md:p-8 bg-gradient-to-br ${altoContraste ? 'bg-zinc-900' : headerGradient}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border ${badgeColor}`}>
              Orientação Inicial Recomendada
            </span>
            <span className="text-xs text-white/80 font-medium ml-auto">
              {resultado.dataHora}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
            <span>{iconHeader}</span>
            <span>{resultado.titulo}</span>
          </h1>

          <p className="text-slate-100 text-sm md:text-lg font-medium leading-relaxed max-w-3xl">
            {resultado.subtitulo}
          </p>
        </div>

        {/* Corpo com Orientação Curta */}
        <div className={`p-6 md:p-8 space-y-6 ${altoContraste ? 'bg-black' : 'bg-white'}`}>
          <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl text-sky-950 space-y-1">
            <h3 className="font-bold text-sm uppercase tracking-wide text-sky-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" /> Resumo da Recomendação
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              {resultado.mensagemCurta}
            </p>
          </div>

          {/* Seção "Por que recebemos este resultado?" */}
          <div className="space-y-3 pt-2">
            <h3 className="font-extrabold text-lg md:text-xl text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-600" /> Por que recebemos este resultado?
            </h3>
            <p className="text-xs text-slate-500">
              A orientação foi gerada a partir das respostas fornecidas durante a triagem inicial, sem realização de diagnóstico médico:
            </p>
            <ul className="space-y-2">
              {resultado.explicacaoRespostas.map((exp, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0 mt-2"></span>
                  <span className="font-medium">{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recomendações Práticas */}
          <div className="space-y-3 pt-2">
            <h3 className="font-extrabold text-base md:text-lg text-slate-900">
              📋 O que fazer agora:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {resultado.orientacoesAcao.map((acao, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-100 text-slate-800 text-xs md:text-sm font-semibold flex items-start gap-2.5 border border-slate-200"
                >
                  <span className="text-sky-600 font-bold shrink-0">{idx + 1}.</span>
                  <span>{acao}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aviso Obrigatório */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>IMPORTANTE:</strong> Esta orientação não substitui uma avaliação presencial por profissional de saúde habilitado. Em caso de dúvida ou agravamento dos sintomas, procure sempre a unidade de atendimento mais próxima.
            </p>
          </div>
        </div>
      </div>

      {/* Botões de Ação na Tela de Resultado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <Link
          href={`/unidades?tipo=${resultado.resultado}`}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm md:text-base shadow-lg transition active:scale-98"
        >
          <MapPin className="w-5 h-5" />
          <span>Encontrar Unidade Próxima</span>
        </Link>

        <Link
          href="/triagem"
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm md:text-base shadow-md transition active:scale-98"
        >
          <RefreshCw className="w-5 h-5 text-slate-300" />
          <span>Refazer Triagem</span>
        </Link>

        <Link
          href="/diferenca"
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm md:text-base border border-slate-300 transition active:scale-98"
        >
          <Info className="w-5 h-5 text-sky-600" />
          <span>Entender a Diferença</span>
        </Link>
      </div>
    </div>
  );
}
