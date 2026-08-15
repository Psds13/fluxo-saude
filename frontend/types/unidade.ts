export type TipoUnidade = 'UBS' | 'UPA' | 'HOSPITAL';

export type StatusUnidade = 
  | 'ABERTA' 
  | 'ATENDIMENTO_ALTERADO' 
  | 'FECHADA' 
  | 'SERVICO_INDISPONIVEL';

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  categoria?: string;
  icone?: string;
}

export interface Unidade {
  id: number;
  tenantId?: string;
  nome: string;
  tipo: TipoUnidade;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude: number;
  longitude: number;
  distanciaKm?: number;
  telefone: string;
  telefoneEmergencia?: string;
  horarioFuncionamento: string;
  status: StatusUnidade;
  statusDescricao?: string;
  ultimaAtualizacao: string; // DD/MM/AAAA HH:MM
  ativo: boolean;
  servicos: Servico[];
  linhasOnibus?: string[];
  referencia?: string;
}

export interface FiltroUnidade {
  tipo?: TipoUnidade | 'TODAS';
  bairro?: string;
  servicoId?: number;
  apenasAbertas?: boolean;
  busca?: string;
}
