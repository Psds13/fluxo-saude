'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTenant } from '@/components/TenantContext';
import { MOCK_UNIDADES, MOCK_PERGUNTAS, MOCK_SERVICOS } from '@/services/mockData';
import { Unidade, StatusUnidade } from '@/types/unidade';
import UnitStatusBadge from '@/components/UnitStatusBadge';
import {
  Building2,
  Users,
  Activity,
  CheckCircle2,
  Plus,
  Edit,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  BarChart3,
  Settings,
  HelpCircle,
  Stethoscope,
  Lock,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { tenantAtual, tenantsDisponiveis, selecionarTenant } = useTenant();
  const [abaAtiva, setAbaAtiva] = useState<'unidades' | 'servicos' | 'perguntas' | 'config' | 'planos'>('unidades');

  // Estado local para alterar status de unidades no painel
  const [unidadesAdmin, setUnidadesAdmin] = useState<Unidade[]>(
    MOCK_UNIDADES.filter((u) => u.tenantId === tenantAtual.id)
  );

  const toggleStatusUnidade = (id: number) => {
    setUnidadesAdmin((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const proximoStatus: StatusUnidade =
            u.status === 'ABERTA'
              ? 'ATENDIMENTO_ALTERADO'
              : u.status === 'ATENDIMENTO_ALTERADO'
              ? 'FECHADA'
              : 'ABERTA';
          return {
            ...u,
            status: proximoStatus,
            ultimaAtualizacao: new Date().toLocaleString('pt-BR').slice(0, 16),
          };
        }
        return u;
      })
    );
  };

  const totalUBS = unidadesAdmin.filter((u) => u.tipo === 'UBS').length;
  const totalUPA = unidadesAdmin.filter((u) => u.tipo === 'UPA').length;
  const totalHospital = unidadesAdmin.filter((u) => u.tipo === 'HOSPITAL').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header do Painel Administrativo SaaS */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase border border-emerald-800">
              Painel do Gestor Municipal (SaaS)
            </span>
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Acesso Autenticado
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <span>{tenantAtual.nome}</span>
          </h1>

          <p className="text-slate-300 text-xs md:text-sm">
            Gerenciamento de unidades, status de atendimento em tempo real, serviços e regras da triagem de orientação.
          </p>
        </div>

        {/* Seletor Multi-Tenant no Painel */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2 shrink-0 w-full md:w-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Alternar Ambiente de Cliente:
          </span>
          <select
            value={tenantAtual.id}
            onChange={(e) => selecionarTenant(e.target.value)}
            className="w-full bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-600 focus:outline-hidden"
          >
            {tenantsDisponiveis.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome} ({t.estado})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de Indicadores de Gestão (SaaS Analytics) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total de Unidades</span>
          <div className="text-3xl font-black text-slate-900">{unidadesAdmin.length}</div>
          <span className="text-[11px] text-emerald-700 font-bold">100% cadastradas</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100 shadow-xs space-y-1">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Postos (UBS)</span>
          <div className="text-3xl font-black text-emerald-800">{totalUBS}</div>
          <span className="text-[11px] text-slate-500 font-medium">Atenção Primária</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-rose-100 shadow-xs space-y-1">
          <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">UPAs 24h</span>
          <div className="text-3xl font-black text-rose-800">{totalUPA}</div>
          <span className="text-[11px] text-slate-500 font-medium">Pronto Socorro</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-sky-100 shadow-xs space-y-1">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">Orientações no Mês</span>
          <div className="text-3xl font-black text-sky-800">1.482</div>
          <span className="text-[11px] text-emerald-700 font-bold">↑ 18% este mês</span>
        </div>
      </div>

      {/* Abas de Navegação do Painel Admin */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setAbaAtiva('unidades')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            abaAtiva === 'unidades'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Gerenciar Unidades</span>
        </button>

        <button
          onClick={() => setAbaAtiva('servicos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            abaAtiva === 'servicos'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Serviços de Saúde</span>
        </button>

        <button
          onClick={() => setAbaAtiva('perguntas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            abaAtiva === 'perguntas'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Perguntas & Regras de Triagem</span>
        </button>

        <button
          onClick={() => setAbaAtiva('config')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            abaAtiva === 'config'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Personalização do Município</span>
        </button>

        <button
          onClick={() => setAbaAtiva('planos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition ${
            abaAtiva === 'planos'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Planos Comerciais SaaS</span>
        </button>
      </div>

      {/* Conteúdo da Aba 1: Gerenciar Unidades */}
      {abaAtiva === 'unidades' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Unidades de Saúde da Rede</h2>
              <p className="text-xs text-slate-500">
                Clique para alterar o status de atendimento da unidade em tempo real na plataforma do cidadão.
              </p>
            </div>

            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Cadastrar Nova Unidade</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 uppercase text-[10px] font-extrabold text-slate-500 border-b">
                <tr>
                  <th className="p-3">Nome da Unidade</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Bairro</th>
                  <th className="p-3">Telefone</th>
                  <th className="p-3">Status Atual</th>
                  <th className="p-3">Última Atualização</th>
                  <th className="p-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {unidadesAdmin.map((unidade) => (
                  <tr key={unidade.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{unidade.nome}</td>
                    <td className="p-3">
                      <span className="font-extrabold px-2 py-0.5 rounded text-[10px] bg-slate-100">
                        {unidade.tipo}
                      </span>
                    </td>
                    <td className="p-3">{unidade.bairro}</td>
                    <td className="p-3">{unidade.telefone}</td>
                    <td className="p-3">
                      <UnitStatusBadge status={unidade.status} />
                    </td>
                    <td className="p-3 text-slate-400 text-[11px]">{unidade.ultimaAtualizacao}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleStatusUnidade(unidade.id)}
                        className="px-3 py-1 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-[11px] transition border border-sky-300"
                        title="Alternar status da unidade"
                      >
                        Alternar Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 2: Serviços */}
      {abaAtiva === 'servicos' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Catálogo de Serviços de Saúde</h2>
              <p className="text-xs text-slate-500">Serviços associados às unidades de saúde do município.</p>
            </div>

            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Novo Serviço</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_SERVICOS.map((serv) => (
              <div key={serv.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">🔹 {serv.nome}</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-200 rounded text-slate-700">
                    {serv.categoria}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{serv.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 3: Perguntas & Regras */}
      {abaAtiva === 'perguntas' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Regras da Triagem Adaptativa</h2>
            <p className="text-xs text-slate-500">
              As regras e perguntas ficam armazenadas na base do sistema e orientam a tomada de decisão inicial.
            </p>
          </div>

          <div className="space-y-3">
            {MOCK_PERGUNTAS.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black text-sky-700 uppercase">Pergunta #{p.ordem}</span>
                  <p className="font-bold text-slate-900 text-sm">{p.texto}</p>
                  {p.subtexto && <p className="text-xs text-slate-500">{p.subtexto}</p>}
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Ativa
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba 4: Personalização */}
      {abaAtiva === 'config' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Personalização Institucional do Município</h2>
            <p className="text-xs text-slate-500">Configurações visuais do tenant institucional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-medium text-slate-700">
            <div className="space-y-2">
              <label className="font-bold block text-slate-900">Nome da Instituição Contratante</label>
              <input type="text" defaultValue={tenantAtual.nome} className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm" />
            </div>

            <div className="space-y-2">
              <label className="font-bold block text-slate-900">Site Oficial da Secretaria de Saúde</label>
              <input type="text" defaultValue={tenantAtual.siteOficial} className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm" />
            </div>

            <div className="space-y-2">
              <label className="font-bold block text-slate-900">Disque Saúde Municipal</label>
              <input type="text" defaultValue={tenantAtual.contatoSuporte} className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm" />
            </div>

            <div className="space-y-2">
              <label className="font-bold block text-slate-900">Estado / UF</label>
              <input type="text" defaultValue={tenantAtual.estado} className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm" />
            </div>
          </div>

          <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md">
            Salvar Configurações do Município
          </button>
        </div>
      )}

      {/* Conteúdo da Aba 5: Planos SaaS Comercial */}
      {abaAtiva === 'planos' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Modelo Comercial SaaS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Planos para Prefeituras e Redes de Saúde
            </h2>
            <p className="text-xs text-slate-600">
              Estrutura multi-tenant pronta para expansão e contratação governamental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Plano 1 */}
            <div className="p-6 rounded-3xl border-2 border-slate-200 bg-slate-50 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase">Prefeituras Médias</span>
                <h3 className="text-xl font-extrabold text-slate-900">Plano Municipal</h3>
                <p className="text-xs text-slate-600">Página personalizada do município, cadastro da rede municipal (UBS e UPA) e painel gestor de horários.</p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2">
                  <li>✓ Cadastro de até 50 Unidades</li>
                  <li>✓ Triagem de Orientação Adaptativa</li>
                  <li>✓ Gerenciador de Status em Tempo Real</li>
                </ul>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">
                Plano Atual
              </button>
            </div>

            {/* Plano 2 */}
            <div className="p-6 rounded-3xl border-2 border-emerald-300 bg-emerald-50/40 space-y-4 flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-700 uppercase">Mais Popular</span>
                <h3 className="text-xl font-extrabold text-slate-900">Plano Profissional</h3>
                <p className="text-xs text-slate-600">Recursos avançados com mapa interativo de localização, múltiplos administradores e relatórios de uso.</p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2">
                  <li>✓ Unidades Ilimitadas</li>
                  <li>✓ Geolocalização Integrada</li>
                  <li>✓ Indicadores de Fluxo Populacional</li>
                  <li>✓ Múltiplos Perfis de Acesso</li>
                </ul>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs">
                Fazer Upgrade
              </button>
            </div>

            {/* Plano 3 */}
            <div className="p-6 rounded-3xl border-2 border-sky-300 bg-sky-50/40 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-sky-700 uppercase">Secretarias Estaduais</span>
                <h3 className="text-xl font-extrabold text-slate-900">Plano Enterprise</h3>
                <p className="text-xs text-slate-600">Para grandes redes regionais e estaduais com integrações REST dedicadas e suporte 24h.</p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2">
                  <li>✓ Múltiplos Municípios em Rede</li>
                  <li>✓ Integração com APIs Oficiais SUS</li>
                  <li>✓ Infraestrutura Dedicada</li>
                </ul>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-sky-700 text-white font-bold text-xs">
                Solicitar Proposta
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
