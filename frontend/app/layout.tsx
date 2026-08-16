import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AccessibilityProvider } from '@/components/AccessibilityContext';
import { TenantProvider } from '@/components/TenantContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HealthChatbot from '@/components/HealthChatbot';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Fluxo Saúde — Orientação e Navegação na Rede SUS',
  description:
    'Sistema público digital para ajudar o cidadão a identificar o serviço de saúde mais adequado entre UBS, UPA e SAMU 192.',
  keywords: [
    'Fluxo Saúde',
    'SUS',
    'Posto de Saúde',
    'UBS',
    'UPA 24h',
    'SAMU 192',
    'Atendimento Médico',
    'Triagem de Saúde Pública',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
        <TenantProvider>
          <AccessibilityProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              {/* Assistente Flutuante de Triagem por IA */}
              <HealthChatbot />
            </div>
          </AccessibilityProvider>
        </TenantProvider>
      </body>
    </html>
  );
}

