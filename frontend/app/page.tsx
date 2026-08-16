'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import EmergencyAlert from '@/components/EmergencyAlert';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import UnitCard from '@/components/UnitCard';
import SearchUnit from '@/components/SearchUnit';
import InteractiveMap from '@/components/InteractiveMap';
import MedicineSearch from '@/components/MedicineSearch';
import { useUnits } from '@/hooks/useUnits';
import { useTenant } from '@/components/TenantContext';
import {
  Stethoscope,
  Siren,
  HelpCircle,
  Building2,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { useAccessibility } from '@/components/AccessibilityContext';

export default function HomePage() {
  const { tenantAtual } = useTenant();
  const { t } = useAccessibility();
  const {
    unidades,
    carregando,
    filtro,
    aplicarFiltro,
    obterMinhaLocalizacao,
    obtendoLocalizacao,
    erroLocalizacao,
  } = useUnits();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section Oficial do Fluxo Saúde */}
      <section className="relative bg-linear-to-br from-[#e8f8ff] via-[#f0f9ff] to-[#e6f8f3] text-slate-900 pt-10 pb-16 px-4 overflow-hidden border-b border-cyan-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,113,188,0.10),transparent_30%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(16,185,129,0.06),transparent_28%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 text-slate-800 text-xs font-semibold backdrop-blur-md border border-cyan-200 shadow-sm">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Plataforma Oficial de Orientação — {tenantAtual.nome}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Navegação Gratuita no SUS</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-[#171E54]">
                {t('onde_devo_procurar', 'Onde devo procurar')} <span className="text-[#0071BC]">atendimento?</span>
              </h1>
              <p className="text-[#557084] text-base md:text-xl font-medium leading-relaxed">
                {t('responda_perguntas', 'Responda algumas perguntas e descubra qual serviço de saúde pode ser mais adequado para sua situação na rede municipal.')}
              </p>
            </div>

            {/* Foto Hero */}
            <div className="hidden lg:block shrink-0 relative">
              <div className="absolute inset-0 bg-linear-to-br from-[#0071BC]/15 to-emerald-400/10 rounded-3xl blur-2xl scale-110" />
              <Image
                src="/hero-photo.png"
                alt="Profissional de saúde atendendo paciente"
                width={400}
                height={300}
                className="object-cover rounded-3xl drop-shadow-2xl relative z-10"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </div>
          </div>

          {/* Banners de Opções Principais (NO COMECroutes DA TELA: UPA, UBS, NÃO SEI) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            {/* Opção 1: 🚨 UPA */}
            <ServiceCard
              titulo="Urgência e Emergência — UPA 24h"
              subtitulo="Avaliação Rápida"
              descricao="Para situações que precisam de avaliação médica rápida, sintomas agudos ou dor intensa que surgiram de repente."
              icone={<Siren className="w-8 h-8 text-rose-600" />}
              variante="upa"
              href="/unidades?tipo=UPA"
              tagPopular="Pronto Socorro 24h"
            />

            {/* Opção 2: 🩺 UBS */}
            <ServiceCard
              titulo="Consultas e Serviços — UBS"
              subtitulo="Atenção Básica"
              descricao="Para consultas de rotina, vacinação, acompanhamento de pressão/diabetes, curativos, receitas e prevenção."
              icone={<Stethoscope className="w-8 h-8 text-emerald-600" />}
              variante="ubs"
              href="/unidades?tipo=UBS"
              tagPopular="Posto de Saúde"
            />

            {/* Opção 3: ❓ NÃO SEI QUAL ESCOLHER */}
            <ServiceCard
              titulo="Não sei qual escolher"
              subtitulo="Orientação Guiada"
              descricao="Responda algumas perguntas simples para receber uma orientação sobre qual serviço procurar."
              icone={<HelpCircle className="w-8 h-8 text-blue-600" />}
              variante="duvida"
              href="/triagem"
              tagPopular="Triagem Rápida"
            />

          </div>

          {/* Opção 4: 🚑 Emergência Direta SAMU */}
          <div className="pt-2">
            <EmergencyAlert />
          </div>

        </div>
      </section>

      {/* Container do Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 space-y-16">

        {/* Disclaimer Oficial */}
        <DisclaimerBanner />

        {/* Mapa Interativo de Unidades com GPS e Rotas */}
        <section>
          <InteractiveMap unidades={unidades} />
        </section>

        {/* Buscador de Estoque de Medicamentos do SUS */}
        <section>
          <MedicineSearch />
        </section>

        {/* Seção 11: "Entenda antes de ir" */}
        <section className="space-y-8 pt-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-8 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full"></div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Saúde Pública Organizada
              </span>
              <div className="h-1 w-8 bg-linear-to-l from-cyan-500 to-blue-600 rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Entenda os Serviços Disponíveis
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              A rede de atenção à saúde funciona de forma integrada. Cada serviço tem um propósito específico: da prevenção ao atendimento de emergência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card UBS */}
            <div className="bg-white rounded-3xl border-2 border-cyan-100 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all duration-300 overflow-hidden group">
              <div className="relative h-36 overflow-hidden bg-cyan-50">
                <Image
                  src="/ubs-illustration.png"
                  alt="Unidade Básica de Saúde - UBS"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/30 to-transparent" />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  UBS — Unidade Básica
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Porta de entrada da atenção básica. Voltada para consultas agendadas, vacinação, pré-natal, curativos, receitas e prevenção continuada.
                </p>
                <div className="pt-1 text-[11px] font-bold text-cyan-700">
                  ✓ Atendimento no bairro
                </div>
              </div>
            </div>

            {/* Card UPA */}
            <div className="bg-white rounded-3xl border-2 border-rose-100 shadow-sm hover:shadow-lg hover:border-rose-300 transition-all duration-300 overflow-hidden group">
              <div className="relative h-36 overflow-hidden bg-rose-50">
                <Image
                  src="/upa-illustration.png"
                  alt="Unidade de Pronto Atendimento - UPA"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/30 to-transparent" />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  UPA — Pronto Atendimento
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Serviço 24h destinado a situações de urgência e emergência sem risco imediato de morte, como febre alta repentina, cólica forte e pequenos traumas.
                </p>
                <div className="pt-1 text-[11px] font-bold text-rose-700">
                  ✓ Atendimento 24 horas
                </div>
              </div>
            </div>

            {/* Card SAMU */}
            <div className="bg-white rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-lg hover:border-red-300 transition-all duration-300 overflow-hidden group">
              <div className="relative h-36 overflow-hidden bg-red-50">
                <Image
                  src="/samu-illustration.png"
                  alt="SAMU - Serviço de Atendimento Móvel de Urgência"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/30 to-transparent" />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  SAMU — Emergência 192
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Atendimento móvel acionado pelo número 192 em situações de risco imediato à vida, como perda de consciência, parada respiratória e acidentes graves.
                </p>
                <div className="pt-1 text-[11px] font-bold text-red-700">
                  ✓ Socorro móvel 192
                </div>
              </div>
            </div>

            {/* Card Hospital */}
            <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden group">
              <div className="relative h-36 overflow-hidden bg-blue-50">
                <Image
                  src="/hospital-illustration.png"
                  alt="Hospital Público"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/30 to-transparent" />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Hospital Público
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Destinado a cirurgias, internações e atendimentos de alta complexidade, geralmente encaminhados pelas UPAs ou emergências via SAMU.
                </p>
                <div className="pt-1 text-[11px] font-bold text-blue-700">
                  ✓ Alta complexidade
                </div>
              </div>
            </div>

          </div>

          <div className="text-center pt-4">
            <Link
              href="/diferenca"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors underline decoration-2 underline-offset-4"
            >
              <Info className="w-4 h-4" />
              <span>Ver comparativo completo entre os serviços de saúde</span>
            </Link>
          </div>
        </section>

        {/* Localização das Unidades */}
        <section className="space-y-6 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                Rede de Atendimento — {tenantAtual.nome}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-3">
                Unidades de Saúde Próximas
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Consulte horários, telefones, serviços disponíveis e status atualizado das unidades.
              </p>
            </div>

            <Link
              href="/unidades"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Ver Todas as Unidades</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Widget de Busca e Geolocalização */}
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
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium">
              ⚠️ {erroLocalizacao}
            </div>
          )}

          {/* Lista de Cards de Unidades */}
          {carregando ? (
            <div className="p-12 text-center text-slate-500 font-medium">
              Carregando unidades de saúde...
            </div>
          ) : unidades.length === 0 ? (
            <div className="bg-slate-100 p-8 rounded-3xl text-center space-y-3 border border-slate-200">
              <p className="font-bold text-slate-800 text-base">Nenhuma unidade encontrada</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Não encontramos unidades para o termo pesquisado. Tente buscar por outro bairro ou limpe os filtros.
              </p>
              <button
                onClick={() => aplicarFiltro({ busca: '', tipo: 'TODAS', apenasAbertas: false })}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unidades.slice(0, 6).map((unidade) => (
                <UnitCard key={unidade.id} unidade={unidade} />
              ))}
            </div>
          )}
        </section>

        {/* Seção SaaS Institucional para Municípios e Secretarias */}
        <section className="bg-linear-to-br from-blue-950 via-blue-900 to-emerald-950 text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-6 border border-blue-800">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              Plataforma SaaS para Órgãos Públicos
            </span>
            <h2 className="text-2xl md:text-4xl font-black">
              Leve o Fluxo Saúde para a sua Secretaria Municipal
            </h2>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed">
              O Fluxo Saúde oferece um ambiente multi-tenant completo para prefeituras e redes estaduais gerenciarem informações de unidades, horários, serviços e orientações à população em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-100">
            <div className="bg-blue-800/40 p-4 rounded-2xl border border-blue-700/50 hover:bg-blue-800/60 transition">
              ✓ Painel do Gestor Municipal
            </div>
            <div className="bg-blue-800/40 p-4 rounded-2xl border border-blue-700/50 hover:bg-blue-800/60 transition">
              ✓ Status de Funcionamento em Tempo Real
            </div>
            <div className="bg-blue-800/40 p-4 rounded-2xl border border-blue-700/50 hover:bg-blue-800/60 transition">
              ✓ Triagem Adaptativa e Indicadores de Uso
            </div>
          </div>

          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm transition shadow-lg active:scale-95"
            >
              <span>Acessar Demonstração do Painel do Gestor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
