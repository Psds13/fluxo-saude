🩺 Fluxo Saúde
Plataforma web moderna, acessível e responsiva para orientação inicial sobre o encaminhamento adequado em serviços de saúde pública. O objetivo principal do sistema é ajudar cidadãos a identificar, com linguagem simples e clara, quando a atenção pode ser mais adequada em uma UBS, em uma UPA ou, em situações de risco imediato à vida, quando a orientação deve priorizar o SAMU 192.

A proposta do projeto não é substituir a avaliação de um profissional de saúde, prescrever tratamentos, indicar medicamentos ou afirmar que uma pessoa não precisa de atendimento. O sistema atua como ferramenta de orientação, esclarecimento e navegação na rede de atenção à saúde, sempre reforçando que a decisão final deve ser tomada por profissionais de saúde e, quando necessário, por atendimento emergencial.

Next.js React TypeScript Tailwind CSS Java Spring Boot PostgreSQL Docker Acessibilidade

📌 Visão Geral
Muitas pessoas buscam atendimento em UPA ou pronto-atendimento para situações que poderiam ser avaliadas em uma UBS, enquanto outras têm dúvida sobre quando uma situação exige cuidado emergencial. Além disso, ainda há muita dificuldade em entender a diferença entre:

UBS (Unidade Básica de Saúde)
UPA (Unidade de Pronto Atendimento)
SAMU 192
Hospital
O Fluxo Saúde foi pensado para resolver essa lacuna, oferecendo:

Orientação inicial e clara sobre o tipo de serviço mais adequado.
Triagem simples, responsiva e acessível para celular.
Informações sobre serviços, horários, localização, telefone e tipos de unidade.
Explicação educacional sobre o papel de cada estrutura da rede de saúde.
Suporte futuro para municípios, secretarias e plataformas multi-tenant.
O sistema é uma ferramenta de orientação e navegação na rede de saúde, não um diagnóstico médico.

🎯 Objetivo do Sistema
O Fluxo Saúde tem como objetivo principal ajudar cidadãos a:

identificar qual serviço de saúde pode ser mais adequado para sua situação;
diferenciar UBS, UPA, SAMU e hospital;
entender quando uma situação pode exigir atenção urgente;
localizar unidades de saúde próximas;
encontrar serviços disponíveis, horários e telefones;
receber informações educativas sem exagerar em linguagem técnica;
fazer uma triagem inicial sem exigir dados pessoais sensíveis.
A plataforma deve ser simples, acolhedora, confiável e acessível, especialmente para uso em smartphones.

✅ Regras de Comunicação e Segurança
O sistema deve seguir sempre as seguintes regras:

Não diagnosticar.
Não prescrever medicamentos.
Não indicar tratamentos.
Não afirmar que uma pessoa não precisa de atendimento.
Sempre reforçar que a decisão final deve ser feita por um profissional de saúde.
Em casos com risco imediato à vida, orientar a procurar atendimento emergencial e, quando apropriado, acionar o SAMU 192.
Utilizar mensagens seguras, por exemplo:
"A UBS pode ser um serviço mais adequado."
"Os sinais informados podem indicar necessidade de avaliação rápida."
"Em caso de dúvida, procure avaliação profissional."
🧩 Funcionalidades Principais
Página inicial com escolha de fluxo principal
Orientação para UPA, UBS e SAMU
Triagem adaptativa com perguntas de risco
Barra de progresso visível
Resultado com explicação simples e segura
Seção "Entenda antes de ir"
Busca de unidades por proximidade ou endereço
Página de detalhes da unidade
Lista de serviços disponíveis por unidade
Informações de horários e telefones
Estado de unidade: aberta, fechada, indisponível ou alteração
Painel administrativo futuro para gestão de dados
Arquitetura pronta para multi-tenancy e municipalização
Acessibilidade e responsiveness mobile-first
Tratamento de erros e estados vazios
🏗️ Arquitetura Proposta
A estrutura do sistema será separada em dois grandes blocos:

Frontend: interface e experiência do usuário
Backend: regras de triagem, dados de unidades, serviços e gestão administrativa
Banco de dados: persistência dos dados do sistema
Docker: execução local e padronizada do ambiente
Usuário
   ↓
Next.js / React / TypeScript
   ↓
API REST
   ↓
Spring Boot / Java
   ↓
PostgreSQL + PostGIS (futuro)
   ↓
