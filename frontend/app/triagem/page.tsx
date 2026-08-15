'use client';

import React from 'react';
import Link from 'next/link';
import { useTriagem } from '@/hooks/useTriagem';
import QuestionCard from '@/components/QuestionCard';
import AnswerButton from '@/components/AnswerButton';
import ProgressBar from '@/components/ProgressBar';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { ArrowLeft, RotateCcw, ShieldCheck, Siren } from 'lucide-react';

export default function TriagemPage() {
  const {
    perguntaAtual,
    indiceAtual,
    totalPerguntas,
    porcentagemProgresso,
    carregando,
    responderPergunta,
    voltarPergunta,
    reiniciarTriagem,
  } = useTriagem();

  if (carregando) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-bold text-slate-700 text-sm">Carregando triagem adaptativa...</p>
      </div>
    );
  }

  if (!perguntaAtual) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Triagem Concluída</h2>
        <p className="text-sm text-slate-600">Analisando suas respostas para gerar a melhor orientação...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 min-h-[80vh] flex flex-col justify-between">
      {/* Header da Triagem */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={voltarPergunta}
            disabled={indiceAtual === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Fluxo Saúde</span>
            <button
              onClick={reiniciarTriagem}
              className="flex items-center gap-1 text-xs text-rose-600 font-bold hover:underline"
              title="Reiniciar Pergunta"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>

        {/* Barra de Progresso */}
        <ProgressBar
          etapaAtual={indiceAtual + 1}
          totalEtapas={totalPerguntas}
          porcentagem={porcentagemProgresso}
        />
      </div>

      {/* Card da Pergunta Atual */}
      <div className="space-y-6">
        <QuestionCard pergunta={perguntaAtual} numeroEtapa={indiceAtual + 1} />

        {/* Botões de Resposta Grandes e Acessíveis */}
        <div className="space-y-3">
          <AnswerButton resposta="SIM" onClick={() => responderPergunta('SIM')} />
          <AnswerButton resposta="NAO" onClick={() => responderPergunta('NAO')} />
          <div className="pt-1">
            <AnswerButton resposta="DUVIDA" onClick={() => responderPergunta('DUVIDA')} />
          </div>
        </div>
      </div>

      {/* Aviso de Emergência Rápida & Footer */}
      <div className="space-y-4 pt-6">
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center justify-between gap-3 text-rose-900 text-xs">
          <div className="flex items-center gap-2">
            <Siren className="w-5 h-5 text-rose-600 shrink-0" />
            <span>Caso haja risco imediato à vida ou agravamento súbito:</span>
          </div>
          <a
            href="tel:192"
            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-3 py-1.5 rounded-xl shrink-0 text-xs shadow-xs"
          >
            Ligar 192
          </a>
        </div>

        <DisclaimerBanner texto="Responda com atenção. Suas respostas ajudam o sistema a identificar sinais de alerta de urgência sem realizar diagnóstico clínico." />
      </div>
    </div>
  );
}
