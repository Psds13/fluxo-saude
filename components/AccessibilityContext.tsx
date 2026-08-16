'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type TamanhoFonte = 'normal' | 'grande' | 'extragrande' | 'gigante';
export type EspacamentoTexto = 'normal' | 'moderado' | 'expandido';
export type ModoCor = 'padrao' | 'alto-contraste' | 'inverter-cores' | 'monocromatico' | 'escuro';
export type PerfilAcessibilidade = 'nenhum' | 'motora' | 'cego' | 'visaoReduzida' | 'tdah' | 'epilepsia' | 'dislexia';

export interface IdiomaOption {
  code: string;
  badge: string;
  name: string;
  speechLang: string;
  googleCode: string;
}

export const LISTA_IDIOMAS: IdiomaOption[] = [
  { code: 'pt-BR', badge: 'PT', name: 'Português (Brasil)', speechLang: 'pt-BR', googleCode: 'pt' },
  { code: 'pt-PT', badge: 'PT', name: 'Português (Portugal)', speechLang: 'pt-PT', googleCode: 'pt' },
  { code: 'en-US', badge: 'US', name: 'English (USA)', speechLang: 'en-US', googleCode: 'en' },
  { code: 'es-ES', badge: 'ES', name: 'Español (España)', speechLang: 'es-ES', googleCode: 'es' },
  { code: 'zh-CN', badge: 'CN', name: '简体中文 (Chinese Simplified)', speechLang: 'zh-CN', googleCode: 'zh-CN' },
  { code: 'zh-TW', badge: 'TW', name: '繁體中文 (Chinese Traditional)', speechLang: 'zh-TW', googleCode: 'zh-TW' },
  { code: 'ja-JP', badge: 'JP', name: '日本語 (Japanese)', speechLang: 'ja-JP', googleCode: 'ja' },
  { code: 'ko-KR', badge: 'KR', name: '한국어 (Korean)', speechLang: 'ko-KR', googleCode: 'ko' },
  { code: 'hi-IN', badge: 'HI', name: 'हिन्दी (Hindi - India)', speechLang: 'hi-IN', googleCode: 'hi' },
  { code: 'bn-BD', badge: 'BN', name: 'বাংলা (Bengali)', speechLang: 'bn-BD', googleCode: 'bn' },
  { code: 'ta-IN', badge: 'TA', name: 'தமிழ் (Tamil)', speechLang: 'ta-IN', googleCode: 'ta' },
  { code: 'te-IN', badge: 'TE', name: 'తెలుగు (Telugu)', speechLang: 'te-IN', googleCode: 'te' },
  { code: 'pa-IN', badge: 'PA', name: 'ਪੰਜਾਬੀ (Punjabi)', speechLang: 'pa-IN', googleCode: 'pa' },
  { code: 'fr-FR', badge: 'FR', name: 'Français (France)', speechLang: 'fr-FR', googleCode: 'fr' },
  { code: 'de-DE', badge: 'DE', name: 'Deutsch (Deutschland)', speechLang: 'de-DE', googleCode: 'de' },
  { code: 'it-IT', badge: 'IT', name: 'Italiano (Italia)', speechLang: 'it-IT', googleCode: 'it' },
  { code: 'ar-SA', badge: 'AR', name: 'العربية (Arabic)', speechLang: 'ar-SA', googleCode: 'ar' },
  { code: 'ru-RU', badge: 'RU', name: 'Русский (Russian)', speechLang: 'ru-RU', googleCode: 'ru' },
  { code: 'uk-UA', badge: 'UA', name: 'Українська (Ukrainian)', speechLang: 'uk-UA', googleCode: 'uk' },
  { code: 'nl-NL', badge: 'NL', name: 'Nederlands (Dutch)', speechLang: 'nl-NL', googleCode: 'nl' },
  { code: 'pl-PL', badge: 'PL', name: 'Polski (Polish)', speechLang: 'pl-PL', googleCode: 'pl' },
  { code: 'tr-TR', badge: 'TR', name: 'Türkçe (Turkish)', speechLang: 'tr-TR', googleCode: 'tr' },
  { code: 'el-GR', badge: 'EL', name: 'Ελληνικά (Greek)', speechLang: 'el-GR', googleCode: 'el' },
  { code: 'he-IL', badge: 'HE', name: 'עברית (Hebrew)', speechLang: 'he-IL', googleCode: 'iw' },
  { code: 'th-TH', badge: 'TH', name: 'ไทย (Thai)', speechLang: 'th-TH', googleCode: 'th' },
  { code: 'vi-VN', badge: 'VI', name: 'Tiếng Việt (Vietnamese)', speechLang: 'vi-VN', googleCode: 'vi' },
  { code: 'sw-KE', badge: 'SW', name: 'Kiswahili (Swahili)', speechLang: 'sw-KE', googleCode: 'sw' },
  { code: 'haw-US', badge: 'HW', name: 'ʻŌlelo Hawaiʻi (Hawaiian)', speechLang: 'en-US', googleCode: 'haw' },
  { code: 'is-IS', badge: 'IS', name: 'Íslenska (Icelandic)', speechLang: 'is-IS', googleCode: 'is' },
  { code: 'mi-NZ', badge: 'MI', name: 'Te Reo Māori (Maori)', speechLang: 'en-NZ', googleCode: 'mi' },
  { code: 'la-VA', badge: 'LA', name: 'Latina (Latin)', speechLang: 'it-IT', googleCode: 'la' },
  { code: 'eo-EU', badge: 'EO', name: 'Esperanto', speechLang: 'eo', googleCode: 'eo' },
  { code: 'cy-GB', badge: 'CY', name: 'Cymraeg (Welsh)', speechLang: 'cy-GB', googleCode: 'cy' },
  { code: 'ga-IE', badge: 'GA', name: 'Gaeilge (Irish Gaelic)', speechLang: 'ga-IE', googleCode: 'ga' },
  { code: 'az-AZ', badge: 'AZ', name: 'Azerbaijani (Azeri)', speechLang: 'az-AZ', googleCode: 'az' },
  { code: 'id-ID', badge: 'ID', name: 'Bahasa Indonesia', speechLang: 'id-ID', googleCode: 'id' },
  { code: 'eu-ES', badge: 'EU', name: 'Euskara (Basque)', speechLang: 'eu-ES', googleCode: 'eu' },
  { code: 'ca-ES', badge: 'CA', name: 'Català (Catalan)', speechLang: 'ca-ES', googleCode: 'ca' },
  { code: 'ce-PH', badge: 'CE', name: 'Cebuano (Filipino)', speechLang: 'fil-PH', googleCode: 'ceb' },
  { code: 'mn-MN', badge: 'MN', name: 'Монгол (Mongolian)', speechLang: 'mn-MN', googleCode: 'mn' },
  { code: 'yi-DE', badge: 'YI', name: 'ייִדיש (Yiddish)', speechLang: 'de-DE', googleCode: 'yi' },
  { code: 'fa-IR', badge: 'FA', name: 'فارسی (Persian/Farsi)', speechLang: 'fa-IR', googleCode: 'fa' },
];

