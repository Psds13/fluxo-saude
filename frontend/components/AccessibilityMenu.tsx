'use client';

import React, { useState } from 'react';
import {
  useAccessibility,
  LISTA_IDIOMAS,
} from './AccessibilityContext';
import {
  Eye,
  Type,
  Volume2,
  Play,
  Pause,
  HelpCircle,
  X,
  RotateCcw,
  Search,
  ChevronDown,
  Zap,
  BookOpen,
  MousePointer,
  Sparkles,
  Contrast,
  Sliders,
  Check,
} from 'lucide-react';

export default function AccessibilityMenu() {
  const [aberto, setAberto] = useState<boolean>(false);
  const [menuIdiomaAberto, setMenuIdiomaAberto] = useState<boolean>(false);
  const [buscaIdioma, setBuscaIdioma] = useState<string>('');
  const [somAlerta, setSomAlerta] = useState<boolean>(false);

  // Emite som de alerta + voz + vibração para idosos / baixa visão
  const emitirAlerta = () => {
    setSomAlerta(true);

    // Som de beep usando Web Audio API
    if (typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const tocar = (freq: number, start: number, dur: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.5, ctx.currentTime + start);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
          osc.start(ctx.currentTime + start);
          osc.stop(ctx.currentTime + start + dur);
        };
        tocar(880, 0, 0.25);
        tocar(1100, 0.3, 0.25);
        tocar(880, 0.6, 0.25);
        tocar(1320, 0.9, 0.5);
      } catch (_) {}

      // Vibração no celular
      if ('vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 400]);

      // Voz: fala o alerta em voz alta
      const msg = new SpeechSynthesisUtterance('Atenção! Este é um alerta de acessibilidade do sistema Fluxo Saúde. Se precisar de emergência, ligue 192 para o SAMU.');
      msg.lang = 'pt-BR';
      msg.rate = 0.85;
      msg.pitch = 1.1;
      msg.volume = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
    }

    setTimeout(() => setSomAlerta(false), 3000);
  };


  const {
    perfilAtivo,
    ativarPerfil,
    idioma,
    setIdioma,
    t,
    modoCor,
    setModoCor,
    altoContraste,
    tamanhoFonte,
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
    estaFalando,
    toggleLerConteudo,
    resetarTudo,
  } = useAccessibility();

  const idiomaAtualObj = LISTA_IDIOMAS.find((i) => i.code === idioma) || LISTA_IDIOMAS[0];

  const idiomasFiltrados = LISTA_IDIOMAS.filter(
    (i) =>
      i.name.toLowerCase().includes(buscaIdioma.toLowerCase()) ||
      i.code.toLowerCase().includes(buscaIdioma.toLowerCase())
  );

  const rotuloFonte: Record<string, string> = {
    normal: 'Normal (100%)',
    grande: 'Grande (120%)',
    extragrande: 'Extra (140%)',
    gigante: 'Gigante (160%)',
  };

  return (
    <div className="relative z-50">
      {/* Botão Principal Flutuante de Acessibilidade */}
      <button
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        aria-label="Menu de Acessibilidade UserWay"
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold border transition-all shadow-md hover:scale-105 active:scale-95 ${
          altoContraste || modoCor === 'alto-contraste'
            ? 'bg-yellow-400 text-black border-yellow-500 font-extrabold'
            : 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <Eye className="w-3.5 h-3.5 text-white" />
        </div>
        <span>Acessibilidade</span>
        {leitorVoz && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Voz Ativada" />}
      </button>

      {/* Modal Widget Estilo UserWay */}
      {aberto && (
        <div
          role="dialog"
          aria-label="Painel de Acessibilidade UserWay"
          className={`absolute right-0 mt-3 w-88 md:w-96 rounded-3xl shadow-2xl p-5 border transition-all duration-200 ${
            altoContraste || modoCor === 'alto-contraste'
              ? 'bg-black border-yellow-400 text-yellow-300'
              : 'bg-white border-slate-200 text-slate-800'
          } max-h-[85vh] overflow-y-auto custom-scrollbar`}
        >
          {/* TOPO: Seletor de Idioma & Fechar */}
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
            <div className="flex items-center justify-between gap-2">
              {/* Dropdown de Idioma (Estilo UserWay PT/EN/ES) */}
              <div className="relative">
                <button
                  onClick={() => setMenuIdiomaAberto(!menuIdiomaAberto)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                    {idiomaAtualObj.badge}
                  </span>
                  <span>{idiomaAtualObj.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Submenu Dropdown de Busca de Idiomas */}
                {menuIdiomaAberto && (
                  <div className="absolute left-0 top-10 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* Barra de Pesquisa "Pesquise o idioma" */}
                    <div className="relative mb-2">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t('pesquise_idioma', 'Pesquise o idioma')}
                        value={buscaIdioma}
                        onChange={(e) => setBuscaIdioma(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                      />
                    </div>

                    {/* Lista de Idiomas */}
                    <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {idiomasFiltrados.map((item) => (
                        <button
                          key={item.code}
                          onClick={() => {
                            setIdioma(item.code);
                            setMenuIdiomaAberto(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                            idioma === item.code
                              ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] flex items-center justify-center">
                              {item.badge}
                            </span>
                            <span>{item.name}</span>
                          </div>
                          {idioma === item.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botão Fechar Modal */}
              <button
                onClick={() => setAberto(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition"
                aria-label="Fechar menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 🔥 BOTÃO DE ALERTA SONORO DE EMERGÊNCIA (para idosos / acessibilidade máxima) */}
          <div className="mb-4">
            <button
              onClick={emitirAlerta}
              aria-label="Emitir alerta sonoro de emergência"
              className={`w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl font-extrabold text-sm transition-all shadow-lg active:scale-95 border-2 ${
                somAlerta
                  ? 'bg-rose-600 border-rose-700 text-white animate-pulse scale-105 shadow-rose-500/50'
                  : altoContraste || modoCor === 'alto-contraste'
                  ? 'bg-yellow-400 border-yellow-500 text-black hover:bg-yellow-300'
                  : 'bg-linear-to-br from-[#0071BC] to-[#005a96] border-[#004f85] text-white hover:from-[#0080d4] hover:to-[#0071BC] shadow-[#0071BC]/30'
              }`}
            >
              <span className={`text-xl ${somAlerta ? 'animate-bounce' : ''}`}>🔊</span>
              <div className="text-left leading-tight">
                <span className="block text-base font-black">
                  {somAlerta ? '🔔 ALERTA EMITIDO!' : '🔔 Alerta Sonoro de Emergência'}
                </span>
                <span className="text-[11px] font-medium opacity-90">
                  {somAlerta ? 'Som, voz e vibração ativados' : 'Toque para emitir som + voz de alerta'}
                </span>
              </div>
              <span className={`text-xl ${somAlerta ? 'animate-spin' : ''}`}>🚨</span>
            </button>

            <p className="text-center text-[10px] text-slate-400 mt-1.5 font-medium">
              Ideal para idosos · Funciona com vibração + som + voz automática
            </p>
          </div>

          {/* SESSÃO 1: PERFIS DE ACESSIBILIDADE (Estilo UserWay) */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0071BC] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#0071BC]" /> Perfis de Acessibilidade
              </h4>
              <span title="Perfis pré-configurados para diferentes necessidades">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              </span>
            </div>


            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Perfil: Deficiência Motora */}
              <button
                onClick={() => ativarPerfil('motora')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                  perfilAtivo === 'motora'
                    ? 'bg-[#0071BC] text-white border-[#005a96] font-bold shadow-md shadow-[#0071BC]/20'
                    : 'bg-[#0071BC]/8 border-[#0071BC]/20 text-slate-700 hover:bg-[#0071BC]/15 hover:border-[#0071BC]/35'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-base ${
                  perfilAtivo === 'motora' ? 'bg-white/20' : 'bg-[#0071BC]/12'
                }`}>
                  ♿
                </div>
                <span className="leading-tight font-semibold text-[11px]">Deficiência Motora</span>
              </button>

              {/* Perfil: Cego / Leitor */}
              <button
                onClick={() => ativarPerfil('cego')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                  perfilAtivo === 'cego'
                    ? 'bg-[#0071BC] text-white border-[#005a96] font-bold shadow-md shadow-[#0071BC]/20'
                    : 'bg-[#0071BC]/8 border-[#0071BC]/20 text-slate-700 hover:bg-[#0071BC]/15 hover:border-[#0071BC]/35'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-base ${
                  perfilAtivo === 'cego' ? 'bg-white/20' : 'bg-[#65C8D0]/20'
                }`}>
                  👁️
                </div>
                <span className="leading-tight font-semibold text-[11px]">Cego / Tela</span>
              </button>

              {/* Perfil: Visão Reduzida */}
              <button
                onClick={() => ativarPerfil('visaoReduzida')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                  perfilAtivo === 'visaoReduzida'
                    ? 'bg-[#0071BC] text-white border-[#005a96] font-bold shadow-md shadow-[#0071BC]/20'
                    : 'bg-[#0071BC]/8 border-[#0071BC]/20 text-slate-700 hover:bg-[#0071BC]/15 hover:border-[#0071BC]/35'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-base ${
                  perfilAtivo === 'visaoReduzida' ? 'bg-white/20' : 'bg-amber-100'
                }`}>
                  🔍
                </div>
                <span className="leading-tight font-semibold text-[11px]">Visão Reduzida</span>
              </button>

              {/* Perfil: TDAH / Foco */}
              <button
                onClick={() => ativarPerfil('tdah')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                  perfilAtivo === 'tdah'
                    ? 'bg-[#0071BC] text-white border-[#005a96] font-bold shadow-md shadow-[#0071BC]/20'
                    : 'bg-[#0071BC]/8 border-[#0071BC]/20 text-slate-700 hover:bg-[#0071BC]/15 hover:border-[#0071BC]/35'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-base ${
                  perfilAtivo === 'tdah' ? 'bg-white/20' : 'bg-purple-100'
                }`}>
                  🧠
                </div>
                <span className="leading-tight font-semibold text-[11px]">TDAH / Foco</span>
              </button>

              {/* Perfil: Epilepsia */}
              <button
                onClick={() => ativarPerfil('epilepsia')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                  perfilAtivo === 'epilepsia'
                    ? 'bg-[#0071BC] text-white border-[#005a96] font-bold shadow-md shadow-[#0071BC]/20'
                    : 'bg-[#0071BC]/8 border-[#0071BC]/20 text-slate-700 hover:bg-[#0071BC]/15 hover:border-[#0071BC]/35'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-base ${
                  perfilAtivo === 'epilepsia' ? 'bg-white/20' : 'bg-rose-100'
                }`}>
                  ⚡
                </div>
                <span className="leading-tight font-semibold text-[11px]">Epilepsia</span>
              </button>

              {/* Perfil: Dislexia */}
              <button
                onClick={() => ativarPerfil('dislexia')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                  perfilAtivo === 'dislexia'
                    ? 'bg-[#0071BC] text-white border-[#005a96] font-bold shadow-md shadow-[#0071BC]/20'
                    : 'bg-[#0071BC]/8 border-[#0071BC]/20 text-slate-700 hover:bg-[#0071BC]/15 hover:border-[#0071BC]/35'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-base ${
                  perfilAtivo === 'dislexia' ? 'bg-white/20' : 'bg-indigo-100'
                }`}>
                  📖
                </div>
                <span className="leading-tight font-semibold text-[11px]">Dislexia</span>
              </button>
            </div>
          </div>

          {/* SESSÃO 2: FERRAMENTA DE VOZ / ÁUDIO (TOGGLE LER CONTEÚDO CORRIGIDO) */}
          <div className="p-3.5 bg-[#0071BC]/10 rounded-2xl border border-[#0071BC]/25 space-y-3 mb-5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs flex items-center gap-1.5 text-[#0071BC]">
                <Volume2 className="w-4 h-4 text-[#0071BC]" /> Auxílio por Voz (Áudio)
              </span>
              <button
                onClick={toggleLeitorVoz}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold transition ${
                  leitorVoz ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {leitorVoz ? 'LIGADO' : 'DESLIGADO'}
              </button>
            </div>

            {/* BOTÃO INTELIGENTE DE LER/PARAR CONTEÚDO */}
            <button
              onClick={toggleLerConteudo}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition shadow-sm ${
                estaFalando
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              {estaFalando ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>{t('parar_leitura', 'Desligar / Parar Leitura')}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t('ler_conteudo', 'Ler Conteúdo da Página')}</span>
                </>
              )}
            </button>
          </div>

          {/* SESSÃO 3: FERRAMENTAS INDIVIDUALMENTE AJUSTÁVEIS */}
          <div className="space-y-4 text-xs mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0071BC] flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-[#0071BC]" /> Conteúdo & Leitura
            </h4>

            {/* Tamanho da Fonte */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium">Tamanho do Texto</span>
                <span className="font-semibold text-[11px] text-sky-600 font-mono">
                  {rotuloFonte[tamanhoFonte]}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={diminuirFonte}
                  className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold border border-slate-200 dark:border-slate-700"
                >
                  A-
                </button>
                <button
                  onClick={resetarFonte}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 rounded-xl border border-slate-200 dark:border-slate-700"
                  title="100%"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={aumentarFonte}
                  className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold border border-slate-200 dark:border-slate-700"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Espaçamento de Texto */}
            <div className="space-y-1.5">
              <span className="font-medium">Espaçamento entre Linhas/Letras</span>
              <div className="grid grid-cols-3 gap-1">
                {(['normal', 'moderado', 'expandido'] as const).map((esp) => (
                  <button
                    key={esp}
                    onClick={() => setEspacamentoTexto(esp)}
                    className={`py-1.5 rounded-xl font-bold text-[11px] border capitalize transition ${
                      espacamentoTexto === esp
                        ? 'bg-sky-600 text-white border-sky-700'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {esp}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles Rápidos */}
            <div className="space-y-2 pt-2">
              {/* Fonte Dislexia */}
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" /> Fonte para Dislexia
                </span>
                <button
                  onClick={toggleFonteDislexia}
                  className={`px-3 py-1 rounded-xl font-bold transition text-[11px] ${
                    fonteDislexia ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {fonteDislexia ? 'SIM' : 'NÃO'}
                </button>
              </div>

              {/* Cursor Ampliado */}
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-1.5">
                  <MousePointer className="w-3.5 h-3.5 text-sky-600" /> Cursor Ampliado
                </span>
                <button
                  onClick={toggleCursorGrande}
                  className={`px-3 py-1 rounded-xl font-bold transition text-[11px] ${
                    cursorGrande ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {cursorGrande ? 'SIM' : 'NÃO'}
                </button>
              </div>

              {/* Guia de Leitura */}
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Guia de Leitura (Linha)
                </span>
                <button
                  onClick={toggleGuiaLeitura}
                  className={`px-3 py-1 rounded-xl font-bold transition text-[11px] ${
                    guiaLeitura ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {guiaLeitura ? 'SIM' : 'NÃO'}
                </button>
              </div>

              {/* Destacar Links */}
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-1.5">
                  🔗 Destacar Botões & Links
                </span>
                <button
                  onClick={toggleDestacarLinks}
                  className={`px-3 py-1 rounded-xl font-bold transition text-[11px] ${
                    destacarLinks ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {destacarLinks ? 'SIM' : 'NÃO'}
                </button>
              </div>

              {/* Pausar Animações */}
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-sky-600" /> Pausar Animações
                </span>
                <button
                  onClick={togglePausarAnimacoes}
                  className={`px-3 py-1 rounded-xl font-bold transition text-[11px] ${
                    pausarAnimacoes ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {pausarAnimacoes ? 'SIM' : 'NÃO'}
                </button>
              </div>
            </div>

            {/* Modos de Cores & Contraste */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-medium flex items-center gap-1.5">
                <Contrast className="w-3.5 h-3.5 text-sky-600" /> Modos de Cores
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setModoCor('alto-contraste')}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition ${
                    modoCor === 'alto-contraste' || altoContraste
                      ? 'bg-yellow-400 text-black border-yellow-500'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Alto Contraste
                </button>
                <button
                  onClick={() => setModoCor('inverter-cores')}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition ${
                    modoCor === 'inverter-cores'
                      ? 'bg-purple-600 text-white border-purple-700'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Inverter Cores
                </button>
                <button
                  onClick={() => setModoCor('monocromatico')}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition ${
                    modoCor === 'monocromatico'
                      ? 'bg-slate-800 text-white border-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Monocromático
                </button>
                <button
                  onClick={() => setModoCor('padrao')}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition ${
                    modoCor === 'padrao'
                      ? 'bg-sky-600 text-white border-sky-700'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Cores Padrão
                </button>
              </div>
            </div>
          </div>

          {/* RODAPÉ: BOTÃO DE RESET GERAL */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={resetarTudo}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {t('redefinir_tudo', 'Redefinir todas as configurações')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


