'use client';

import React, { useEffect, useState } from 'react';
import { ResultadoTriagem } from '../types/resultado';
import { QrCode, Printer, ShieldCheck } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

interface PreTriageTicketProps {
  resultado: ResultadoTriagem;
}

export default function PreTriageTicket({ resultado }: PreTriageTicketProps) {
  const { altoContraste } = useAccessibility();
  const [mounted, setMounted] = useState(false);
  const [protocolId, setProtocolId] = useState('SUS-0000-0000');

  useEffect(() => {
    setMounted(true);
    setProtocolId(`SUS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  const dataAtual = mounted ? new Date().toLocaleDateString('pt-BR') : '—';
  const horaAtual = mounted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';

  const handlePrint = () => {
    window.print();
  };

  const getCorBadgeClass = () => {
    switch (resultado.classificacaoCor) {
      case 'VERMELHO':
        return 'bg-rose-600 text-white border-rose-700';
      case 'AMARELO':
        return 'bg-amber-500 text-white border-amber-600';
      case 'VERDE':
        return 'bg-emerald-600 text-white border-emerald-700';
      default:
        return 'bg-sky-600 text-white border-sky-700';
    }
  };

  return (
    <div
      className={`p-6 md:p-8 rounded-3xl border-2 shadow-2xl transition-all ${
        altoContraste ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0 border border-blue-200">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3 h-3 text-blue-600" /> Protocolo de Pré-Triagem SUS
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">Comprovante Digital do Cidadão</h3>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md active:scale-95 shrink-0"
        >
          <Printer className="w-4 h-4 text-white" />
          <span>Imprimir / Salvar PDF</span>
        </button>
      </div>

      {/* Conteúdo da Ficha / Ticket impresso */}
      <div className="my-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Lado Esquerdo: Protocolo & Sintomas */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Código do Protocolo</span>
              <span className="text-lg font-black text-slate-800 dark:text-slate-100 font-mono">
                {protocolId}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Data/Hora</span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {dataAtual} às {horaAtual}
              </span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
              Encaminhamento Recomendado
            </span>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase border ${getCorBadgeClass()}`}>
                {resultado.tipoRecomendado}
              </span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                {resultado.titulo}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {resultado.descricao}
            </p>
          </div>
        </div>

        {/* Lado Direito: QR Code Simulado para Recepção */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-white inline-block shadow-md">
            <QrCode className="w-24 h-24 text-sky-400" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase text-sky-700 dark:text-sky-300 block">
              QR Code para Enfermagem
            </span>
            <p className="text-[11px] text-slate-500 leading-tight">
              Apresente esta tela ou impressão na recepção do posto para escaneamento rápido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
