'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneCall, ShieldAlert, HeartHandshake, Info } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

export default function Footer() {
  const { altoContraste } = useAccessibility();

  return (
    <footer className={`${altoContraste ? 'bg-black text-yellow-300 border-t border-yellow-400' : 'bg-slate-900 text-slate-300'} text-xs pt-10 pb-8 mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 space-y-8">

        {/* Disclaimer Oficial em Destaque */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 md:p-6 text-slate-200 flex flex-col md:flex-row items-start gap-4 shadow-inner">
          <div className="bg-amber-500/20 text-amber-400 p-2.5 rounded-xl shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              AVISO DE INTERESSE PÚBLICO E ORIENTAÇÃO INICIAL
            </h4>
            <p className="leading-relaxed text-slate-300 text-xs">
              O <strong>Fluxo Saúde</strong> é um sistema digital de orientação e navegação na rede pública de saúde (SUS). 
              <strong> NÃO realiza diagnóstico médico, NÃO prescreve medicamentos e NÃO indica tratamentos.</strong> 
              Seu objetivo é auxiliar o cidadão a identificar a unidade mais adequada para seu acolhimento. A decisão clínica final e o atendimento são sempre de responsabilidade exclusiva dos profissionais de saúde habilitados.
            </p>
          </div>
        </div>

        {/* Seção Principal do Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">

          {/* Coluna 1: Identidade e Logo */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white rounded-lg p-1">
                <Image src="/Fluxo-saude.png" alt="Fluxo Saúde Logo" width={40} height={40} className="object-contain" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Fluxo <span className="text-sky-400">Saúde</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Plataforma SaaS de Orientação Cidadã e Gestão de Navegação da Rede Municipal e Estadual de Saúde.
            </p>
            <div className="pt-1 text-[11px] text-slate-500">
              Conformidade total com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). NENHUM dado médico pessoal é coletado na triagem inicial.
            </div>
          </div>

          {/* Coluna 2: Telefones de Emergência */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-rose-400" /> Telefones Úteis
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li className="flex justify-between items-center bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                <span className="font-semibold text-rose-300">SAMU — Emergência</span>
                <a href="tel:192" className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-2 py-0.5 rounded text-xs">192</a>
              </li>
              <li className="flex justify-between items-center bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                <span>Disque Saúde SUS</span>
                <a href="tel:136" className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-2 py-0.5 rounded text-xs">136</a>
              </li>
              <li className="flex justify-between items-center bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                <span>Corpo de Bombeiros</span>
                <a href="tel:193" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-2 py-0.5 rounded text-xs">193</a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Navegação Rápida */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider">
              Navegação
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition">Início / Orientação Rápida</Link>
              </li>
              <li>
                <Link href="/triagem" className="hover:text-white transition">Triagem Adaptativa</Link>
              </li>
              <li>
                <Link href="/unidades" className="hover:text-white transition">Buscar Postos e UPAs Próximos</Link>
              </li>
              <li>
                <Link href="/diferenca" className="hover:text-white transition">Diferenças UBS, UPA e SAMU</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" /> Acesso da Gestão Municipal
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Modelo SaaS / Prefeituras */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-emerald-400" /> Para Municípios
            </h5>
            <p className="text-slate-400 text-xs leading-relaxed">
              O Fluxo Saúde pode ser implementado no seu município ou rede de saúde com painel de gestão exclusivo e customizado.
            </p>
            <Link
              href="/admin"
              className="inline-block w-full text-center bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded-xl text-xs transition shadow-md"
            >
              Conheça o Painel do Gestor
            </Link>
          </div>

        </div>

        {/* Rodapé Direitos */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Fluxo Saúde. Plataforma Digital de Orientação e Saúde Pública.</p>
          <div className="flex gap-4">
            <span>Privacidade e Segurança</span>
            <span>Acessibilidade WCAG 2.1</span>
            <span>Tecnologia em Saúde Pública</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