// Dicionário de Traduções i18n para os elementos da tela
export const DICTIONARY: Record<string, Record<string, string>> = {
  acessibilidade: {
    'pt-BR': 'Acessibilidade',
    'en-US': 'Accessibility',
    'es-ES': 'Accesibilidad',
    'zh-CN': '无障碍',
    'zh-TW': '無障礙',
    'ja-JP': 'アクセシビリティ',
    'ko-KR': '접근성',
    'hi-IN': 'सुगम्यता',
    'fr-FR': 'Accessibilité',
    'de-DE': 'Barrierefreiheit',
    'it-IT': 'Accessibilità',
    'ru-RU': 'Доступность',
    'ar-SA': 'إمكانية الوصول',
  },
  inicio: {
    'pt-BR': 'Início',
    'en-US': 'Home',
    'es-ES': 'Inicio',
    'zh-CN': '首页',
    'zh-TW': '首頁',
    'ja-JP': 'ホーム',
    'ko-KR': '홈',
    'hi-IN': 'मुख्य पृष्ठ',
    'fr-FR': 'Accueil',
    'de-DE': 'Startseite',
  },
  encontrar_unidades: {
    'pt-BR': 'Encontrar Unidades',
    'en-US': 'Find Health Centers',
    'es-ES': 'Buscar Unidades',
    'zh-CN': '查找医疗中心',
    'zh-TW': '尋找醫療中心',
    'ja-JP': '医療機関を検索',
    'ko-KR': '진료소 찾기',
    'hi-IN': 'स्वास्थ्य केंद्र खोजें',
    'fr-FR': 'Trouver des centres',
    'de-DE': 'Einrichtungen finden',
  },
  entenda_diferencas: {
    'pt-BR': 'Entenda UBS x UPA x SAMU',
    'en-US': 'Understand UBS vs UPA vs SAMU',
    'es-ES': 'Entender UBS vs UPA vs SAMU',
    'zh-CN': '了解 UBS / UPA / SAMU 区别',
    'zh-TW': '了解 UBS / UPA / SAMU 區別',
    'ja-JP': 'UBS vs UPA vs SAMU の違い',
    'ko-KR': 'UBS / UPA / SAMU 차이점',
    'hi-IN': 'UBS x UPA x SAMU अंतर समझें',
  },
  painel_gestor: {
    'pt-BR': 'Painel Gestor',
    'en-US': 'Admin Panel',
    'es-ES': 'Panel de Gestión',
    'zh-CN': '管理面板',
    'zh-TW': '管理面板',
    'ja-JP': '管理者パネル',
    'ko-KR': '관리자 패널',
    'hi-IN': 'प्रबंधक पैनल',
  },
  iniciar_triagem: {
    'pt-BR': 'Iniciar Triagem Digital',
    'en-US': 'Start Digital Screening',
    'es-ES': 'Iniciar Triaje Digital',
    'zh-CN': '开始数字预检',
    'zh-TW': '開始數位預檢',
    'ja-JP': 'デジタル問診を開始',
    'ko-KR': '디지털 증상 진단 시작',
    'hi-IN': 'डिजिटल जांच शुरू करें',
    'fr-FR': 'Démarrer le triage digital',
  },
  emergencia_192: {
    'pt-BR': 'Emergência 192',
    'en-US': 'Emergency 192',
    'es-ES': 'Emergencia 192',
    'zh-CN': '192 紧急救援',
    'zh-TW': '192 緊急救援',
    'ja-JP': '192 緊急通報',
    'ko-KR': '192 긴급 출동',
    'hi-IN': '192 आपातकालीन',
  },
  ler_conteudo: {
    'pt-BR': 'Ler Conteúdo da Página',
    'en-US': 'Read Page Content',
    'es-ES': 'Leer Contenido de la Página',
    'zh-CN': '朗读页面内容',
    'zh-TW': '朗讀頁面內容',
    'ja-JP': 'ページ内容を読み上げる',
    'ko-KR': '페이지 내용 읽기',
    'hi-IN': 'पृष्ठ सामग्री पढ़ें',
  },
  parar_leitura: {
    'pt-BR': 'Desligar / Parar Leitura',
    'en-US': 'Stop Reading',
    'es-ES': 'Detener Lectura',
    'zh-CN': '停止朗读',
    'zh-TW': '停止朗讀',
    'ja-JP': '読み上げを停止',
    'ko-KR': '읽기 중지',
    'hi-IN': 'पढ़ना बंद करें',
  },
  pesquise_idioma: {
    'pt-BR': 'Pesquise o idioma',
    'en-US': 'Search language',
    'es-ES': 'Buscar idioma',
    'zh-CN': '搜索语言',
    'zh-TW': '搜尋語言',
    'ja-JP': '言語を検索',
    'ko-KR': '언어 검색',
    'hi-IN': 'भाषा खोजें',
  },
  redefinir_tudo: {
    'pt-BR': 'Redefinir todas as configurações',
    'en-US': 'Reset all settings',
    'es-ES': 'Restablecer todas las opciones',
    'zh-CN': '重置所有设置',
    'zh-TW': '重置所有設定',
    'ja-JP': 'すべての設定をリセット',
    'ko-KR': '모든 설정 초기화',
    'hi-IN': 'सभी सेटिंग्स रीसेट करें',
  },
};

