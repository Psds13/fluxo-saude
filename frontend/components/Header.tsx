'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AccessibilityMenu from './AccessibilityMenu';
import { useTenant } from './TenantContext';
import { PhoneCall, MapPin, Menu, X, ShieldAlert, ChevronDown, Building2 } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

export default function Header() {
  const { tenantAtual, tenantsDisponiveis, selecionarTenant } = useTenant();
  const { altoContraste, t } = useAccessibility();
  const [menuMobileAberto, setMenuMobileAberto] = useState<boolean>(false);
  const [dropdownTenant, setDropdownTenant] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs border-b border-slate-200">
      {/* Barra de Emergência e Município Superior - Padrão Governo/SUS */}
      <div className={`${altoContraste ? 'bg-zinc-900 text-yellow-300' : 'bg-slate-900 text-slate-100'} py-1.5 px-4 text-xs font-medium`}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Seletor de Município (SaaS Multi-tenant) */}
          <div className="relative flex items-center gap-2">
            <span className="text-slate-400 flex items-center gap-1 hidden sm:inline">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Município/Rede:
            </span>
            <button
              onClick={() => setDropdownTenant(!dropdownTenant)}
              aria-expanded={dropdownTenant}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-md text-xs font-semibold transition"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>{tenantAtual.nome}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownTenant && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                <div className="px-3 py-1.5 border-b text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Selecione o Município ou Rede
                </div>
                {tenantsDisponiveis.map((tItem) => (
                  <button
                    key={tItem.id}
                    onClick={() => {
                      selecionarTenant(tItem.id);
                      setDropdownTenant(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-100 flex items-center justify-between font-medium ${
                      tItem.id === tenantAtual.id ? 'bg-sky-50 text-sky-800 font-bold border-l-4 border-sky-600' : ''
                    }`}
                  >
                    <span>{tItem.nome}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">{tItem.estado}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Emergência Rápida SAMU 192 & Acessibilidade */}
          <div className="flex items-center gap-3">
            <a
              href="tel:192"
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-full text-xs font-bold transition shadow-xs"
              title="Ligar para emergência SAMU 192"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>{t('emergencia_192', 'Emergência 192')}</span>
            </a>
            <AccessibilityMenu />
          </div>
        </div>
      </div>

      {/* Header Principal com Logo do Fluxo Saúde */}
      <div className={`${altoContraste ? 'bg-black text-white border-b border-yellow-400' : 'bg-white text-slate-900'} py-3 px-4 transition-colors`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Fluxo Saúde */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-sky-500 rounded-lg p-1">
            <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-xl bg-slate-100 p-1 flex items-center justify-center border border-slate-200 shadow-xs group-hover:scale-105 transition-transform">
              <Image
                src="/Fluxo-saude.png"
                alt="Logo Fluxo Saúde"
                width={56}
                height={56}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-sky-700 transition-colors">
                  Fluxo <span className="text-sky-600">Saúde</span>
                </span>
                <span className="hidden sm:inline bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-emerald-300">
                  Rede SUS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden md:block">
                Orientação e Navegação do Cidadão na Rede Pública de Saúde
              </p>
            </div>
          </Link>

          {/* Links de Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-sm">
            <Link
              href="/"
              className="text-slate-700 hover:text-sky-700 py-1 border-b-2 border-transparent hover:border-sky-600 transition font-semibold"
            >
              {t('inicio', 'Início')}
            </Link>
            <Link
              href="/unidades"
              className="text-slate-700 hover:text-sky-700 py-1 border-b-2 border-transparent hover:border-sky-600 transition"
            >
              {t('encontrar_unidades', 'Encontrar Unidades')}
            </Link>
            <Link
              href="/diferenca"
              className="text-slate-700 hover:text-sky-700 py-1 border-b-2 border-transparent hover:border-sky-600 transition"
            >
              {t('entenda_diferencas', 'Entenda UBS x UPA x SAMU')}
            </Link>
            <Link
              href="/admin"
              className="text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-slate-600" />
              {t('painel_gestor', 'Painel Gestor')}
            </Link>
          </nav>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-hidden"
            aria-label="Abrir menu principal"
          >
            {menuMobileAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {menuMobileAberto && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-slate-200 space-y-2 pb-2">
            <Link
              href="/"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold bg-sky-50 text-sky-900"
            >
              🏠 Início / Orientação
            </Link>
            <Link
              href="/unidades"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 text-slate-800"
            >
              📍 Encontrar Unidades de Saúde
            </Link>
            <Link
              href="/diferenca"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 text-slate-800"
            >
              ℹ️ Entenda a diferença entre UBS, UPA e SAMU
            </Link>
            <Link
              href="/admin"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-900"
            >
              ⚙️ Painel da Secretaria de Saúde (SaaS)
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