Integrações oficiais e dados municipais
Responsabilidades por camada
Frontend: interface, navegação, UX, acessibilidade, apresentação de dados
Backend: regras da triagem, regras de negócio, entidades, serviços, autenticação, administração
Banco: persistência de unidades, perguntas, regras, serviços, usuários e dados de tenants
Futuras integrações: mapas, dados oficiais, horários, cadastros, APIs municipais e secretarias
🖥️ Stack Tecnológica
Frontend
Next.js
React
TypeScript
Tailwind CSS
Lucide React ou similar
Componentes reutilizáveis
App Router do Next.js
Acessibilidade com foco em WCAG
Consumo de API REST via cliente HTTP
Backend
Java 21+
Spring Boot 3.x
Spring Web
Spring Data JPA
Hibernate
Bean Validation
Spring Security
SpringDoc OpenAPI / Swagger
REST API
Docker
Banco de Dados
PostgreSQL
PostGIS (preparado para geolocalização e consultas espaciais)
Estrutura de dados para unidades, serviços, triagem e tenant
Infraestrutura
Docker Compose
Variáveis de ambiente
Arquitetura preparada para multi-tenant
Estrutura para integração futura com APIs oficiais
📁 Estrutura do Projeto
fluxo-saude/
├── README.md
├── docker-compose.yml
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── triagem/
│   │   │   └── page.tsx
│   │   ├── resultado/
│   │   │   └── page.tsx
│   │   ├── unidades/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── diferenca/
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── loading.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerButton.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ResultCard.tsx
│   │   ├── EmergencyAlert.tsx
│   │   ├── UnitCard.tsx
│   │   ├── UnitStatusBadge.tsx
│   │   ├── ServiceBadge.tsx
│   │   ├── SearchUnit.tsx
│   │   ├── AccessibilityMenu.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   ├── hooks/
│   │   ├── useTriagem.ts
│   │   └── useUnits.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── triagemService.ts
│   │   ├── unidadeService.ts
│   │   └── mockData.ts
│   ├── types/
│   │   ├── triagem.ts
│   │   ├── unidade.ts
│   │   ├── resultado.ts
│   │   └── tenant.ts
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   └── .env.local.example
│
├── backend/
│   └── src/
│       └── main/
│           └── java/
│               └── br/com/fluxosaude/
│                   ├── controller/
│                   │   ├── TriagemController.java
│                   │   ├── UnidadeController.java
│                   │   └── ServicoController.java
│                   ├── service/
│                   │   ├── TriagemService.java
│                   │   ├── UnidadeService.java
│                   │   └── LocalizacaoService.java
│                   ├── repository/
│                   │   ├── PerguntaRepository.java
│                   │   ├── RegraTriagemRepository.java
│                   │   ├── UnidadeRepository.java
│                   │   └── ServicoRepository.java
│                   ├── entity/
│                   │   ├── Pergunta.java
│                   │   ├── RegraTriagem.java
│                   │   ├── Unidade.java
│                   │   ├── Servico.java
│                   │   └── Tenant.java
│                   ├── dto/
│                   │   ├── PerguntaDTO.java
│                   │   ├── RespostaDTO.java
│                   │   ├── ResultadoDTO.java
│                   │   ├── UnidadeDTO.java
│                   │   └── TriagemRequestDTO.java
│                   ├── enums/
│                   │   ├── TipoUnidade.java
│                   │   ├── TipoResposta.java
│                   │   ├── TipoResultado.java
│                   │   └── PerfilUsuario.java
│                   ├── config/
│                   │   ├── CorsConfig.java
│                   │   ├── SecurityConfig.java
│                   │   └── OpenApiConfig.java
│                   ├── exception/
│                   │   ├── ApiExceptionHandler.java
│                   │   └── ResourceNotFoundException.java
│                   └── FluxoSaudeApplication.java
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── migrations/
│       └── V1__initial_schema.sql
│
├── docs/
│   ├── api.md
│   └── acessibilidade.md
│
└── .env.example
🧠 Fluxo de Uso do Produto
1. Tela Inicial
A interface inicial deve conter:

Título: "Onde devo procurar atendimento?"
Subtítulo: "Responda algumas perguntas e descubra qual serviço de saúde pode ser mais adequado para sua situação."
Três opções principais:
🚨 Urgência e Emergência — UPA
🩺 Consultas e outros serviços — UBS
❓ Não sei qual escolher
Botão de emergência: "🚑 Preciso de atendimento agora"
Essa tela deve deixar claro que a decisão final deve ser feita por profissionais de saúde.

2. Fluxo UPA
Ao selecionar UPA, o sistema apresenta informações como:

