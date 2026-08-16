import { Unidade, FiltroUnidade, TipoUnidade } from '../types/unidade';
import { MOCK_UNIDADES } from './mockData';

export const unidadeService = {
  getUnidades: (filtro?: FiltroUnidade, tenantId?: string): Unidade[] => {
    let resultado = [...MOCK_UNIDADES];

    if (tenantId) {
      resultado = resultado.filter((u) => !u.tenantId || u.tenantId === tenantId);
    }

    if (!filtro) return resultado;

    if (filtro.tipo && filtro.tipo !== 'TODAS') {
      resultado = resultado.filter((u) => u.tipo === filtro.tipo);
    }

    if (filtro.apenasAbertas) {
      resultado = resultado.filter((u) => u.status === 'ABERTA' || u.status === 'ATENDIMENTO_ALTERADO');
    }

    if (filtro.busca && filtro.busca.trim() !== '') {
      const termo = filtro.busca.toLowerCase().trim();
      resultado = resultado.filter(
        (u) =>
          u.nome.toLowerCase().includes(termo) ||
          u.bairro.toLowerCase().includes(termo) ||
          u.cidade.toLowerCase().includes(termo) ||
          u.endereco.toLowerCase().includes(termo) ||
          u.servicos.some((s) => s.nome.toLowerCase().includes(termo))
      );
    }

    return resultado;
  },

  getUnidadePorId: (id: number): Unidade | undefined => {
    return MOCK_UNIDADES.find((u) => u.id === id);
  },

  getUnidadesProximas: (lat: number, lng: number, tipo?: TipoUnidade): Unidade[] => {
    // Calculo simples de distância aproximada em KM (Haversine Formula)
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371; // Raio da Terra em KM

    const unidadesComDistancia = MOCK_UNIDADES.map((u) => {
      const dLat = toRad(u.latitude - lat);
      const dLng = toRad(u.longitude - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) * Math.cos(toRad(u.latitude)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;

      return {
        ...u,
        distanciaKm: Number(d.toFixed(1)),
      };
    });

    let resultado = unidadesComDistancia.sort((a, b) => (a.distanciaKm || 0) - (b.distanciaKm || 0));

    if (tipo) {
      resultado = resultado.filter((u) => u.tipo === tipo);
    }

    return resultado;
  },
};
