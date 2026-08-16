import { TipoResultado, RespostaUsuario } from './triagem';

export interface ResultadoAnalise {
  resultado: TipoResultado;
  titulo: string;
  subtitulo: string;
  mensagemCurta: string;
  explicacaoRespostas: string[];
  orientacoesAcao: string[];
  respostasProcessadas: RespostaUsuario[];
  dataHora: string;
}

export interface ResultadoTriagem {
  tipoRecomendado: string;
  titulo: string;
  descricao: string;
  instrucoes: string[];
  classificacaoCor: 'VERMELHO' | 'AMARELO' | 'VERDE' | 'AZUL';
}