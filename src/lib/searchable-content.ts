import type { SearchableContent } from '@/lib/definitions';

export const searchableContent: SearchableContent[] = [
  { title: 'Inicio', path: '/', description: 'Página principal de YiChess. Comienza tu viaje en el ajedrez.', keywords: 'home principal' },
  { title: 'Jugar', path: '/jugar', description: 'Juega partidas de ajedrez contra la IA. Pon a prueba tus habilidades.', keywords: 'partida ia computadora' },
  { title: 'Puzzles', path: '/puzzles', description: 'Resuelve puzzles y problemas de ajedrez para mejorar tu táctica y visión de juego.', keywords: 'problemas táctica' },
  { title: 'Reglas', path: '/reglas', description: 'Aprende las reglas básicas del ajedrez, el movimiento de las piezas y conceptos fundamentales.', keywords: 'normas piezas movimiento' },
  { title: 'Estrategias', path: '/estrategias', description: 'Descubre estrategias, aperturas y tácticas para mejorar tu juego y ganar más partidas.', keywords: 'tácticas aperturas mates' },
  { title: 'Contacto', path: '/contacto', description: 'Envíanos tus sugerencias, preguntas o comentarios sobre YiChess.', keywords: 'email mensaje' },
  { title: 'Principios de Apertura', path: '/estrategias', description: 'Controla el centro y desarrolla tus piezas para una sólida ventaja inicial.', keywords: 'estrategia apertura desarrollo' },
  { title: 'Gambito de Dama', path: '/estrategias', description: 'Una apertura clásica y respetada que busca el control posicional.', keywords: 'estrategia apertura' },
  { title: 'Defensa Siciliana', path: '/estrategias', description: 'La respuesta más popular y agresiva contra 1.e4. Lucha por la iniciativa.', keywords: 'estrategia apertura defensa' },
  { title: 'Enroque', path: '/estrategias', description: 'Un movimiento esencial para proteger a tu rey y conectar tus torres.', keywords: 'estrategia movimiento especial rey torre seguridad' },
  { title: 'La Clavada (Pin)', path: '/estrategias', description: 'Inmoviliza una pieza enemiga para restringir su movimiento y crear amenazas.', keywords: 'estrategia táctica pin' },
  { title: 'La Horquilla (Fork)', path: '/estrategias', description: 'Ataca dos o más piezas enemigas simultáneamente con una sola pieza.', keywords: 'estrategia táctica fork' },
  { title: 'Ataque a la Descubierta', path: '/estrategias', description: 'Mueve una pieza para desatar un ataque oculto de una pieza poderosa.', keywords: 'estrategia táctica discovered attack' },
  { title: 'El Molino (Windmill)', path: '/estrategias', description: 'Una rara pero devastadora táctica que combina jaques a la descubierta repetidos.', keywords: 'estrategia táctica windmill' },
  { title: 'Estrategia General', path: '/estrategias', description: 'Aprende a crear planes a largo plazo, controlar el tablero y coordinar tus piezas.', keywords: 'estrategia conceptos planificación' },
  { title: 'Patrones de Jaque Mate', path: '/estrategias', description: 'Aprende las secuencias finales para dar el golpe de gracia a tu oponente.', keywords: 'estrategia táctica fin de juego mate' },
  { title: 'Jaque Mate de Coz', path: '/estrategias', description: 'Un mate espectacular dado por un caballo cuando el rey está ahogado.', keywords: 'estrategia táctica mate ahogado caballo smothered mate' },
  { title: 'Jaque del Pasillo', path: '/estrategias', description: 'Un mate común en la última fila, atrapando al rey sin escapatoria.', keywords: 'estrategia táctica mate pasillo back-rank mate' },
];