dificuldade importante para respirar;
dor forte no peito;
desmaio ou perda de consciência;
sangramento intenso;
acidentes e traumas;
convulsões;
sintomas súbitos e intensos;
piora rápida da situação.
A linguagem deve ser cuidadosa, por exemplo:

A UPA atende situações de urgência e emergência que precisam de avaliação rápida. A gravidade é avaliada pelos profissionais de saúde.

Também deve existir alerta:

Esta ferramenta não substitui uma avaliação profissional. Se houver risco à vida, procure atendimento de emergência imediatamente.

3. Fluxo UBS
A UBS deve ser orientada como serviço de atenção básica e acompanhamento, por exemplo:

consultas médicas;
acompanhamento de doenças crônicas;
vacinação;
pré-natal;
hipertensão e diabetes;
enfermagem;
saúde da mulher;
saúde da criança;
saúde bucal;
prevenção;
orientação;
curativos;
testes rápidos;
acompanhamento de tratamentos;
outros atendimentos programados.
Mensagem esperada:

Para situações que não apresentam sinais de emergência, a UBS pode ser o serviço mais adequado para acompanhamento e cuidados de saúde.

4. Fluxo SAMU 192
A orientação para SAMU deve ser restrita a situações potencialmente graves, como:

pessoa inconsciente;
dificuldade intensa para respirar;
risco imediato à vida;
acidente grave;
outras situações em que seja necessário atendimento emergencial.
Mensagem esperada:

🚑 Em situação de risco à vida: acione o SAMU pelo número 192 e siga as orientações fornecidas pelo serviço.

5. Fluxo "Não sei"
O sistema apresenta uma triagem simples, uma pergunta por tela. Exemplos:

O problema aconteceu de forma repentina e intensa?
Existe dificuldade importante para respirar?
Existe dor forte no peito?
A pessoa desmaiou ou está inconsciente?
Existe sangramento intenso?
Houve acidente ou trauma importante?
A situação parece estar piorando rapidamente?
Opções de resposta:

Sim
Não
Estou em dúvida / Quero procurar atendimento mesmo assim
A lógica deve ser adaptativa: quando houver sinal de alerta relevante, a sequência pode interromper e direcionar a orientação correspondente.

🧭 Triagem Adaptativa
A triagem é concebida para não exigir que o usuário responda todas as perguntas. Em vez disso, o backend deve avaliar regras e priorizar respostas graves ou críticas.

Exemplo de lógica
Pergunta 1: O problema aconteceu de forma repentina e intensa?
    ├── Sim → Pergunta 2
    │   └── Sim → Orientação de urgência
    └── Não → continue a triagem
Entidades do backend relacionadas à triagem
Pergunta
RegraTriagem
Resposta
Resultado
Estrutura da regra
REGRA_TRIAGEM
- id
- pergunta_id
- resposta
- resultado
- prioridade
A regra de triagem deve ficar no backend e não espalhada no frontend.

🩺 Resultado da Triagem
Após a triagem, o sistema deve exibir uma tela clara com:

serviço recomendado:
🚨 UPA — Urgência e Emergência
🩺 UBS — Consultas e Atenção Básica
🚑 SAMU 192 — Emergência
explicação curta sobre a orientação;
observação sobre quais respostas contribuíram para a recomendação;
botão para encontrar unidade próxima;
botão para refazer a triagem;
botão para entender a diferença entre UBS, UPA e SAMU;
alerta de segurança final.
Exemplo de mensagem de resultado
A orientação foi baseada nas respostas fornecidas durante esta triagem.

Foi identificada uma resposta relacionada a um sinal de alerta que pode exigir avaliação rápida.

Esta orientação não substitui uma avaliação profissional.

Também deve existir a seção:

"Por que recebi esta orientação?"
Essa seção deve explicar em linguagem simples:

Durante a triagem, você informou que o problema aconteceu de forma repentina e intensa. Essa informação pode justificar uma avaliação mais rápida.

Sem transformar essa explicação em diagnóstico.

🧾 Entenda Antes de Ir
Essa seção deve ensinar a população sobre o papel de cada serviço da rede de atenção à saúde.

UBS
Porta de entrada da atenção básica, voltada para consultas, prevenção, vacinação, acompanhamento e diversos serviços de saúde.

UPA
Serviço destinado a situações de urgência e emergência que precisam de avaliação rápida.

SAMU
Serviço de atendimento móvel de urgência acionado pelo número 192 em situações que podem exigir atendimento de emergência.