interface AccessibilityContextType {
  // Perfis UserWay
  perfilAtivo: PerfilAcessibilidade;
  ativarPerfil: (perfil: PerfilAcessibilidade) => void;

  // Idioma & i18n
  idioma: string;
  setIdioma: (code: string) => void;
  t: (chave: string, defaultText?: string) => string;

  // Aparência & Leitura
  modoCor: ModoCor;
  setModoCor: (modo: ModoCor) => void;
  altoContraste: boolean;
  toggleAltoContraste: () => void;
  tamanhoFonte: TamanhoFonte;
  setTamanhoFonte: (tamanho: TamanhoFonte) => void;
  aumentarFonte: () => void;
  diminuirFonte: () => void;
  resetarFonte: () => void;
  espacamentoTexto: EspacamentoTexto;
  setEspacamentoTexto: (espacamento: EspacamentoTexto) => void;
  fonteDislexia: boolean;
  toggleFonteDislexia: () => void;

  // Ferramentas de Assistência
  cursorGrande: boolean;
  toggleCursorGrande: () => void;
  guiaLeitura: boolean;
  toggleGuiaLeitura: () => void;
  pausarAnimacoes: boolean;
  togglePausarAnimacoes: () => void;
  destacarLinks: boolean;
  toggleDestacarLinks: () => void;

