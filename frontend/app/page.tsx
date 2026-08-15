'use client';

import React, { useState } from 'react';
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
  PhoneCall,
  MapPin,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
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
      <section className="relative bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 overflow-hidden border-b border-sky-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-600/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          
          {/* Badge do Município Selecionado (SaaS) */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md border border-white/20">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Plataforma Oficial de Orientação — {tenantAtual.nome}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-sky-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Navegação Gratuita no SUS</span>
            </div>
          </div>

          {/* Cabeçalho Principal com Logo */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {t('onde_devo_procurar', 'Onde devo procurar atendimento?')}
              </h1>
              <p className="text-sky-100 text-base md:text-xl font-normal leading-relaxed">
                {t('responda_perguntas', 'Responda algumas perguntas e descubra qual serviço de saúde pode ser mais adequado para sua situação na rede municipal.')}
              </p>
            </div>

            {/* Logo em destaque no Hero */}
            <div className="hidden lg:flex items-center gap-3 bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/15 shrink-0 shadow-2xl">
              <Image
                src="/Fluxo-saude.png"
                alt="Logo Fluxo Saúde"
                width={80}
                height={80}
                className="object-contain drop-shadow-md"
              />
              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  Sistema Digital
                </span>
                <p className="text-lg font-black text-white">Fluxo Saúde</p>
                <p className="text-[11px] text-slate-300">Atenção Básica e Urgência</p>
              </div>
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
              icone={<HelpCircle className="w-8 h-8 text-sky-600" />}
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
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Guia Rápido do Cidadão
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Entenda antes de ir
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Os serviços de saúde pública fazem parte de uma rede integrada. Cada unidade tem uma função específica para melhor atender a população.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card UBS */}
            <div className="bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-xs hover:shadow-lg transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xl border border-emerald-200">
                🩺
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                UBS — Unidade Básica
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Porta de entrada da atenção básica. Voltada para consultas agendadas, vacinação, pré-natal, curativos, receitas e prevenção continuada.
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-700">
                ✓ Atendimento no bairro
              </div>
            </div>

            {/* Card UPA */}
            <div className="bg-white p-6 rounded-3xl border-2 border-rose-100 shadow-xs hover:shadow-lg transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-black text-xl border border-rose-200">
                🚨
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                UPA — Pronto Atendimento
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Serviço 24h destinado a situações de urgência e emergência sem risco imediato de morte, como febre alta repentina, cólica forte e pequenos traumas.
              </p>
              <div className="pt-2 text-[11px] font-bold text-rose-700">
                ✓ Atendimento 24 horas
              </div>
            </div>

            {/* Card SAMU */}
            <div className="bg-white p-6 rounded-3xl border-2 border-red-100 shadow-xs hover:shadow-lg transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center font-black text-xl border border-red-200">
                🚑
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                SAMU — Emergência 192
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Atendimento móvel acionado pelo número 192 em situações de risco imediato à vida, como perda de consciência, parada respiratória e acidentes graves.
              </p>
              <div className="pt-2 text-[11px] font-bold text-red-700">
                ✓ Socorro móvel 192
              </div>
            </div>

            {/* Card Hospital */}
            <div className="bg-white p-6 rounded-3xl border-2 border-sky-100 shadow-xs hover:shadow-lg transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-black text-xl border border-sky-200">
                🏥
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Hospital Público
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Destinado a cirurgias, internações e atendimentos de alta complexidade, geralmente encaminhados pelas UPAs ou emergências via SAMU.
              </p>
              <div className="pt-2 text-[11px] font-bold text-sky-700">
                ✓ Alta complexidade
              </div>
            </div>

          </div>

          <div className="text-center pt-2">
            <Link
              href="/diferenca"
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-800 underline decoration-2 underline-offset-4"
            >
              <Info className="w-4 h-4" />
              <span>Ver comparativo completo entre os serviços de saúde</span>
            </Link>
          </div>
        </section>

        {/* Localização das Unidades */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Rede de Atendimento — {tenantAtual.nome}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                Unidades de Saúde Próximas
              </h2>
              <p className="text-slate-600 text-sm">
                Consulte horários, telefones, serviços disponíveis e status atualizado das unidades.
              </p>
            </div>

            <Link
              href="/unidades"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm"
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
                className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl"
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
        <section className="bg-gradient-to-br from-slate-900 to-sky-950 text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-6 border border-slate-800">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              Plataforma SaaS para Órgãos Públicos
            </span>
            <h2 className="text-2xl md:text-4xl font-black">
              Leve o Fluxo Saúde para a sua Secretaria Municipal
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              O Fluxo Saúde oferece um ambiente multi-tenant completo para prefeituras e redes estaduais gerenciarem informações de unidades, horários, serviços e orientações à população em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-200">
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              ✓ Painel do Gestor Municipal
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              ✓ Status de Funcionamento em Tempo Real
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              ✓ Triagem Adaptativa e Indicadores de Uso
            </div>
          </div>

          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm transition shadow-lg"
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
