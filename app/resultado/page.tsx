'use client';

import React, { useEffect, useState } from 'react';
import ResultCard from '@/components/ResultCard';
import PreTriageTicket from '@/components/PreTriageTicket';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { ResultadoAnalise, ResultadoTriagem } from '@/types/resultado';

export default function ResultadoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [resultado] = useState<ResultadoAnalise | null>(() => {
    if (typeof window !== 'undefined') {
      const deSessao = sessionStorage.getItem('fluxo_saude_resultado');
      if (deSessao) {
        try {
          return JSON.parse(deSessao);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const converterParaTriagem = (res: ResultadoAnalise): ResultadoTriagem => ({
    tipoRecomendado: res.resultado,
    titulo: res.titulo,
    descricao: res.mensagemCurta,
    instrucoes: res.orientacoesAcao,
    classificacaoCor: res.resultado === 'SAMU' ? 'VERMELHO' : res.resultado === 'UPA' ? 'AMARELO' : 'VERDE',
  });

  if (!resultado) {
    const resultadoPadrao: ResultadoAnalise = {
      resultado: 'UBS',
      titulo: '🩺 UBS — Unidade Básica de Saúde',
      subtitulo: 'Orientação inicial de acompanhamento para cuidados de saúde.',
      mensagemCurta: 'Para agendamento de consultas, vacinação e exames de rotina, dirija-se à Unidade Básica de Saúde mais próxima do seu bairro.',
      explicacaoRespostas: [
        'Nenhum sinal de alerta agudo de emergência foi identificado.',
        'Sua demanda se enquadra na atenção primária do SUS.',
      ],
      orientacoesAcao: [
        'Procure a UBS com documento oficial com foto e Cartão SUS.',
        'Consulte os horários de funcionamento da sua unidade municipal.',
        'Caso tenha dor forte ou febre alta repentina, procure uma UPA 24h.',
      ],
      respostasProcessadas: [],
      dataHora: mounted ? new Date().toLocaleString('pt-BR') : '—',
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <ResultCard resultado={resultadoPadrao} />
        <PreTriageTicket resultado={converterParaTriagem(resultadoPadrao)} />
        <DisclaimerBanner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <ResultCard resultado={resultado} />
      <PreTriageTicket resultado={converterParaTriagem(resultado)} />
      <DisclaimerBanner />
    </div>
  );
}
