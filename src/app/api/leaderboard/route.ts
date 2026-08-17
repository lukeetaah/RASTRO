import { NextResponse } from 'next/server';
import { LeaderboardEntry } from '@/types/game';

// Almacenamiento universal en memoria en el servidor (compartido para todas las sesiones)
let GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-global-1',
    player_name: 'Archivista_Mayor',
    total_score: 26850,
    rounds_won: 5,
    rival_name: 'V. H. Hobsbawm',
    date: '17/8/2026',
  },
  {
    id: 'lead-global-2',
    player_name: 'Cronista_Austral',
    total_score: 24920,
    rounds_won: 5,
    rival_name: 'Archivista_AGN',
    date: '17/8/2026',
  },
  {
    id: 'lead-global-3',
    player_name: 'SanMartin_1817',
    total_score: 23150,
    rounds_won: 4,
    rival_name: 'M. Bloch_1929',
    date: '16/8/2026',
  },
  {
    id: 'lead-global-4',
    player_name: 'Curie_Solvay',
    total_score: 21400,
    rounds_won: 4,
    rival_name: 'S. Zweig',
    date: '16/8/2026',
  },
  {
    id: 'lead-global-5',
    player_name: 'Dra_Prebisch',
    total_score: 19850,
    rounds_won: 4,
    rival_name: 'F. Halder',
    date: '15/8/2026',
  },
];

export async function GET() {
  const sorted = [...GLOBAL_LEADERBOARD].sort((a, b) => b.total_score - a.total_score);
  return NextResponse.json(sorted.slice(0, 50));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { player_name, total_score, rounds_won, rival_name, date } = body;

    if (typeof total_score !== 'number') {
      return NextResponse.json({ error: 'Puntaje inválido' }, { status: 400 });
    }

    const newEntry: LeaderboardEntry = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      player_name: (typeof player_name === 'string' && player_name.trim()) ? player_name.trim().slice(0, 24) : 'Investigador Anónimo',
      total_score: Math.max(0, Math.min(50000, Math.round(total_score))),
      rounds_won: typeof rounds_won === 'number' ? Math.max(0, Math.min(5, rounds_won)) : 0,
      rival_name: (typeof rival_name === 'string' && rival_name.trim()) ? rival_name.trim().slice(0, 30) : 'Rival IA',
      date: typeof date === 'string' ? date : new Date().toLocaleDateString('es-AR'),
    };

    // Insertar y ordenar de mayor a menor
    GLOBAL_LEADERBOARD = [...GLOBAL_LEADERBOARD, newEntry]
      .sort((a, b) => b.total_score - a.total_score)
      .slice(0, 50);

    return NextResponse.json(GLOBAL_LEADERBOARD);
  } catch (err) {
    return NextResponse.json({ error: 'Error procesando récord' }, { status: 500 });
  }
}