Hospital
Serviço destinado a situações que necessitam de estrutura e atendimento hospitalar, conforme a necessidade identificada pelos profissionais de saúde.

O texto deve deixar claro que esses serviços fazem parte de uma rede integrada, com funções diferentes.

📍 Localização de Unidades
A plataforma deve estar preparada para localizar unidades de saúde em diferentes tipos:

UBS
UPA
Hospital
Recursos esperados
usar minha localização
pesquisar por endereço ou bairro
geolocalização do navegador
listagem de unidades próximas
cards com distância, endereço, telefone, status e serviços
botão "Como chegar"
integração futura com mapas
Exemplo de endpoint
GET /api/unidades/proximas?lat={latitude}&lng={longitude}&tipo=UPA
Estrutura da unidade
UNIDADE
- id
- nome
- tipo
- endereco
- numero
- bairro
- cidade
- estado
- latitude
- longitude
- telefone
- horario_funcionamento
- ativo
Status da unidade
🟢 Aberta
🟡 Atendimento com alteração
🔴 Fechada
⚠️ Serviço temporariamente indisponível
As informações devem vir de fonte oficial quando houver integração. Nunca inventar horários ou disponibilidade.

Informações atualizadas em: DD/MM/AAAA HH:MM

🗄️ Banco de Dados
A estrutura do banco deve permitir persistência da rede de saúde, das regras triagem, dos serviços, dos tenants e das unidades.

Entidades principais
UNIDADE
id
nome
tipo
endereco
numero
bairro
cidade
estado
latitude
longitude
telefone
horario_funcionamento
ativo
SERVICO
id
nome
descricao
UNIDADE_SERVICO
unidade_id
servico_id
PERGUNTA
id
texto
ordem
ativo
REGRA_TRIAGEM
id
pergunta_id
resposta
resultado
prioridade
TENANT
id
nome
tipo
cnpj
cidade
estado
ativo
created_at
updated_at
USUARIO_ADMIN
id
tenant_id
nome
email
senha
perfil
ativo
created_at
updated_at
Enumerações
TipoUnidade: UBS, UPA, HOSPITAL
TipoResultado: UBS, UPA, SAMU, HOSPITAL
TipoResposta: SIM, NAO, INDETERMINADO
PerfilUsuario: ADMIN, GESTOR, SUPERVISOR
PostGIS
A estrutura deve ficar preparada para uso de geolocalização com PostGIS no futuro, permitindo:

distância entre usuário e unidade;
proximidade geográfica;
filtros por raio;
geocodificação e busca espacial.
🔌 API REST
A API deve seguir uma arquitetura limpa e organizada, com controllers, services, repositories, DTOs e validação.

Endpoints sugeridos
Triagem
GET /api/triagem/perguntas
POST /api/triagem/analisar
Unidades
GET /api/unidades
GET /api/unidades/{id}
GET /api/unidades/proximas
Serviços
GET /api/servicos
GET /api/unidades/{id}/servicos
Estrutura de resposta
DTOs para resposta da API
Tratamento global de exceções
Validação de campos
Documentação via Swagger/OpenAPI
Exemplo de payload
{
  "perguntas": [
    {
      "id": 1,
      "texto": "O problema aconteceu de forma repentina e intensa?",
      "ordem": 1,
      "ativo": true
    }
  ]
}
🛡️ Painel Administrativo
O sistema deve ter um painel administrativo separado para usuários autorizados.

Funcionalidades previstas
cadastrar unidades;
editar unidades;
ativar/desativar unidades;
atualizar telefones;
atualizar horários;
cadastrar serviços;
associar serviços às unidades;
cadastrar e alterar perguntas;
gerenciar regras da triagem;
visualizar status das unidades;
manter informações de endereço e localização;
controlar dados por tenant.
Autenticação e autorização
login para administradores;
controle por perfil;
segregação de dados por município/tenant;
proteção de rotas administrativas;
logs de acesso;
auditoria futura de mudanças.
🧩 Modelo de Negócio e Multi-tenant
O produto deve ser pensado como uma plataforma SaaS para orientação e navegação na rede de saúde.

Público final
cidadãos em geral;
acesso gratuito à triagem e orientação inicial;
sem necessidade de cadastro para uso básico;
sem coleta de dados médicos desnecessários;
sempre com opção de procurar atendimento profissional.
Clientes institucionais
Prefeituras
Secretarias Municipais de Saúde
Secretarias Estaduais de Saúde
Organizações de saúde
Estrutura de multi-tenant
TENANT
├── USUARIO_ADMIN
├── UNIDADES
├── SERVICOS
├── PERGUNTAS
├── REGRAS_DA_TRIAGEM
├── CONFIGURACOES
└── RELACIONAMENTOS
Cada cliente deve possuir:

