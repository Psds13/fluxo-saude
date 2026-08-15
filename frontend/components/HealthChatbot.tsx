'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Volume2,
  Sparkles,
  Shield,
  Globe,
  Search,
  Check,
  ChevronDown,
  Siren,
  PhoneCall,
} from 'lucide-react';
import { useAccessibility, LISTA_IDIOMAS } from './AccessibilityContext';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  recommendation?: 'UBS' | 'UPA' | 'SAMU';
  time: string;
}

const RESPOSTAS: Record<string, { urgente: string; media: string; baixa: string }> = {
  'pt-BR': {
    urgente: '🚨 Os sintomas relatados indicam uma possível emergência médica grave. Ligue imediatamente para o SAMU 192 ou dirija-se à emergência mais próxima. Não espere!',
    media: '🟡 Para os sintomas relatados, o serviço mais indicado é a UPA 24h (Unidade de Pronto Atendimento). Ela atende urgências médicas sem necessidade de agendamento.',
    baixa: '🟢 Para sua situação, a UBS (Unidade Básica de Saúde / Posto de Saúde) do seu bairro é o local ideal. Ela atende consultas, vacinação, receitas e acompanhamento.',
  },
  'en-US': {
    urgente: '🚨 The symptoms described suggest a possible medical emergency. Call 192 (SAMU) immediately or go to the nearest emergency room. Do not wait!',
    media: '🟡 For the symptoms described, the recommended service is the UPA 24h (Emergency Care Unit). It handles urgent cases without an appointment.',
    baixa: '🟢 For your situation, the nearest UBS (Basic Health Unit / Community Clinic) is the ideal place. It handles consultations, vaccinations, prescriptions and follow-up care.',
  },
  'es-ES': {
    urgente: '🚨 Los síntomas descritos indican una posible emergencia médica grave. Llame al 192 (SAMU) inmediatamente o vaya a urgencias. ¡No espere!',
    media: '🟡 Para los síntomas descritos, el servicio más adecuado es la UPA 24h (Unidad de Pronto Atención). Atiende urgencias sin cita previa.',
    baixa: '🟢 Para su situación, la UBS (Unidad Básica de Salud) de su barrio es el lugar ideal. Atiende consultas, vacunación, recetas y seguimiento.',
  },
  'fr-FR': {
    urgente: "🚨 Les symptômes décrits indiquent une possible urgence médicale grave. Appelez le 192 (SAMU) immédiatement ou rendez-vous aux urgences. N'attendez pas!",
    media: "🟡 Pour les symptômes décrits, le service recommandé est l'UPA 24h (Unité de Soins d'Urgence). Elle prend en charge les urgences sans rendez-vous.",
    baixa: "🟢 Pour votre situation, l'UBS (Unité de Base de Santé) de votre quartier est l'endroit idéal. Elle gère les consultations, vaccinations, ordonnances et le suivi.",
  },
  'de-DE': {
    urgente: '🚨 Die beschriebenen Symptome deuten auf einen möglichen medizinischen Notfall hin. Rufen Sie sofort 192 (SAMU) an oder begeben Sie sich in die nächste Notaufnahme!',
    media: '🟡 Für die beschriebenen Symptome wird die UPA 24h (Notfallstation) empfohlen. Sie behandelt Notfälle ohne Termin.',
    baixa: '🟢 Für Ihre Situation ist die UBS (Basisgesundheitsstation) in Ihrer Nähe ideal. Sie bietet Konsultationen, Impfungen, Rezepte und Nachsorge.',
  },
  'zh-CN': {
    urgente: '🚨 所述症状表明可能存在严重医疗紧急情况。请立即拨打192（SAMU）或前往最近的急诊室。不要等待！',
    media: '🟡 根据所述症状，推荐前往UPA 24小时急救中心。无需预约即可就诊。',
    baixa: '🟢 对于您的情况，附近的UBS（社区卫生站）是理想的就诊地点，提供咨询、疫苗接种、处方和随访服务。',
  },
  'ja-JP': {
    urgente: '🚨 説明された症状は深刻な医療緊急事態の可能性を示しています。すぐに192（SAMU）に電話するか、最寄りの救急に行ってください！',
    media: '🟡 説明された症状には、UPA 24時間救急医療センターが推奨されます。予約なしで対応します。',
    baixa: '🟢 あなたの状況には、最寄りのUBS（基本保健センター）が理想的です。診察、予防接種、処方箋、フォローアップに対応しています。',
  },
  'ko-KR': {
    urgente: '🚨 설명된 증상은 심각한 의료 응급 상황일 가능성이 있습니다. 즉시 192(SAMU)에 전화하거나 가까운 응급실로 가십시오!',
    media: '🟡 설명된 증상의 경우 UPA 24시간 응급 의료 센터를 권장합니다. 예약 없이 이용 가능합니다.',
    baixa: '🟢 귀하의 상황에는 가까운 UBS(기초 건강 센터)가 이상적입니다. 상담, 예방 접종, 처방전 및 추적 관찰을 제공합니다.',
  },
  'hi-IN': {
    urgente: '🚨 वर्णित लक्षण संभावित गंभीर चिकित्सा आपातस्थिति का संकेत देते हैं। तुरंत 192 (SAMU) पर कॉल करें या निकटतम आपातकालीन कक्ष जाएं!',
    media: '🟡 वर्णित लक्षणों के लिए, UPA 24h (तत्काल देखभाल केंद्र) की सिफारिश की जाती है। यह बिना अपॉइंटमेंट के तत्काल मामलों को संभालता है।',
    baixa: '🟢 आपकी स्थिति के लिए, नजदीकी UBS (बेसिक हेल्थ यूनिट) आदर्श स्थान है। यह परामर्श, टीकाकरण, नुस्खे और अनुवर्ती देखभाल प्रदान करता है।',
  },
  'ar-SA': {
    urgente: '🚨 الأعراض الموصوفة تشير إلى حالة طبية طارئة محتملة. اتصل بـ 192 (SAMU) فوراً أو اذهب إلى أقرب غرفة طوارئ!',
    media: '🟡 للأعراض الموصوفة، يُنصح بالتوجه إلى مركز الرعاية العاجلة UPA 24h. يعالج الحالات العاجلة دون موعد مسبق.',
    baixa: '🟢 لحالتك، وحدة الصحة الأساسية UBS الأقرب إليك هي المكان المثالي. تقدم استشارات، تطعيمات، وصفات طبية ومتابعة.',
  },
  'ru-RU': {
    urgente: '🚨 Описанные симптомы указывают на возможную серьёзную медицинскую ситуацию. Немедленно позвоните 192 (SAMU) или отправляйтесь в ближайшее отделение неотложной помощи!',
    media: '🟡 Для описанных симптомов рекомендуется UPA 24h (Центр неотложной помощи). Принимает без записи.',
    baixa: '🟢 Для вашей ситуации ближайший UBS (Базовый центр здоровья) является идеальным местом. Предоставляет консультации, вакцинацию, рецепты и наблюдение.',
  },
};

