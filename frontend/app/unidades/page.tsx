'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchUnit from '@/components/SearchUnit';
import UnitCard from '@/components/UnitCard';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { useUnits } from '@/hooks/useUnits';
import { useTenant } from '@/components/TenantContext';
import { TipoUnidade } from '@/types/unidade';
import { Building2, AlertCircle } from 'lucide-react';

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
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-8 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full"></div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
            <Building2 className="w-3.5 h-3.5" />
            <span>Rede Pública — {tenantAtual.nome}</span>
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Unidades de Saúde Cadastradas
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-3xl leading-relaxed">
          Encontre os postos de saúde (UBS), unidades de pronto atendimento (UPA 24h) e hospitais de referência no seu município. Verifique horários, telefones e status de funcionamento.
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shrink-0 transition-colors"
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
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-12 rounded-3xl text-center space-y-4 border-2 border-blue-200 shadow-sm max-w-xl mx-auto">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl border-2 border-blue-200">
            🔍
          </div>
          <h3 className="font-black text-slate-800 text-lg">Nenhuma unidade encontrada</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Não encontramos unidades para a pesquisa &quot;{filtro.busca}&quot;. Tente outro termo ou escolha um filtro diferente.
          </p>
          <button
            onClick={() => aplicarFiltro({ busca: '', tipo: 'TODAS', apenasAbertas: false })}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md active:scale-95"
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
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