ambiente próprio;
usuários administrativos próprios;
unidades próprias;
dados isolados;
configuração visual e institucional própria;
personalização de cores, logotipo e texto oficial.
Planos comerciais (futuro)
Plano Municipal
Plano Profissional
Plano Enterprise
Esses planos são apenas uma estrutura comercial inicial e devem ser configuráveis futuramente.

🌐 Design e Experiência do Usuário
O produto deve ter uma aparência moderna, simples e confiável, com foco em saúde pública.

Diretrizes visuais
design limpo e profissional;
foco em acessibilidade;
uso de cores seguras e contrastadas;
linguagem simples;
botões grandes para mobile;
uma pergunta por vez;
feedback visual e textual;
aparência de produto real e funcional, não apenas institucional.
Mobile-first
A experiência em smartphones deve ser priorizada:

carregamento rápido;
botões grandes;
navegação simplificada;
manter o progresso visível;
permitir voltar à pergunta anterior;
layout com foco em leitura fácil;
não depender somente de cores para transmitir informação.
♿ Acessibilidade
O sistema deve seguir boas práticas de acessibilidade para pessoas com diferentes necessidades.

Implementações esperadas
navegação por teclado;
foco visível;
HTML semântico;
atributos ARIA quando necessários;
contraste adequado;
textos legíveis;
botões grandes e áreas de toque confortáveis;
suporte a leitores de tela;
utilização de linguagem simples;
compatibilidade com celulares e telas pequenas;
suporte a aumento de fonte;
feedback visual e textual em ações importantes.
🔐 Privacidade e Segurança
O sistema não deve solicitar informações pessoais desnecessárias para a triagem básica, como:

nome;
CPF;
cartão SUS;
endereço residencial;
diagnóstico;
medicamentos;
dados médicos pessoais.
Se histórico for implementado futuramente, ele deve ser opcional e, inicialmente, pode ser armazenado apenas localmente no dispositivo.

A plataforma deve respeitar:

uso mínimo de dados;
consentimento explícito para informações extras;
limitações éticas na coleta de dados;
ausência de diagnóstico médico;
ausência de prescrição de tratamento.
⚠️ Tratamento de Erros
O sistema deve incluir estados para cenários comuns, como:

API indisponível;
erro ao carregar perguntas;
erro ao buscar unidades;
localização negada;
nenhuma unidade encontrada;
serviço indisponível.
Exemplo de mensagem
Não conseguimos encontrar unidades próximas agora.

E sempre oferecer opções como:

pesquisar por endereço;
tentar novamente;
voltar para a página anterior.
Nunca deixar o usuário preso em uma tela de erro.

🧪 Qualidade de Código
O projeto deve seguir boas práticas de desenvolvimento:

arquitetura organizada;
separação de responsabilidades;
DTOs;
services;
repositories;
controllers;
validação de dados;
tratamento global de exceções;
documentação da API;
variáveis de ambiente;
componentes reutilizáveis;
nomes claros;
código desacoplado e fácil de evoluir;
uso de Swagger/OpenAPI.
🐳 Docker
A execução do projeto deve ser preparada com Docker para facilitar desenvolvimento e implantação.

docker-compose.yml
├── frontend
├── backend
├── postgres
├── redis (futuro)
└── variáveis de ambiente
Objetivos
padronizar ambiente local;
facilitar execução do backend e banco;
preparar a aplicação para deploy em ambiente real;
evitar credenciais fixas no código.
🧰 Pré-requisitos
Antes de iniciar o projeto, certifique-se de ter instalado:

Node.js 18 ou superior
npm, pnpm, yarn ou bun
Java 21+
Maven ou Gradle
PostgreSQL 16+
Docker e Docker Compose
🚀 Instalação e Execução
Frontend
cd frontend
npm install
npm run dev
Acesse:

http://localhost:3000
Backend
cd backend
./mvnw clean install
./mvnw spring-boot:run
Banco de dados
Crie um banco PostgreSQL e configure as variáveis de ambiente no arquivo .env ou .env.local.

Docker Compose
docker-compose up --build
🌐 Variáveis de Ambiente
Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_TENANT_ID=default
NEXT_PUBLIC_USE_MOCK=false
Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/fluxosaude
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=seu_secret_aqui
SERVER_PORT=8080
Nunca armazenar credenciais sensíveis diretamente no código-fonte. Usar sempre variáveis de ambiente.