const getMsgForIdioma = (code: string, tipo: 'urgente' | 'media' | 'baixa'): string => {
  const base = code.split('-')[0];
  for (const key of [code, `${base}-${base.toUpperCase()}`, `${base}-BR`]) {
    if (RESPOSTAS[key]) return RESPOSTAS[key][tipo];
  }
  return RESPOSTAS['pt-BR'][tipo];
};

const WELCOME_MSGS: Record<string, string> = {
  'pt-BR': 'Olá! Sou o assistente virtual do Fluxo Saúde 👋 Descreva seus sintomas ou dúvidas para eu orientar qual serviço de saúde procurar.',
  'en-US': "Hello! I'm the Fluxo Saúde virtual assistant 👋 Describe your symptoms or questions so I can guide you to the right health service.",
  'es-ES': '¡Hola! Soy el asistente virtual de Fluxo Saúde 👋 Describe tus síntomas o dudas para orientarte al servicio de salud adecuado.',
  'fr-FR': "Bonjour! Je suis l'assistant virtuel de Fluxo Saúde 👋 Décrivez vos symptômes ou questions pour vous guider vers le bon service de santé.",
  'de-DE': 'Hallo! Ich bin der virtuelle Assistent von Fluxo Saúde 👋 Beschreiben Sie Ihre Symptome oder Fragen, damit ich Sie zum richtigen Gesundheitsdienst leiten kann.',
  'zh-CN': '您好！我是Fluxo Saúde的虚拟助手 👋 请描述您的症状或问题，我将为您指引适合的医疗服务。',
  'ja-JP': 'こんにちは！Fluxo Saúdeの仮想アシスタントです 👋 症状や質問を説明してください。適切な医療サービスに案内します。',
  'ko-KR': '안녕하세요! Fluxo Saúde 가상 도우미입니다 👋 증상이나 질문을 설명해 주시면 적절한 의료 서비스로 안내해 드립니다.',
  'hi-IN': 'नमस्ते! मैं Fluxo Saúde का आभासी सहायक हूं 👋 अपने लक्षण या प्रश्न बताएं ताकि मैं आपको सही स्वास्थ्य सेवा की ओर मार्गदर्शन कर सकूं।',
  'ar-SA': '!مرحباً! أنا المساعد الافتراضي لـ Fluxo Saúde 👋 صف أعراضك أو أسئلتك لأرشدك إلى الخدمة الصحية المناسبة',
  'ru-RU': 'Здравствуйте! Я виртуальный ассистент Fluxo Saúde 👋 Опишите свои симптомы или вопросы, и я направлю вас к нужной медицинской службе.',
};

