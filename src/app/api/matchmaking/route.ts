import { NextResponse } from 'next/server';
import { RivalState } from '@/types/game';

interface WaitingPlayer {
  id: string;
  name: string;
  joined_at: number;
  matched_with?: { id: string; name: string };
}

// Cola en memoria compartida en el servidor
let WAITING_QUEUE: WaitingPlayer[] = [];
let MATCHED_PAIRS: Record<string, { rival_id: string; rival_name: string }> = {};

function cleanupStalePlayers() {
  const now = Date.now();
  WAITING_QUEUE = WAITING_QUEUE.filter((p) => now - p.joined_at < 12000);
}

export async function GET() {
  cleanupStalePlayers();
  // Retornar número de jugadores activos simulado + real para ambiente multijugador vivo
  const realCount = WAITING_QUEUE.length;
  const activeCount = Math.max(8, realCount + Math.floor(Math.random() * 5 + 6));
  return NextResponse.json({
    active_online_count: activeCount,
    waiting_in_queue: realCount,
  });
}

export async function POST(request: Request) {
  try {
    cleanupStalePlayers();
    const body = await request.json();
    const { player_id, player_name, action } = body;

    if (!player_id || !player_name) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    // 1. Verificar si ya fue emparejado por otro jugador
    if (MATCHED_PAIRS[player_id]) {
      const match = MATCHED_PAIRS[player_id];
      delete MATCHED_PAIRS[player_id];

      const rivalState: RivalState = {
        id: match.rival_id,
        name: match.rival_name,
        archetype: 'HUMANO',
        is_online: true,
        is_human: true,
        has_locked: false,
        time_remaining_seconds: 20,
      };

      return NextResponse.json({
        matched: true,
        is_human: true,
        rival: rivalState,
      });
    }

    if (action === 'LEAVE') {
      WAITING_QUEUE = WAITING_QUEUE.filter((p) => p.id !== player_id);
      return NextResponse.json({ ok: true });
    }

    // 2. Buscar otro jugador esperando en la cola
    const opponentIndex = WAITING_QUEUE.findIndex((p) => p.id !== player_id);

    if (opponentIndex !== -1) {
      const opponent = WAITING_QUEUE[opponentIndex];
      // Remover al oponente de la cola
      WAITING_QUEUE.splice(opponentIndex, 1);
      // Remover al jugador actual si estaba en la cola
      WAITING_QUEUE = WAITING_QUEUE.filter((p) => p.id !== player_id);

      // Registrar el emparejamiento para que el oponente lo reciba en su próximo poll
      MATCHED_PAIRS[opponent.id] = {
        rival_id: player_id,
        rival_name: player_name,
      };

      const rivalState: RivalState = {
        id: opponent.id,
        name: opponent.name,
        archetype: 'HUMANO',
        is_online: true,
        is_human: true,
        has_locked: false,
        time_remaining_seconds: 20,
      };

      return NextResponse.json({
        matched: true,
        is_human: true,
        rival: rivalState,
      });
    }

    // 3. Si no hay oponente, registrar o actualizar al jugador en la cola
    const existingIndex = WAITING_QUEUE.findIndex((p) => p.id === player_id);
    const now = Date.now();

    if (existingIndex === -1) {
      WAITING_QUEUE.push({
        id: player_id,
        name: player_name,
        joined_at: now,
      });
      return NextResponse.json({
        matched: false,
        status: 'WAITING_IN_QUEUE',
      });
    } else {
      const waitingTime = now - WAITING_QUEUE[existingIndex].joined_at;
      // Si ya esperó más de 3.5 segundos sin humano -> sugerir fallback a rival CPU
      if (waitingTime > 3500) {
        WAITING_QUEUE.splice(existingIndex, 1);
        return NextResponse.json({
          matched: false,
          fallback_to_bot: true,
        });
      }

      return NextResponse.json({
        matched: false,
        status: 'WAITING_IN_QUEUE',
        waiting_time_ms: waitingTime,
      });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Error en matchmaking' }, { status: 500 });
  }
}