📚 Documentação da API
A API deve possuir documentação automática usando Swagger/OpenAPI, facilitando uso e integração com outros serviços.

Exemplo:

http://localhost:8080/swagger-ui/index.html
🧭 Futuras Integrações
A arquitetura deve estar preparada para evolução com:

localização das UBS, UPA e hospitais;
mapas interativos;
horários oficiais;
serviços disponíveis;
telefones;
dados oficiais das Secretarias de Saúde;
lotação e tempo de espera, quando houver integração oficial;
agendamento;
histórico de orientações;
notificações;
vacinação;
integração com serviços municipais;
APIs públicas e fontes oficiais.
Quando dados oficiais não estiverem disponíveis, a aplicação deve identificar claramente que a informação é uma demonstração ou mock de apoio.

📊 Dashboard Administrativo Futuro
Estrutura sugerida:

Dashboard
├── Unidades
│   ├── UBS
│   ├── UPA
│   └── Hospitais
├── Serviços
├── Horários
├── Perguntas
├── Regras da triagem
├── Integrações
└── Indicadores
Indicadores esperados
quantidade de unidades cadastradas;
quantidade de UBS;
quantidade de UPA;
quantidade de hospitais;
quantidade de orientações realizadas;
unidades ativas;
unidades com informação desatualizada;
utilização geral da plataforma.
Esses indicadores não devem ser apresentados como diagnósticos médicos, apenas como dados de gestão da plataforma.

🚨 Situações de Emergência
O Fluxo Saúde deve orientar com cuidado e responsabilidade:

se houver risco imediato à vida, procurar atendimento de urgência imediatamente;
quando apropriado, acionar o SAMU 192;
manter foco em orientação e sinalização, sem diagnosticar;
nunca desestimular atenção profissional.
Mensagem orientativa:

Se houver risco à vida, procure atendimento de emergência imediatamente e acione o SAMU 192 quando apropriado.

🧾 Mensagens de Segurança do Produto
A comunicação do sistema deve sempre respeitar a limitação da ferramenta. Exemplos:

"A UBS pode ser um serviço mais adequado."
"Os sinais informados podem indicar necessidade de avaliação rápida."
"Em caso de dúvida, procure avaliação profissional."
"Esta orientação não substitui uma avaliação profissional."
Nunca usar frases como:

"Você não precisa ir ao médico."
"Você está com uma emergência."
"Você não precisa de atendimento."
🧱 Componentes Reutilizáveis do Frontend
Para manter consistência e reduzir duplicação, o frontend deve conter componentes reutilizáveis, como:

Header
Footer
ServiceCard
QuestionCard
AnswerButton
ProgressBar
ResultCard
EmergencyAlert
UnitCard
UnitStatusBadge
ServiceBadge
SearchUnit
AccessibilityMenu
LoadingState
ErrorState
EmptyState
✅ Resultado Esperado
O produto final deve se configurar como um sistema completo de orientação ao cidadão, com:

página inicial;
escolha entre UPA, UBS e orientação;
fluxo de emergência;
orientação para SAMU 192 em situações adequadas;
triagem adaptativa;
barra de progresso;
resultado orientativo;
explicação do resultado;
diferenciação entre UBS, UPA, SAMU e hospital;
busca de unidades;
página de detalhes da unidade;
serviços disponíveis;
horários e telefones;
localização e preparação para mapas;
painel administrativo;
backend REST;
PostgreSQL;
estrutura preparada para PostGIS;
Docker;
acessibilidade;
segurança e privacidade;
arquitetura pronta para integrações oficiais.
📝 Conclusão
O Fluxo Saúde é uma solução digital voltada ao atendimento cidadão, com foco em clareza, acessibilidade, responsabilidade e eficiência. Seu propósito principal é orientar a população na rede de atenção à saúde sem diagnosticar, sem prescrever e sem substituir a avaliação profissional.

O projeto deve ser visto como uma plataforma profissional, escalável e sustentável, com forte potencial de expansão para municípios, secretarias e organizações de saúde, sempre mantendo a segurança da informação e o respeito às regras de orientação médica.

📄 Licença
Este projeto foi desenvolvido com foco em impacto social, acessibilidade e melhoria da experiência de encaminhamento na rede pública de saúde. Consulte a licença do repositório para informações detalhadas sobre uso e distribuição.
