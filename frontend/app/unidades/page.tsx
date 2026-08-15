'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchUnit from '@/components/SearchUnit';
import UnitCard from '@/components/UnitCard';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { useUnits } from '@/hooks/useUnits';
import { useTenant } from '@/components/TenantContext';
import { TipoUnidade } from '@/types/unidade';
import { MapPin, Building2, AlertCircle } from 'lucide-react';

function UnidadesContent() {
  const searchParams = useSearchParams();
  const tipoParam = (searchParams.get('tipo') as TipoUnidade) || 'TODAS';

  const { tenantAtual } = useTenant();
  const {
    unidades,
    carregando,
    filtro,
    aplicarFiltro,
    obterMinhaLocalizacao,
    obtendoLocalizacao,
    erroLocalizacao,
    recarregar,
  } = useUnits({ tipo: tipoParam });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner da Página */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold border border-sky-200">
          <Building2 className="w-3.5 h-3.5" />
          <span>Rede Pública — {tenantAtual.nome}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Unidades de Saúde Cadastradas
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-3xl">
          Encontre os postos de saúde (UBS), unidades de pronto atendimento (UPA 24h) e hospitais de referência no seu município.
        </p>
      </div>

      {/* Componente de Busca & Geolocalização */}
      <SearchUnit
        busca={filtro.busca || ''}
        onBuscaChange={(termo) => aplicarFiltro({ busca: termo })}
        tipoSelecionado={filtro.tipo || 'TODAS'}
        onTipoChange={(tipo) => aplicarFiltro({ tipo })}
        onUsarLocalizacao={() => obterMinhaLocalizacao()}
        obtendoLocalizacao={obtendoLocalizacao}
        apenasAbertas={!!filtro.apenasAbertas}
        onApenasAbertasChange={(val) => aplicarFiltro({ apenasAbertas: val })}
      />

      {erroLocalizacao && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{erroLocalizacao}</span>
          </div>
          <button
            onClick={() => recarregar()}
            className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold text-xs shrink-0"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Lista de Resultados */}
      {carregando ? (
        <div className="py-16 text-center text-slate-500 font-medium">
          Carregando unidades de saúde...
        </div>
      ) : unidades.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl text-center space-y-4 border-2 border-slate-200 shadow-sm max-w-xl mx-auto">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-xl">
            📍
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Nenhuma unidade encontrada</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Não encontramos resultados com os filtros selecionados. Tente mudar o bairro, remover o filtro de "Apenas Abertas" ou buscar por outro endereço.
          </p>
          <button
            onClick={() => aplicarFiltro({ busca: '', tipo: 'TODAS', apenasAbertas: false })}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unidades.map((unidade) => (
            <UnitCard key={unidade.id} unidade={unidade} />
          ))}
        </div>
      )}

      <DisclaimerBanner />
    </div>
  );
}

export default function UnidadesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-medium">Carregando unidades...</div>}>
      <UnidadesContent />
    </Suspense>
  );
}
