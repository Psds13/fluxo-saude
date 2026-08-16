'use client';

import React from 'react';
import Link from 'next/link';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import {
  PhoneCall,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function DiferencaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto pt-6">
        <div className="flex items-center justify-center gap-2">
          <div className="h-1 w-8 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full"></div>
          <span className="text-xs font-black uppercase tracking-widest text-[#0071BC] bg-[#0071BC]/10 px-3.5 py-1.5 rounded-full border border-[#0071BC]/20">
            Conhecer o SUS Ajuda
          </span>
          <div className="h-1 w-8 bg-linear-to-l from-cyan-500 to-blue-600 rounded-full"></div>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          Qual a Diferença Entre UBS, UPA, SAMU e Hospital?
        </h1>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          O SUS é organizado em níveis de complexidade. Compreender cada um garante que o paciente receba o atendimento certo no momento certo, reduzindo filas e economizando recursos.
        </p>
      </div>

      {/* Grid das 4 Estruturas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* UBS */}
        <div className="bg-white p-8 rounded-3xl border-2 border-emerald-200 shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-black border border-emerald-300">
                🩺
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Atenção Básica / Posto</span>
                <h2 className="text-2xl font-extrabold text-slate-900">UBS (Posto de Saúde)</h2>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Porta de entrada da atenção básica. Destinada ao acompanhamento contínuo da saúde da família, prevenção e sintomas rotineiros.
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Quando procurar a UBS:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Consultas médicas gerais agendadas ou de rotina</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Vacinação e imunização do calendário nacional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Acompanhamento de Hipertensão e Diabetes (Hiperdia)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pré-natal, exames preventivos e atendimento odontológico</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Curativos, troca de receitas e medicações contínuas</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/unidades?tipo=UBS"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm"
            >
              <span>Encontrar UBS Próxima</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* UPA */}
        <div className="bg-white p-8 rounded-3xl border-2 border-rose-200 shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center text-2xl font-black border border-rose-300">
                🚨
              </div>
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">Pronto Atendimento 24h</span>
                <h2 className="text-2xl font-extrabold text-slate-900">UPA 24h</h2>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Serviço de pronto atendimento 24h destinado a casos de urgência e emergência que necessitam de exame rápido e exames de imagem/laboratório.
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Quando procurar a UPA:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Febre alta repentina que não baixa com medicação</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Dor forte no peito, dor abdominal intensa ou dor de cabeça súbita</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Cortes que necessitem de pontos ou ferimentos por queda</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Pressão muito alta com tontura ou vômitos intensos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Fraturas suspeitas e acidentes leves a moderados</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/unidades?tipo=UPA"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-sm"
            >
              <span>Encontrar UPA 24h Próxima</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* SAMU */}
        <div className="bg-white p-8 rounded-3xl border-2 border-red-300 shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
                🚑
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">Emergência Móvel 192</span>
                <h2 className="text-2xl font-extrabold text-slate-900">SAMU 192</h2>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Serviço móvel de urgência acionado pelo número 192 para prestar socorro imediato em locais de acidente ou residências.
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Quando acionar o SAMU 192:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Pessoa inconsciente ou sem respirar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Suspeita de Infarto ou AVC (derrame com boca torta/fala enrolada)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Acidentes de trânsito graves com vítimas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Queimaduras graves ou choques elétricos</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <a
              href="tel:192"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-extrabold text-xs transition shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Ligar SAMU 192 Agora</span>
            </a>
          </div>
        </div>

        {/* Hospital */}
        <div className="bg-white p-8 rounded-3xl border-2 border-blue-200 shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl font-black border border-blue-300">
                🏥
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Alta Complexidade</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Hospital Público</h2>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Destinado a cirurgias, internações e atendimentos de alta complexidade. Na maioria das vezes, o acesso ocorre por regulação via UPA ou SAMU.
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Função na Rede de Saúde:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>Cirurgias de emergência e eletivas programadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>Internação em UTI e leitos hospitalares de enfermaria</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>Tratamentos especializados de alta complexidade</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/unidades?tipo=HOSPITAL"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm"
            >
              <span>Ver Hospitais de Referência</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      <DisclaimerBanner />
    </div>
  );
}