const getWelcome = (code: string) => {
  const base = code.split('-')[0];
  return WELCOME_MSGS[code] || WELCOME_MSGS[`${base}-BR`] || WELCOME_MSGS['pt-BR'];
};

export default function HealthChatbot() {
  const [aberto, setAberto] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [carregandoIA, setCarregandoIA] = useState(false);
  const [menuIdiomaAberto, setMenuIdiomaAberto] = useState(false);
  const [buscaIdioma, setBuscaIdioma] = useState('');
  const { idioma, setIdioma, falarTexto } = useAccessibility();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const idiomaAtual = LISTA_IDIOMAS.find((i) => i.code === idioma) || LISTA_IDIOMAS[0];
  const idiomasFiltrados = LISTA_IDIOMAS.filter(
    (i) =>
      i.name.toLowerCase().includes(buscaIdioma.toLowerCase()) ||
      i.code.toLowerCase().includes(buscaIdioma.toLowerCase())
  );

  const [mensagens, setMensagens] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: getWelcome(idioma),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Atualiza a mensagem de boas-vindas quando o idioma mudar
  useEffect(() => {
    setMensagens([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: getWelcome(idioma),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [idioma]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, carregandoIA]);

  const analisarSintomas = (texto: string): { tipo: 'urgente' | 'media' | 'baixa'; recomendacao: 'UBS' | 'UPA' | 'SAMU' } => {
    const t = texto.toLowerCase();
    if (
      t.includes('desmaio') || t.includes('inconsciente') || t.includes('dor no peito') ||
      t.includes('infarto') || t.includes('chest pain') || t.includes('faint') ||
      t.includes('avc') || t.includes('derrame') || t.includes('convulsão') ||
      t.includes('convulsion') || t.includes('sangramento') || t.includes('stroke') ||
      t.includes('tidak sadar') || t.includes('saignement') || t.includes('无意识') ||
      t.includes('胸痛') || t.includes('意識不明') || t.includes('失去意识')
    ) {
      return { tipo: 'urgente', recomendacao: 'SAMU' };
    }
    if (
      t.includes('febre') || t.includes('fever') || t.includes('fiebre') ||
      t.includes('dor intensa') || t.includes('severe pain') || t.includes('corte') ||
      t.includes('cut') || t.includes('queimadura') || t.includes('burn') ||
      t.includes('fratura') || t.includes('fracture') || t.includes('vômito') ||
      t.includes('pressão alta') || t.includes('falta de ar') || t.includes('shortness') ||
      t.includes('高烧') || t.includes('高熱') || t.includes('고열')
    ) {
      return { tipo: 'media', recomendacao: 'UPA' };
    }
    return { tipo: 'baixa', recomendacao: 'UBS' };
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMensagens((prev) => [...prev, userMsg]);
    const textoAnalise = inputMessage;
    setInputMessage('');
    setCarregandoIA(true);

    setTimeout(() => {
      const { tipo, recomendacao } = analisarSintomas(textoAnalise);
      const textoResposta = getMsgForIdioma(idioma, tipo);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: textoResposta,
        recommendation: recomendacao,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMensagens((prev) => [...prev, botMsg]);
      setCarregandoIA(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Botão Flutuante Premium */}
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          aria-label="Abrir Assistente de Saúde"
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold shadow-2xl shadow-sky-500/30 transition-all hover:scale-105 active:scale-95 border border-white/20"
        >
          {/* Anel pulsante */}
          <span className="absolute inset-0 rounded-2xl bg-sky-400/20 animate-ping opacity-60" />
          <div className="relative w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-sky-600 shadow-sm" />
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <span className="text-[11px] text-sky-200 block font-medium">Fluxo Saúde</span>
            <span className="text-sm font-extrabold">Assistente IA</span>
          </div>
        </button>
      )}

      {/* Janela de Chat */}
      {aberto && (
        <div className="w-[22rem] sm:w-96 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[580px]">
          {/* Header do Chat */}
          <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 p-4 text-white flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                    Assistente SUS <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                  <p className="text-[11px] text-sky-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Triagem Inteligente por IA
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAberto(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Seletor de Idioma Embutido no Chat */}
            <div className="relative">
              <button
                onClick={() => setMenuIdiomaAberto(!menuIdiomaAberto)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold transition"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-sky-300" />
                  <span className="w-5 h-5 rounded-full bg-sky-600/60 text-white font-extrabold text-[10px] flex items-center justify-center">
                    {idiomaAtual.badge}
                  </span>
                  <span className="text-sky-100">{idiomaAtual.name}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-sky-300 transition-transform ${menuIdiomaAberto ? 'rotate-180' : ''}`} />
              </button>

              {menuIdiomaAberto && (
                <div className="absolute left-0 right-0 top-11 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-2 max-h-56 overflow-hidden flex flex-col">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Pesquisar idioma..."
                      value={buscaIdioma}
                      onChange={(e) => setBuscaIdioma(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-800 border border-slate-700 outline-none focus:ring-1 focus:ring-sky-500 text-slate-100"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto space-y-0.5 flex-1">
                    {idiomasFiltrados.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setIdioma(item.code);
                          setMenuIdiomaAberto(false);
                          setBuscaIdioma('');
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition ${
                          idioma === item.code
                            ? 'bg-sky-700 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {item.badge}
                          </span>
                          <span className="truncate">{item.name}</span>
                        </div>
                        {idioma === item.code && <Check className="w-3.5 h-3.5 text-sky-300 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {/* Aviso de Segurança */}
            <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Esta ferramenta não substitui consulta médica. Em emergências graves, ligue 192.</span>
            </div>

            {mensagens.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[88%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-sky-600 to-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs">{msg.text}</p>

                  {/* Botões de Ação da IA */}
                  {msg.recommendation && (
                    <div className="mt-3 pt-2 border-t border-white/20 space-y-1.5">
                      {msg.recommendation === 'SAMU' && (
                        <a
                          href="tel:192"
                          className="flex items-center justify-center gap-2 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl transition text-[11px] shadow"
                        >
                          <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                          LIGAR SAMU 192 AGORA
                        </a>
                      )}
                      {msg.recommendation === 'UPA' && (
                        <Link
                          href="/unidades?tipo=UPA"
                          onClick={() => setAberto(false)}
                          className="flex items-center justify-center gap-2 py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl transition text-[11px] shadow"
                        >
                          📍 Ver UPAs 24h Próximas
                        </Link>
                      )}
                      {msg.recommendation === 'UBS' && (
                        <Link
                          href="/unidades?tipo=UBS"
                          onClick={() => setAberto(false)}
                          className="flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition text-[11px] shadow"
                        >
                          📍 Ver Postos UBS Próximos
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-slate-400">
                  <span>{msg.time}</span>
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => falarTexto(msg.text.replace(/[*_#🚨🟡🟢📍]/g, ''))}
                      className="hover:text-sky-600 transition"
                      title="Ouvir mensagem"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {carregandoIA && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs w-40 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Analisando...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Campo de Envio */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 flex-shrink-0">
            <input
              type="text"
              placeholder={idioma === 'en-US' ? 'Describe your symptoms...' : idioma === 'es-ES' ? 'Describe tus síntomas...' : 'Descreva seus sintomas...'}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2.5 text-xs rounded-xl bg-slate-100 border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            />
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:opacity-40 text-white transition shadow shrink-0"
              aria-label="Enviar"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
