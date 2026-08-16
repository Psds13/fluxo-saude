'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  id: number;
  title: string;
  description: string;
  bgGradient: string;
  icon: string;
}

const CAROUSEL_IMAGES: CarouselImage[] = [
  {
    id: 1,
    title: 'Cuidado com a Saúde Preventiva',
    description: 'Consultas regulares ajudam a prevenir doenças e manter a qualidade de vida.',
    bgGradient: 'from-blue-600 via-cyan-500 to-blue-700',
    icon: '🏥',
  },
  {
    id: 2,
    title: 'Vacinação em Dia',
    description: 'Proteja você e sua família com as vacinas recomendadas pelo calendário do SUS.',
    bgGradient: 'from-cyan-500 via-blue-600 to-blue-800',
    icon: '💉',
  },
  {
    id: 3,
    title: 'Atenção Básica Próxima de Você',
    description: 'A UBS é o primeiro contato para cuidar da sua saúde com qualidade e acessibilidade.',
    bgGradient: 'from-blue-700 via-indigo-600 to-cyan-600',
    icon: '👥',
  },
  {
    id: 4,
    title: 'Atendimento de Emergência 24h',
    description: 'A UPA oferece atendimento rápido para situações de urgência sem esperas longas.',
    bgGradient: 'from-indigo-600 via-blue-500 to-cyan-500',
    icon: '🚑',
  },
  {
    id: 5,
    title: 'Medicamentos Gratuitos do SUS',
    description: 'Acesse medicamentos de qualidade nas farmácias das unidades de saúde.',
    bgGradient: 'from-cyan-600 via-blue-600 to-indigo-700',
    icon: '💊',
  },
];

export default function ImageCarousel() {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(timer);
  }, [autoPlay]);

  const irParaAnterior = () => {
    setIndiceAtual((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
    setAutoPlay(false);
  };

  const irParaProximo = () => {
    setIndiceAtual((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    setAutoPlay(false);
  };

  const irParaIndice = (indice: number) => {
    setIndiceAtual(indice);
    setAutoPlay(false);
  };

  const imagemAtual = CAROUSEL_IMAGES[indiceAtual];

  return (
    <section className="rounded-3xl overflow-hidden shadow-2xl">
      {/* Carrossel Principal */}
      <div className="relative h-96 md:h-96 bg-gradient-to-br w-full">
        {/* Background Animado */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${imagemAtual.bgGradient} transition-all duration-700 ease-out`}
        />

        {/* Conteúdo com Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-between p-8 md:p-12">
          {/* Ícone e Título */}
          <div className="flex items-start gap-4">
            <div className="text-5xl md:text-6xl">{imagemAtual.icon}</div>
            <div className="flex-1 pt-2">
              <h3 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight">
                {imagemAtual.title}
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                {imagemAtual.description}
              </p>
            </div>
          </div>

          {/* Controles Inferiores */}
          <div className="flex items-center justify-between">
            {/* Indicadores (Dots) */}
            <div className="flex gap-2">
              {CAROUSEL_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => irParaIndice(idx)}
                  className={`transition-all rounded-full ${
                    idx === indiceAtual
                      ? 'w-8 h-2.5 bg-white shadow-lg'
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir para imagem ${idx + 1}`}
                />
              ))}
            </div>

            {/* Botões de Navegação */}
            <div className="flex gap-2">
              <button
                onClick={irParaAnterior}
                onMouseEnter={() => setAutoPlay(false)}
                onMouseLeave={() => setAutoPlay(true)}
                className="p-2.5 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all backdrop-blur-sm border border-white/30 active:scale-90"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={irParaProximo}
                onMouseEnter={() => setAutoPlay(false)}
                onMouseLeave={() => setAutoPlay(true)}
                className="p-2.5 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all backdrop-blur-sm border border-white/30 active:scale-90"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de Progresso */}
      <div className="h-1 bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
          style={{
            width: `${((indiceAtual + 1) / CAROUSEL_IMAGES.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
