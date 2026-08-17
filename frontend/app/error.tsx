'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="w-16 h-16 text-red-600" />
        <h1 className="text-4xl font-bold text-slate-900">Algo deu errado!</h1>
        <p className="text-slate-600 text-center max-w-md">
          Encontramos um erro ao processar sua solicitação. Tente novamente ou retorne à página inicial.
        </p>
      </div>

      {error.message && (
        <details className="w-full max-w-md p-4 bg-slate-100 rounded-lg text-sm text-slate-600">
          <summary className="cursor-pointer font-semibold text-slate-800">Detalhes do erro</summary>
          <pre className="mt-2 text-xs overflow-auto">{error.message}</pre>
        </details>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Tentar Novamente
        </button>
        <Link href="/" className="px-6 py-3 bg-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-300 transition">
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
