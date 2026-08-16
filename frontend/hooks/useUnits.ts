'use client';

import { useState, useEffect, useCallback } from 'react';
import { Unidade, FiltroUnidade, TipoUnidade } from '../types/unidade';
import { unidadeService } from '../services/unidadeService';
import { useTenant } from '../components/TenantContext';

export function useUnits(filtroInicial?: FiltroUnidade) {
  const { tenantAtual } = useTenant();
  const [unidades, setUnidades] = useState<Unidade[]>(() => 
    unidadeService.getUnidades(filtroInicial || {}, tenantAtual.id)
  );
  const [carregando, setCarregando] = useState<boolean>(false);
  const [localizacaoAutorizada, setLocalizacaoAutorizada] = useState<boolean>(false);
  const [obtendoLocalizacao, setObtendoLocalizacao] = useState<boolean>(false);
  const [erroLocalizacao, setErroLocalizacao] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<FiltroUnidade>(filtroInicial || {});

  const aplicarFiltro = useCallback((novoFiltro: Partial<FiltroUnidade>) => {
    setFiltro((prev) => {
      const atualizado = { ...prev, ...novoFiltro };
      const lista = unidadeService.getUnidades(atualizado, tenantAtual.id);
      setUnidades(lista);
      return atualizado;
    });
  }, [tenantAtual.id]);

  const obterMinhaLocalizacao = (tipo?: TipoUnidade) => {
    if (!navigator.geolocation) {
      setErroLocalizacao('Geolocalização não é suportada pelo seu navegador.');
      return;
    }

    setObtendoLocalizacao(true);
    setErroLocalizacao(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocalizacaoAutorizada(true);
        setObtendoLocalizacao(false);
        const proximas = unidadeService.getUnidadesProximas(latitude, longitude, tipo);
        setUnidades(proximas);
      },
      (error) => {
        setObtendoLocalizacao(false);
        setLocalizacaoAutorizada(false);
        if (error.code === error.PERMISSION_DENIED) {
          setErroLocalizacao('Permissão de localização negada pelo usuário. Você pode buscar por bairro ou endereço.');
        } else {
          setErroLocalizacao('Não foi possível obter sua localização exata no momento. Mostrando unidades cadastradas.');
        }
      },
      { timeout: 10000 }
    );
  };

  return {
    unidades,
    carregando,
    filtro,
    aplicarFiltro,
    obterMinhaLocalizacao,
    obtendoLocalizacao,
    localizacaoAutorizada,
    erroLocalizacao,
    recarregar: () => aplicarFiltro({}),
  };
}
