import type { BusinessId, Client, ClientSegment, Channel } from '../types'
import { mulberry32, pick, rndBetween, daysAgo } from '../lib/utils'

const FIRST = ['Lucía', 'Mateo', 'Sofía', 'Diego', 'Martina', 'Hugo', 'Valeria', 'Daniel', 'Paula', 'Pablo', 'Alba', 'Álvaro', 'Carla', 'Adrián', 'Sara', 'Manuel', 'Elena', 'Marc', 'Noa', 'Iker', 'Vega', 'Leo', 'Aitana', 'Mario', 'Olivia', 'Bruno', 'Emma', 'Gonzalo', 'Inés', 'Sergio', 'Claudia', 'Joel', 'Andrea', 'Nicolás', 'Lola', 'Rubén', 'Julia', 'Iván', 'Marta', 'Antonio', 'Cristina', 'Javier', 'Patricia', 'Raúl', 'Beatriz', 'Óscar', 'Lorena', 'Felipe', 'Ainhoa', 'Aitor']
const LAST = ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Hernández', 'Ruiz', 'Díaz', 'Moreno', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Molina', 'Suárez', 'Castro', 'Ortega', 'Delgado', 'Rubio', 'Marín', 'Sanz', 'Iglesias', 'Núñez', 'Medina', 'Garrido', 'Cortés', 'Castillo', 'Santos', 'Lozano', 'Guerrero', 'Cano', 'Prieto', 'Méndez', 'Cruz', 'Calvo']

const SEGMENT_DIST: { seg: ClientSegment; weight: number }[] = [
  { seg: 'recurrente', weight: 35 },
  { seg: 'nuevo', weight: 25 },
  { seg: 'dormido', weight: 18 },
  { seg: 'vip', weight: 10 },
  { seg: 'campana', weight: 8 },
  { seg: 'incidencia', weight: 4 },
]

const TAGS_BY_SEG: Record<ClientSegment, string[]> = {
  nuevo: ['primer pedido', 'campaña Instagram'],
  recurrente: ['frecuente', 'leal'],
  vip: ['ticket alto', 'recomienda', 'evento privado'],
  dormido: ['+60 días sin pedir', 'reactivar'],
  campana: ['Meta Ads', 'descuento 20%'],
  incidencia: ['queja gestionada', 'compensado'],
}

const CHANNELS_BY_BUSINESS: Record<BusinessId, Channel[]> = {
  'smash-lab': ['whatsapp', 'delivery', 'sala', 'recogida', 'instagram'],
  'la-cabana': ['sala', 'whatsapp', 'telefono', 'web'],
  'velocity-kitchen': ['whatsapp', 'delivery', 'web'],
}

function pickSegment(rnd: () => number): ClientSegment {
  const total = SEGMENT_DIST.reduce((a, b) => a + b.weight, 0)
  let r = rnd() * total
  for (const s of SEGMENT_DIST) {
    if (r < s.weight) return s.seg
    r -= s.weight
  }
  return 'recurrente'
}

function genClients(businessId: BusinessId, count: number, seed: number, ticketBase: number): Client[] {
  const rnd = mulberry32(seed)
  const channels = CHANNELS_BY_BUSINESS[businessId]
  const out: Client[] = []
  for (let i = 0; i < count; i++) {
    const seg = pickSegment(rnd)
    const orders = seg === 'vip' ? rndBetween(rnd, 25, 80) : seg === 'recurrente' ? rndBetween(rnd, 6, 24) : seg === 'nuevo' ? 1 : seg === 'dormido' ? rndBetween(rnd, 2, 12) : rndBetween(rnd, 1, 5)
    const tm = ticketBase * (0.7 + rnd() * 0.9)
    const total = orders * tm
    const lastDays = seg === 'dormido' ? rndBetween(rnd, 60, 180) : seg === 'vip' ? rndBetween(rnd, 1, 10) : seg === 'recurrente' ? rndBetween(rnd, 3, 25) : rndBetween(rnd, 0, 30)
    const firstDays = lastDays + rndBetween(rnd, 30, 600)
    out.push({
      id: `c-${businessId}-${i + 1}`,
      name: `${pick(FIRST, rnd)} ${pick(LAST, rnd)}`,
      phone: `+34 6${rndBetween(rnd, 10, 99)} ${rndBetween(rnd, 100, 999)} ${rndBetween(rnd, 100, 999)}`,
      email: rnd() > 0.4 ? `${i}_demo@example.com` : undefined,
      segment: seg,
      origin: pick(channels, rnd),
      totalOrders: orders,
      totalSpent: Math.round(total * 100) / 100,
      ticketMedio: Math.round(tm * 100) / 100,
      lastOrder: daysAgo(lastDays),
      firstOrder: daysAgo(firstDays),
      tags: TAGS_BY_SEG[seg],
    })
  }
  return out
}

export const CLIENTS: Record<BusinessId, Client[]> = {
  'smash-lab': genClients('smash-lab', 48, 101, 18.5),
  'la-cabana': genClients('la-cabana', 36, 202, 42),
  'velocity-kitchen': genClients('velocity-kitchen', 64, 303, 24.8),
}
