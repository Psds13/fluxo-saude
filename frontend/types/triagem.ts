export type TipoResposta = 'SIM' | 'NAO' | 'DUVIDA';

export type TipoResultado = 'UBS' | 'UPA' | 'SAMU';

export interface Pergunta {
  id: number;
  texto: string;
  subtexto?: string;
  ordem: number;
  ativa: boolean;
  categoria?: 'emergencia' | 'sintoma' | 'evolucao' | 'geral';
  icone?: string;
}

export interface RegraTriagem {
  id: number;
  perguntaId: number;
  resposta: TipoResposta;
  resultado: TipoResultado;
  prioridade: number; // 1 = Urgência Máxima (SAMU), 2 = UPA, 3 = UBS
  mensagemOrientacao: string;
  sinalDeAlertaIdentificado?: string;
}

export interface RespostaUsuario {
  perguntaId: number;
  perguntaTexto: string;
  resposta: TipoResposta;
}
