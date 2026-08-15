import { Pergunta, RespostaUsuario, TipoResultado } from '../types/triagem';
import { ResultadoAnalise } from '../types/resultado';
import { MOCK_PERGUNTAS, MOCK_REGRAS } from './mockData';

export const triagemService = {
  getPerguntasAtivas: (): Pergunta[] => {
    return MOCK_PERGUNTAS.filter((p) => p.ativa).sort((a, b) => a.ordem - b.ordem);
  },

  analisarRespostas: (respostas: RespostaUsuario[]): ResultadoAnalise => {
    // 1. Procurar por alertas críticos de prioridade 1 (SAMU)
    const respostaSamu = respostas.find((r) => {
      const regra = MOCK_REGRAS.find((rg) => rg.perguntaId === r.perguntaId && rg.resposta === r.resposta);
      return regra && regra.resultado === 'SAMU';
    });

    if (respostaSamu) {
      const regra = MOCK_REGRAS.find((rg) => rg.perguntaId === respostaSamu.perguntaId && rg.resposta === respostaSamu.resposta)!;
      return {
        resultado: 'SAMU',
        titulo: '🚑 SAMU 192 — Atendimento de Emergência',
        subtitulo: 'Atenção: Os sinais relatados indicam risco imediato à vida ou necessidade de socorro urgente.',
        mensagemCurta: 'Acione o serviço de emergência SAMU 192 ou dirija-se imediatamente ao pronto socorro hospitalar mais próximo.',
        explicacaoRespostas: [
          regra.sinalDeAlertaIdentificado || 'Foi identificado um sinal de alerta de emergência médica durante a resposta às perguntas.',
        ],
        orientacoesAcao: [
          'Ligue imediatamente para o 192 (SAMU) se a pessoa estiver inconsciente ou com parada respiratória.',
          'Mantenha a pessoa calma, em local seguro e agasalhada.',
          'Não administre nenhum remédio ou alimento por conta própria antes da chegada do socorro.',
          'Se puder se deslocar em segurança, procure o Hospital ou UPA com atendimento 24h mais próximo.',
        ],
        respostasProcessadas: respostas,
        dataHora: new Date().toLocaleString('pt-BR'),
      };
    }

    // 2. Procurar por alertas de prioridade 2 (UPA)
    const respostasUpa = respostas.filter((r) => {
      const regra = MOCK_REGRAS.find((rg) => rg.perguntaId === r.perguntaId && rg.resposta === r.resposta);
      return regra && regra.resultado === 'UPA';
    });

    if (respostasUpa.length > 0) {
      const explicacoes = respostasUpa.map((r) => {
        const regra = MOCK_REGRAS.find((rg) => rg.perguntaId === r.perguntaId && rg.resposta === r.resposta);
        return regra?.sinalDeAlertaIdentificado || `Resposta "${r.perguntaTexto}" indicou necessidade de avaliação rápida.`;
      });

      return {
        resultado: 'UPA',
        titulo: '🚨 UPA 24h — Pronto Atendimento e Urgência',
        subtitulo: 'Orientação: A situação descrita pode exigir avaliação médica presencial rápida.',
        mensagemCurta: 'A UPA (Unidade de Pronto Atendimento) é o serviço indicado para quadros agudos que necessitam de exame rápido e estabilização.',
        explicacaoRespostas: explicacoes,
        orientacoesAcao: [
          'Dirija-se a uma UPA 24h para avaliação por profissional de saúde.',
          'Leve um documento oficial com foto e o Cartão SUS (se disponível).',
          'O atendimento na UPA é realizado por ordem de gravidade (Classificação de Risco), e não apenas por ordem de chegada.',
          'Caso apresente piora súbita no caminho, ligue para o SAMU 192.',
        ],
        respostasProcessadas: respostas,
        dataHora: new Date().toLocaleString('pt-BR'),
      };
    }

    // 3. Caso não haja alertas de urgência -> Recomendação de UBS
    return {
      resultado: 'UBS',
      titulo: '🩺 UBS — Unidade Básica de Saúde',
      subtitulo: 'Orientação: A situação relatada pode ser acompanhada pela equipe de atenção básica.',
      mensagemCurta: 'A UBS (Posto de Saúde) é o serviço mais adequado para consultas, prevenção, acompanhamento de sintomas leves e cuidados de rotina.',
      explicacaoRespostas: [
        'Nenhum sinal de emergência imediata foi identificado nas suas respostas.',
        'Seus sintomas indicam a necessidade de cuidado preventivo, consulta médica agendada ou acompanhamento por equipe multiprofissional da UBS.',
      ],
      orientacoesAcao: [
        'Procure a UBS do seu bairro para acolhimento e agendamento de consulta.',
        'Leve documento com foto, comprovante de residência e Cartão SUS.',
        'Na UBS você pode vacinar, realizar testes rápidos, trocar receita de medicação e fazer acompanhamento continuado.',
        'Se os sintomas mudarem ou piorarem repentinamente, procure uma UPA 24h.',
      ],
      respostasProcessadas: respostas,
      dataHora: new Date().toLocaleString('pt-BR'),
    };
  },

  verificarAlertaImediato: (perguntaId: number, resposta: string): TipoResultado | null => {
    const regra = MOCK_REGRAS.find((r) => r.perguntaId === perguntaId && r.resposta === resposta);
    if (regra && (regra.resultado === 'SAMU' || regra.prioridade === 1)) {
      return 'SAMU';
    }
    return null;
  },
};
