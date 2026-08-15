import { triagemService } from './triagemService';
import { unidadeService } from './unidadeService';
import { TipoUnidade, FiltroUnidade } from '../types/unidade';
import { RespostaUsuario } from '../types/triagem';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const api = {
  // Triagem REST endpoints
  getPerguntas: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/triagem/perguntas`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback gracioso para dados locais quando backend não estiver rodando
    }
    return triagemService.getPerguntasAtivas();
  },

  analisarTriagem: async (respostas: RespostaUsuario[]) => {
    try {
      const res = await fetch(`${API_BASE_URL}/triagem/analisar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return triagemService.analisarRespostas(respostas);
  },

  // Unidades REST endpoints
  getUnidades: async (filtro?: FiltroUnidade, tenantId?: string) => {
    try {
      const queryParams = new URLSearchParams();
      if (filtro?.tipo) queryParams.append('tipo', filtro.tipo);
      if (filtro?.busca) queryParams.append('busca', filtro.busca);
      if (tenantId) queryParams.append('tenantId', tenantId);

      const res = await fetch(`${API_BASE_URL}/unidades?${queryParams.toString()}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return unidadeService.getUnidades(filtro, tenantId);
  },

  getUnidadePorId: async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/unidades/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return unidadeService.getUnidadePorId(id);
  },

  getUnidadesProximas: async (lat: number, lng: number, tipo?: TipoUnidade) => {
    try {
      const queryParams = new URLSearchParams({ lat: String(lat), lng: String(lng) });
      if (tipo) queryParams.append('tipo', tipo);
      const res = await fetch(`${API_BASE_URL}/unidades/proximas?${queryParams.toString()}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return unidadeService.getUnidadesProximas(lat, lng, tipo);
  },
};
