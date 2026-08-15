# 🩺 Fluxo Saúde - Frontend

Plataforma web moderna, inclusiva e acessível para **orientação e direcionamento consciente de cidadãos no SUS** (Sistema Único de Saúde). O projeto atua no encaminhamento correto entre **UBS (Atenção Primária)**, **UPA (Pronto Atendimento 24h)** e **SAMU 192 (Urgência/Emergência)**, otimizando o fluxo nos postos de atendimento e salvando vidas.

![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Acessibilidade](https://img.shields.io/badge/Acessibilidade-WCAG_2.1-green?style=for-the-badge)

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Recursos de Acessibilidade](#-recursos-de-acessibilidade)
- [Arquitetura Multi-tenant](#-arquitetura-multi-tenant)

---

## 🌟 Visão Geral

Muitas pessoas procuram as UPAs ou Prontos-Socorros para sintomas leves que deveriam ser atendidos na Unidade Básica de Saúde (UBS), gerando superlotação e filas de espera. Por outro lado, casos graves por vezes demoram a acionar o SAMU 192.

O **Fluxo Saúde** resolve esse problema oferecendo uma interface simples, empática e inteligente onde o cidadão realiza uma **triagem rápida baseada em sintomas** e recebe:
1. **Recomendação imediata** do ponto de atenção correto (UBS, UPA ou SAMU 192).
2. **Localização e distância** das unidades de saúde mais próximas da sua localização.
3. **Instruções de conduta** e primeiros passos enquanto aguarda atendimento.

---

## ✨ Principais Funcionalidades

- 🩺 **Triagem Digital Interativa**: Questionário dinâmico e assistido por passos para identificação do nível de urgência do paciente.
- 📍 **Localizador de Unidades de Saúde**: Busca e listagem de UBS e UPAs próximas com calculador de distância, status de funcionamento (aberto/fechado), horários e endereço.
- 📖 **Guia Educativo SUS**: Seção interativa comparando e detalhando a finalidade de cada serviço (UBS vs UPA vs SAMU 192).
- 🚨 **Alerta de Emergência Automático**: Identificação imediata de sinais de alarme (dor no peito grave, falta de ar severa, alteração de consciência) com acionamento facilitado do **SAMU 192**.
- ♿ **Acessibilidade Universal**: Menu de acessibilidade com ajuste de fonte, alto contraste, modo para daltonismo, leitor de tela estruturado e navegação por teclado.
- 🏛️ **Suporte Multi-tenant / Prefeituras**: Personalização de cores, marca e dados conforme o município ou estado configurado.
- 🛠️ **Painel Administrativo (`/admin`)**: Gestão em tempo real de unidades, horários de atendimento e atualização de filas/status.
- 🔄 **Fallback Híbrido API/Mock**: Funcionamento contínuo integrado a um backend REST API Java/Spring ou modo autônomo offline com mocks.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Biblioteca de UI**: [React 19](https://react.dev/)
- **Linguagem**: [TypeScript 5](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconografia**: [Lucide React](https://lucide.dev/)
- **Gerenciamento de Estado**: React Context API (`AccessibilityContext`, `TenantContext`)

---

## 📁 Estrutura do Projeto

```
frontend/
├── app/                      # Rotas e páginas (Next.js App Router)
│   ├── admin/                # Painel administrativo de unidades e filas
│   ├── diferenca/            # Guia comparativo dos serviços do SUS
│   ├── resultado/            # Tela com o resultado e direcionamento da triagem
│   ├── triagem/              # Questionário interativo de sintomas
│   ├── unidades/             # Busca e filtros de unidades de saúde
│   ├── globals.css           # Estilos globais e definições do Tailwind v4
│   ├── layout.tsx            # Layout raiz com Provedores globais
│   └── page.tsx              # Página inicial (Landing Page / Home)
├── components/               # Componentes UI reutilizáveis
│   ├── AccessibilityContext.tsx # Estado global de acessibilidade
│   ├── AccessibilityMenu.tsx    # Painel flutuante de acessibilidade (WCAG)
│   ├── TenantContext.tsx        # Provedor de dados do município/tenant
│   ├── AnswerButton.tsx         # Botão de resposta interativo para a triagem
│   ├── DisclaimerBanner.tsx     # Aviso legal informando que a triagem não substitui consulta médica
│   ├── EmergencyAlert.tsx       # Alerta de emergência com botão direto para Ligar 192
│   ├── Header.tsx / Footer.tsx  # Topo navegável e rodapé informativo
│   ├── ProgressBar.tsx          # Barra de progresso da triagem
│   ├── QuestionCard.tsx         # Card de pergunta da triagem
│   ├── ResultCard.tsx           # Card detalhado do resultado da recomendação
│   ├── SearchUnit.tsx           # Barra de pesquisa e filtros para unidades
│   ├── ServiceCard.tsx          # Cards informativos de UBS, UPA e SAMU
│   ├── UnitCard.tsx             # Card de exibição de unidade de saúde
│   └── UnitStatusBadge.tsx      # Badge de status operacional (Aberto/Fechado)
├── hooks/                    # Custom Hooks React
│   ├── useTriagem.ts         # Hook para gerenciamento do estado da triagem
│   └── useUnits.ts           # Hook para busca e filtragem de unidades de saúde
├── services/                 # Camada de integração com API e dados Mock
│   ├── api.ts                # Cliente REST HTTP com fallback gracioso
│   ├── triagemService.ts     # Lógica de cálculo e dados da triagem
│   ├── unidadeService.ts     # Lógica de manipulação e busca de unidades
│   └── mockData.ts           # Dados simulados para execução offline
├── types/                    # Interfaces e Definições de Tipos TypeScript
│   ├── triagem.ts            # Tipos de perguntas, opções e triagem
│   ├── unidade.ts            # Tipos de unidades de saúde e filtros
│   ├── resultado.ts          # Tipos para resultados de recomendação
│   └── tenant.ts             # Tipos para multi-tenancy
└── public/                   # Arquivos estáticos e ativos visuais
```

---

## 🗺️ Rotas da Aplicação

| Rota | Descrição |
| :--- | :--- |
| `/` | **Home Page** — Apresentação, acesso rápido à triagem, busca de unidades e botão de emergência. |
| `/triagem` | **Questionário de Triagem** — Fluxo interativo de perguntas para avaliar o nível de urgência. |
| `/resultado` | **Resultado da Triagem** — Diagnóstico de encaminhamento (UBS/UPA/SAMU) e unidades próximas. |
| `/unidades` | **Localizador de Unidades** — Filtros por tipo (UBS/UPA), distância, funcionamento e busca. |
| `/diferenca` | **Guia do Cidadão** — Explica em detalhes a diferença de atuação entre UBS, UPA e SAMU 192. |
| `/admin` | **Painel Administrativo** — Gestão de status de atendimento e horários das unidades. |

---

## 🚀 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18.17.0 ou superior recomendada)
- **npm**, **yarn**, **pnpm** ou **bun**

---

## ⚙️ Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/fluxo-saude.git
cd fluxo-saude/frontend
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Executar o servidor de desenvolvimento
```bash
npm run dev
```

Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

### 4. Build para produção
```bash
npm run build
npm start
```

---

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do diretório `frontend/` com as seguintes variáveis de ambiente:

```env
# URL da API REST Backend (Ex: Spring Boot / Node API)
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Identificador do município / tenant padrão
NEXT_PUBLIC_TENANT_ID=default

# Forçar uso de dados mockados (opcional: true/false)
NEXT_PUBLIC_USE_MOCK=false
```

> **Nota:** Caso o backend não esteja em execução, o frontend irá acionar automaticamente o **fallback gracioso**, utilizando os dados simulados localizados em `services/mockData.ts`.

---

## ♿ Recursos de Acessibilidade (WCAG 2.1)

O Fluxo Saúde foi projetado para garantir o acesso universal à informação de saúde pública:

- 🔤 **Aumento e Diminuição de Fonte**: Permite ajustar o tamanho do texto para melhor leitura.
- 🎨 **Alto Contraste**: Garante legibilidade para pessoas com baixa visão.
- 👁️ **Filtro para Daltonismo**: Ajusta os tons visuais para diferentes tipos de daltonismo.
- ⌨️ **Navegação por Teclado**: Suporte completo a atalhos e navegação via `Tab`.
- 🗣️ **Suporte a Leitor de Tela**: Elementos semânticos HTML5 e atributos ARIA adequados.

---

## 📄 Licença

Este projeto é desenvolvido com foco no impacto social e saúde pública. Consulte os termos de licença do repositório principal para maiores detalhes.

