import React from 'react';
import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <AlertCircle className="w-16 h-16 text-amber-600" />
        <h1 className="text-5xl font-bold text-slate-900">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700">Página não encontrada</h2>
        <p className="text-slate-600 text-center max-w-md">
          A página que você está procurando não existe ou foi removida. Que tal voltar à página inicial?
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
      >
        <Home className="w-5 h-5" />
        Voltar ao Início
      </Link>
    </div>
  );
}
