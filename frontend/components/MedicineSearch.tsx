'use client';

import React, { useState } from 'react';
import { Pill, Search, CheckCircle2, AlertTriangle, Building2, MapPin, ExternalLink, PackageCheck } from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

interface MedicamentoEstoque {
  id: string;
  nome: string;
  subtitulo: string;
  categoria: string;
  disponivel: boolean;
  unidadesDisponiveis: { nome: string; quantidade: number; endereco: string }[];
}

const MEDICAMENTOS_MOCK: MedicamentoEstoque[] = [
  {
    id: '1',
    nome: 'Losartana Potássica 50mg',
    subtitulo: 'Hipertensão / Pressão Alta',
    categoria: 'Uso Contínuo',
    disponivel: true,
    unidadesDisponiveis: [
      { nome: 'UBS Central - Dr. Silva', quantidade: 450, endereco: 'Av. Brasil, 1200' },
      { nome: 'UBS Vila Rosa', quantidade: 280, endereco: 'Rua das Flores, 450' },
    ],
  },
  {
    id: '2',
    nome: 'Dipirona Sódica 500mg',
    subtitulo: 'Analgésico e Antitérmico',
    categoria: 'Uso Geral',
    disponivel: true,
    unidadesDisponiveis: [
      { nome: 'UBS Central - Dr. Silva', quantidade: 600, endereco: 'Av. Brasil, 1200' },
      { nome: 'UBS Jardim das Palmeiras', quantidade: 190, endereco: 'Rua Palmeiras, 89' },
    ],
  },
  {
    id: '3',
    nome: 'Amoxicilina 500mg',
    subtitulo: 'Antibiótico sob receita médica',
    categoria: 'Antibiótico',
    disponivel: true,
    unidadesDisponiveis: [
      { nome: 'UBS Central - Dr. Silva', quantidade: 120, endereco: 'Av. Brasil, 1200' },
    ],
  },
  {
    id: '4',
    nome: 'Insulina NPH 100 UI/ml',
    subtitulo: 'Diabetes Mellitus',
    categoria: 'Uso Contínuo / Geladeira',
    disponivel: true,
    unidadesDisponiveis: [
      { nome: 'UBS Central - Dr. Silva', quantidade: 85, endereco: 'Av. Brasil, 1200' },
      { nome: 'UBS Vila Rosa', quantidade: 40, endereco: 'Rua das Flores, 450' },
    ],
  },
  {
    id: '5',
    nome: 'Omeprazol 20mg',
    subtitulo: 'Protetor gástrico / Estômago',
    categoria: 'Uso Geral',
    disponivel: true,
    unidadesDisponiveis: [
      { nome: 'UBS Jardim das Palmeiras', quantidade: 310, endereco: 'Rua Palmeiras, 89' },
    ],
  },
];

export default function MedicineSearch() {
  const [busca, setBusca] = useState<string>('');
  const { altoContraste } = useAccessibility();

  const medicamentosFiltrados = MEDICAMENTOS_MOCK.filter(
    (m) =>
      m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.subtitulo.toLowerCase().includes(busca.toLowerCase()) ||
      m.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div
      className={`rounded-3xl border-2 shadow-xl p-6 md:p-8 transition-all ${
        altoContraste ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <Pill className="w-3.5 h-3.5" /> Farmácia Popular & Estoque do SUS
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Estoque de Medicamentos nas UBS
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Consulte a disponibilidade de remédios na farmácia das unidades antes de sair de casa.
          </p>
        </div>
      </div>

      {/* Barra de Pesquisa de Medicamentos */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Digite o nome do remédio (ex: Losartana, Dipirona, Insulina)..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-sm rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
        />
      </div>

      {/* Lista de Medicamentos e Estoque nas UBS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medicamentosFiltrados.map((m) => (
          <div
            key={m.id}
            className="p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                  {m.categoria}
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{m.nome}</h4>
                <p className="text-xs text-slate-500 font-medium">{m.subtitulo}</p>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                <PackageCheck className="w-3 h-3 text-emerald-600" /> Disponível
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block">Farmácias de Retirada:</span>
              {m.unidadesDisponiveis.map((u, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{u.nome}</span>
                      <span className="text-[10px] text-slate-400">{u.endereco}</span>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-200 shrink-0">
                    {u.quantidade} unid.
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