  // Áudio & Síntese de Voz
  leitorVoz: boolean;
  toggleLeitorVoz: () => void;
  falarTexto: (texto: string) => void;
  pararFala: () => void;
  lerPaginaInteira: () => void;
  toggleLerConteudo: () => void;
  estaFalando: boolean;

  // Reset Geral
  resetarTudo: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [idioma, setIdiomaState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fluxo_saude_idioma') || 'pt-BR';
    }
    return 'pt-BR';
  });

  const [perfilAtivo, setPerfilAtivo] = useState<PerfilAcessibilidade>('nenhum');

  const [modoCor, setModoCorState] = useState<ModoCor>(() => {
    if (typeof window !== 'undefined') {
      const savedContraste = localStorage.getItem('fluxo_saude_contraste');
      if (savedContraste === 'true') return 'alto-contraste';
    }
    return 'padrao';
  });

  const [altoContraste, setAltoContraste] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fluxo_saude_contraste') === 'true';
    }
    return false;
  });

  const [tamanhoFonte, setTamanhoFonteState] = useState<TamanhoFonte>(() => {
    if (typeof window !== 'undefined') {
      const savedFonte = localStorage.getItem('fluxo_saude_fonte') as TamanhoFonte;
      if (savedFonte && ['normal', 'grande', 'extragrande', 'gigante'].includes(savedFonte)) {
        return savedFonte;
      }
    }
    return 'normal';
  });

  const [espacamentoTexto, setEspacamentoTextoState] = useState<EspacamentoTexto>('normal');
  const [fonteDislexia, setFonteDislexia] = useState<boolean>(false);

  const [cursorGrande, setCursorGrande] = useState<boolean>(false);
  const [guiaLeitura, setGuiaLeitura] = useState<boolean>(false);
  const [mouseY, setMouseY] = useState<number>(200);
  const [pausarAnimacoes, setPausarAnimacoes] = useState<boolean>(false);
  const [destacarLinks, setDestacarLinks] = useState<boolean>(false);

  const [leitorVoz, setLeitorVoz] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fluxo_saude_leitor_voz') === 'true';
    }
    return false;
  });
  const [estaFalando, setEstaFalando] = useState<boolean>(false);



  // Rastreamento do mouse para a Guia de Leitura
  useEffect(() => {
    if (!guiaLeitura || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [guiaLeitura]);

  // Efeito para tamanho de fonte global (html font-size)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fontScales: Record<TamanhoFonte, string> = {
      normal: '100%',
      grande: '120%',
      extragrande: '140%',
      gigante: '160%',
    };

    document.documentElement.style.fontSize = fontScales[tamanhoFonte] || '100%';
    localStorage.setItem('fluxo_saude_fonte', tamanhoFonte);
  }, [tamanhoFonte]);

  // Efeito para espaçamento de texto
  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.documentElement.classList.remove('text-spacing-moderado', 'text-spacing-expandido');
    if (espacamentoTexto === 'moderado') document.documentElement.classList.add('text-spacing-moderado');
    if (espacamentoTexto === 'expandido') document.documentElement.classList.add('text-spacing-expandido');
  }, [espacamentoTexto]);

  // Efeito para Modo de Cor / Contraste
  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.documentElement.classList.remove('high-contrast', 'color-invert', 'color-monochrome', 'dark-mode');
    document.body.classList.remove('high-contrast', 'color-invert', 'color-monochrome', 'dark-mode');

    if (modoCor === 'alto-contraste' || altoContraste) {
      document.documentElement.classList.add('high-contrast');
      document.body.classList.add('high-contrast');
    } else if (modoCor === 'inverter-cores') {
      document.documentElement.classList.add('color-invert');
    } else if (modoCor === 'monocromatico') {
      document.documentElement.classList.add('color-monochrome');
    } else if (modoCor === 'escuro') {
      document.documentElement.classList.add('dark-mode');
    }

    localStorage.setItem('fluxo_saude_contraste', String(modoCor === 'alto-contraste' || altoContraste));
  }, [modoCor, altoContraste]);

  // Efeito para Fonte Dislexia
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (fonteDislexia) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
  }, [fonteDislexia]);

  // Efeito para Cursor Grande
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (cursorGrande) {
      document.documentElement.classList.add('big-cursor');
    } else {
      document.documentElement.classList.remove('big-cursor');
    }
  }, [cursorGrande]);

  // Efeito para Pausar Animações
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pausarAnimacoes) {
      document.documentElement.classList.add('pause-animations');
    } else {
      document.documentElement.classList.remove('pause-animations');
    }
  }, [pausarAnimacoes]);

  // Efeito para Destacar Links
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (destacarLinks) {
      document.documentElement.classList.add('highlight-links');
    } else {
      document.documentElement.classList.remove('highlight-links');
    }
  }, [destacarLinks]);

  // Ativar Perfil UserWay
  const ativarPerfil = (perfil: PerfilAcessibilidade) => {
    if (perfilAtivo === perfil) {
      setPerfilAtivo('nenhum');
      resetarTudo();
      return;
    }

    setPerfilAtivo(perfil);

    // Reset prévio
    setAltoContraste(false);
    setModoCorState('padrao');
    setTamanhoFonteState('normal');
    setEspacamentoTextoState('normal');
    setFonteDislexia(false);
    setCursorGrande(false);
    setGuiaLeitura(false);
    setPausarAnimacoes(false);
    setDestacarLinks(false);
    setLeitorVoz(false);

    if (perfil === 'motora') {
      setCursorGrande(true);
      setDestacarLinks(true);
      setEspacamentoTextoState('moderado');
    } else if (perfil === 'cego') {
      setLeitorVoz(true);
      setAltoContraste(true);
      setModoCorState('alto-contraste');
      setTamanhoFonteState('extragrande');
    } else if (perfil === 'visaoReduzida') {
      setAltoContraste(true);
      setModoCorState('alto-contraste');
      setTamanhoFonteState('gigante');
    } else if (perfil === 'tdah') {
      setGuiaLeitura(true);
      setPausarAnimacoes(true);
    } else if (perfil === 'epilepsia') {
      setPausarAnimacoes(true);
    } else if (perfil === 'dislexia') {
      setFonteDislexia(true);
      setEspacamentoTextoState('expandido');
    }
  };

  const aplicarTraducaoDOM = useCallback((code: string) => {
    if (typeof window === 'undefined') return;

    const itemIdioma = LISTA_IDIOMAS.find((i) => i.code === code) || LISTA_IDIOMAS[0];
    const targetCode = itemIdioma.googleCode || 'pt';

    const domain = window.location.hostname;
    const cookieValue = `/pt/${targetCode}`;

    if (targetCode === 'pt') {
      document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    } else {
      document.cookie = `googtrans=${cookieValue}; path=/; expires=Thu, 01 Jan 2099 00:00:00 UTC;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain}; expires=Thu, 01 Jan 2099 00:00:00 UTC;`;
    }

    const selectElem = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElem) {
      selectElem.value = targetCode;
      selectElem.dispatchEvent(new Event('change'));
    }
  }, []);

  // Script do Google Translate para tradução inteira da página
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateInit';
      script.async = true;
      document.body.appendChild(script);

      (window as unknown as { googleTranslateInit?: () => void; google?: { translate?: { TranslateElement: new (config: object, id: string) => void } } }).googleTranslateInit = () => {
        const win = window as unknown as { google?: { translate?: { TranslateElement: new (config: object, id: string) => void } } };
        if (win.google && win.google.translate) {
          new win.google.translate.TranslateElement(
            {
              pageLanguage: 'pt',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      };
    }
  }, []);

  const setIdioma = (code: string) => {
    setIdiomaState(code);
    localStorage.setItem('fluxo_saude_idioma', code);
    aplicarTraducaoDOM(code);
  };

  const toggleAltoContraste = () => {
    setAltoContraste((prev) => {
      const next = !prev;
      setModoCorState(next ? 'alto-contraste' : 'padrao');
      return next;
    });
  };

  const setModoCor = (modo: ModoCor) => {
    setModoCorState(modo);
    setAltoContraste(modo === 'alto-contraste');
  };

  const setTamanhoFonte = (tamanho: TamanhoFonte) => {
    setTamanhoFonteState(tamanho);
  };

  const aumentarFonte = () => {
    setTamanhoFonteState((prev) => {
      if (prev === 'normal') return 'grande';
      if (prev === 'grande') return 'extragrande';
      return 'gigante';
    });
  };

  const diminuirFonte = () => {
    setTamanhoFonteState((prev) => {
      if (prev === 'gigante') return 'extragrande';
      if (prev === 'extragrande') return 'grande';
      return 'normal';
    });
  };

  const resetarFonte = () => setTamanhoFonteState('normal');
  const setEspacamentoTexto = (espacamento: EspacamentoTexto) => setEspacamentoTextoState(espacamento);

  const toggleFonteDislexia = () => setFonteDislexia((prev) => !prev);
  const toggleCursorGrande = () => setCursorGrande((prev) => !prev);
  const toggleGuiaLeitura = () => setGuiaLeitura((prev) => !prev);
  const togglePausarAnimacoes = () => setPausarAnimacoes((prev) => !prev);
  const toggleDestacarLinks = () => setDestacarLinks((prev) => !prev);

  // Síntese de Voz com Idioma dinâmico
  const falarTexto = useCallback(
    (texto: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      const textoLimpo = texto?.trim();
      if (!textoLimpo) return;

      try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textoLimpo);
        const langObj = LISTA_IDIOMAS.find((i) => i.code === idioma) || LISTA_IDIOMAS[0];
        utterance.lang = langObj.speechLang;
        utterance.rate = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const selectedVoice = voices.find(
          (v) => v.lang.startsWith(langObj.speechLang.split('-')[0]) || v.lang.includes(langObj.speechLang)
        );
        if (selectedVoice) utterance.voice = selectedVoice;

        setEstaFalando(true);
        utterance.onend = () => setEstaFalando(false);
        utterance.onerror = () => setEstaFalando(false);

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('Erro na síntese de voz:', err);
        setEstaFalando(false);
      }
    },
    [idioma]
  );

  const pararFala = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setEstaFalando(false);
    }
  }, []);

  const toggleLeitorVoz = () => {
    setLeitorVoz((prev) => {
      const next = !prev;
      localStorage.setItem('fluxo_saude_leitor_voz', String(next));
      if (next) {
        falarTexto('Leitor por voz ativado. Passe o cursor sobre os textos para ouvi-los.');
      } else {
        pararFala();
      }
      return next;
    });
  };

  // Efeito global de leitura por hover
  useEffect(() => {
    if (!leitorVoz || typeof window === 'undefined') return;

    let lastSpokenText = '';
    let debounceTimer: NodeJS.Timeout | null = null;

    const handleHoverOrFocus = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      const element =
        (target.closest(
          'button, a, h1, h2, h3, h4, h5, h6, p, label, input, [role="button"], [aria-label], .speech-readable'
        ) as HTMLElement) || target;

      const text = (
        element.getAttribute('aria-label') ||
        element.getAttribute('title') ||
        element.innerText ||
        element.textContent ||
        ''
      ).trim();

      if (text && text !== lastSpokenText && text.length > 1 && text.length < 400) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          lastSpokenText = text;
          falarTexto(text);
        }, 200);
      }
    };

    document.addEventListener('mouseover', handleHoverOrFocus, { passive: true });
    document.addEventListener('focusin', handleHoverOrFocus, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleHoverOrFocus);
      document.removeEventListener('focusin', handleHoverOrFocus);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [leitorVoz, falarTexto]);

  const lerPaginaInteira = useCallback(() => {
    if (typeof window === 'undefined') return;
    const mainElement = document.querySelector('main') || document.body;
    const elementos = Array.from(mainElement.querySelectorAll('h1, h2, h3, p, button'));

    const textos = elementos
      .map((el) => (el as HTMLElement).innerText || (el as HTMLElement).textContent || '')
      .filter((t) => t.trim().length > 3)
      .slice(0, 15);

    if (textos.length > 0) {
      falarTexto(`Iniciando leitura da página. ${textos.join('. ')}`);
    }
  }, [falarTexto]);

  // Alterna o botão "Ler Conteúdo" (se estiver lendo, desliga/para o áudio; se não, inicia)
  const toggleLerConteudo = useCallback(() => {
    if (estaFalando) {
      pararFala();
    } else {
      lerPaginaInteira();
    }
  }, [estaFalando, pararFala, lerPaginaInteira]);

  const resetarTudo = () => {
    setPerfilAtivo('nenhum');
    setAltoContraste(false);
    setModoCorState('padrao');
    setTamanhoFonteState('normal');
    setEspacamentoTextoState('normal');
    setFonteDislexia(false);
    setCursorGrande(false);
    setGuiaLeitura(false);
    setPausarAnimacoes(false);
    setDestacarLinks(false);
    setLeitorVoz(false);
    pararFala();
  };

  // Função de tradução i18n em tela
  const t = useCallback(
    (chave: string, defaultText?: string) => {
      const langKey = idioma || 'pt-BR';
      const dictEntry = DICTIONARY[chave];
      if (dictEntry && dictEntry[langKey]) {
        return dictEntry[langKey];
      }
      return defaultText || chave;
    },
    [idioma]
  );

  return (
    <AccessibilityContext.Provider
      value={{
        perfilAtivo,
        ativarPerfil,
        idioma,
        setIdioma,
        t,
        modoCor,
        setModoCor,
        altoContraste,
        toggleAltoContraste,
        tamanhoFonte,
        setTamanhoFonte,
        aumentarFonte,
        diminuirFonte,
        resetarFonte,
        espacamentoTexto,
        setEspacamentoTexto,
        fonteDislexia,
        toggleFonteDislexia,
        cursorGrande,
        toggleCursorGrande,
        guiaLeitura,
        toggleGuiaLeitura,
        pausarAnimacoes,
        togglePausarAnimacoes,
        destacarLinks,
        toggleDestacarLinks,
        leitorVoz,
        toggleLeitorVoz,
        falarTexto,
        pararFala,
        lerPaginaInteira,
        toggleLerConteudo,
        estaFalando,
        resetarTudo,
      }}
    >
      <div
        className={`${
          modoCor === 'alto-contraste' || altoContraste
            ? 'bg-black text-yellow-300 high-contrast'
            : 'bg-slate-50 text-slate-900'
        } min-h-screen transition-colors duration-200`}
      >
        {/* Guia / Máscara de Leitura Flutuante UserWay */}
        {guiaLeitura && (
          <div
            aria-hidden="true"
            className="fixed pointer-events-none z-9999 left-0 right-0 h-12 border-y-2 border-amber-400 bg-amber-400/20 shadow-2xl transition-all duration-75"
            style={{ top: `${mouseY - 24}px` }}
          />
        )}

        {/* Elemento oculto para tradução automática DOM de 100% da página */}
        <div id="google_translate_element" className="hidden" />

        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility deve ser utilizado dentro do AccessibilityProvider');
  }
  return context;
}


