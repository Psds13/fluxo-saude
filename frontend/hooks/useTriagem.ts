'use client';

import { useState, useEffect } from 'react';
import { Pergunta, RespostaUsuario, TipoResposta, TipoResultado } from '../types/triagem';
import { ResultadoAnalise } from '../types/resultado';
import { triagemService } from '../services/triagemService';
import { useRouter } from 'next/navigation';

export function useTriagem() {
  const router = useRouter();
  const [perguntas] = useState<Pergunta[]>(() => triagemService.getPerguntasAtivas());
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [respostas, setRespostas] = useState<RespostaUsuario[]>([]);
  const [carregando] = useState<boolean>(false);
  const [resultadoFinal, setResultadoFinal] = useState<ResultadoAnalise | null>(null);

  const perguntaAtual = perguntas[indiceAtual];
  const totalPerguntas = perguntas.length;
  const porcentagemProgresso = Math.round(((indiceAtual + 1) / totalPerguntas) * 100);

  const responderPergunta = (tipoResposta: TipoResposta) => {
    if (!perguntaAtual) return;

    const novaResposta: RespostaUsuario = {
      perguntaId: perguntaAtual.id,
      perguntaTexto: perguntaAtual.texto,
      resposta: tipoResposta,
    };

    const novasRespostas = [...respostas, novaResposta];
    setRespostas(novasRespostas);

    // 1. Verificar Triagem Adaptativa: Se for resposta positiva para sintoma de risco crítico (ex: perda de consciência ou falta de ar grave), interromper e ir para resultado SAMU/UPA imediatamente
    if (tipoResposta === 'SIM') {
      const alertaImediato = triagemService.verificarAlertaImediato(perguntaAtual.id, 'SIM');
      if (alertaImediato === 'SAMU') {
        const analise = triagemService.analisarRespostas(novasRespostas);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('fluxo_saude_resultado', JSON.stringify(analise));
        }
        router.push('/resultado');
        return;
      }
    }

    // 2. Se for a última pergunta ou se o usuário escolheu ir para atendimento direto em caso de dúvida
    if (indiceAtual + 1 >= totalPerguntas || tipoResposta === 'DUVIDA') {
      const analise = triagemService.analisarRespostas(novasRespostas);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('fluxo_saude_resultado', JSON.stringify(analise));
      }
      router.push('/resultado');
    } else {
      setIndiceAtual((prev) => prev + 1);
    }
  };

  const voltarPergunta = () => {
    if (indiceAtual > 0) {
      setIndiceAtual((prev) => prev - 1);
      setRespostas((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const reiniciarTriagem = () => {
    setIndiceAtual(0);
    setRespostas([]);
    setResultadoFinal(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('fluxo_saude_resultado');
    }
  };

  return {
    perguntaAtual,
    indiceAtual,
    totalPerguntas,
    porcentagemProgresso,
    carregando,
    responderPergunta,
    voltarPergunta,
    reiniciarTriagem,
    resultadoFinal,
  };
}
