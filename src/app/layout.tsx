import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RASTRO — Motor de Investigación Histórica Competitiva 1v1',
  description:
    'Videojuego web histórico competitivo 1 vs 1. Observá la evidencia, investigá pistas visuales, deducí el acontecimiento y competí contra un reloj de arena físico.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#090b0e] text-zinc-100 min-h-screen antialiased selection:bg-amber-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
