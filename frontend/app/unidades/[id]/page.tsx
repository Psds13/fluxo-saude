'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { unidadeService } from '@/services/unidadeService';
import UnitStatusBadge from '@/components/UnitStatusBadge';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import {
  MapPin,
  Clock,
  Navigation,
  Bus,
  ArrowLeft,
  CalendarCheck,
  CheckCircle,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetalheUnidadePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const unidadeId = parseInt(resolvedParams.id, 10);
  const unidade = unidadeService.getUnidadePorId(unidadeId);

  if (!unidade) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Unidade não encontrada</h2>
        <p className="text-slate-600 text-sm">A unidade solicitada não existe ou foi desativada.</p>
        <Link href="/unidades" className="inline-block px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold">
          Voltar para Unidades
        </Link>
      </div>
    );
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${unidade.nome}, ${unidade.endereco}, ${unidade.numero}, ${unidade.bairro}, ${unidade.cidade}`
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Voltar */}
      <Link
        href="/unidades"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para busca de unidades</span>
      </Link>

      {/* Card Principal de Detalhes da Unidade */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 shadow-xl overflow-hidden space-y-8">
        
        {/* Cabeçalho da Unidade */}
        <div className="bg-linear-to-r from-sky-900 via-sky-800 to-emerald-800 text-white p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                unidade.tipo === 'UPA'
                  ? 'bg-rose-500 text-white'
                  : unidade.tipo === 'UBS'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-sky-500 text-white'
              }`}
            >
              {unidade.tipo === 'UBS' ? '🩺 UBS / Posto de Saúde' : unidade.tipo === 'UPA' ? '🚨 UPA 24h — Pronto Atendimento' : '🏥 Hospital público'}
            </span>

            <UnitStatusBadge status={unidade.status} />
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {unidade.nome}
          </h1>

          <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              {unidade.endereco}, nº {unidade.numero} — Bairro {unidade.bairro}, {unidade.cidade}/{unidade.estado} — CEP {unidade.cep}
            </span>
          </div>
        </div>

        {/* Informações Operacionais */}
        <div className="p-6 md:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bloco de Horário e Telefones */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b pb-2">
                <Clock className="w-5 h-5 text-emerald-600" /> Horário e Telefones
              </h3>

              <div className="space-y-3 text-xs md:text-sm">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">Horário de Funcionamento</span>
                  <p className="font-bold text-slate-800 text-base">{unidade.horarioFuncionamento}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">Telefone Principal</span>
                  <a href={`tel:${unidade.telefone.replace(/\D/g, '')}`} className="font-bold text-sky-700 text-base hover:underline">
                    {unidade.telefone}
                  </a>
                </div>

                {unidade.telefoneEmergencia && (
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">Telefone de Emergência</span>
                    <a href={`tel:${unidade.telefoneEmergencia.replace(/\D/g, '')}`} className="font-bold text-rose-700 text-base hover:underline">
                      {unidade.telefoneEmergencia}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Bloco de Acesso e Ônibus */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b pb-2">
                <Bus className="w-5 h-5 text-sky-600" /> Referência e Linhas de Transporte
              </h3>

              <div className="space-y-3 text-xs md:text-sm text-slate-700">
                {unidade.referencia && (
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">Ponto de Referência</span>
                    <p className="font-semibold">{unidade.referencia}</p>
                  </div>
                )}

                {unidade.linhasOnibus && unidade.linhasOnibus.length > 0 && (
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">Linhas de Ônibus Próximas</span>
                    <ul className="space-y-1">
                      {unidade.linhasOnibus.map((linha, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 bg-white p-2 rounded-lg border text-xs font-semibold">
                          <span>🚌 {linha}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Lista de Serviços Cadastrados */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" /> Serviços Disponíveis nesta Unidade
            </h3>
            <p className="text-xs text-slate-500">
              Serviços ofertados no âmbito do Sistema Único de Saúde (SUS):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {unidade.servicos.map((serv) => (
                <div key={serv.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    🔹 {serv.nome}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {serv.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Botão Como Chegar e Atualização */}
          <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span>Informação de status atualizada em: <strong>{unidade.ultimaAtualizacao}</strong></span>
              </div>
              <p className="text-[11px] text-slate-500">
                Os dados são atualizados pela Secretaria Municipal de Saúde.
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition shadow-md w-full md:w-auto"
            >
              <Navigation className="w-5 h-5" />
              <span>Abrir Rota no Google Maps</span>
            </a>
          </div>

        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
}
