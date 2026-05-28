import type { Business } from '../types'

export const BUSINESSES: Business[] = [
  {
    id: 'smash-lab',
    name: 'Smash Lab',
    vertical: 'hamburgueseria',
    tagline: 'Smash burgers de autor — Delivery & sala',
    city: 'Madrid',
    hours: 'L-D · 13:00-16:00 / 20:00-00:00',
    channels: ['whatsapp', 'delivery', 'sala', 'recogida', 'instagram'],
    brandColor: '#ff6a00',
    ticketMedio: 18.5,
    pedidosDia: 142,
  },
  {
    id: 'la-cabana',
    name: 'Restaurante La Cabaña',
    vertical: 'restaurante',
    tagline: 'Cocina de mercado con menú degustación',
    city: 'Bilbao',
    hours: 'M-S · 13:30-15:30 / 20:30-23:00 · Domingos cerrado',
    channels: ['sala', 'whatsapp', 'telefono', 'web'],
    brandColor: '#c89760',
    ticketMedio: 42.0,
    pedidosDia: 58,
  },
  {
    id: 'velocity-kitchen',
    name: 'Velocity Dark Kitchen',
    vertical: 'dark-kitchen',
    tagline: 'Multi-marca virtual · Solo delivery',
    city: 'Valencia',
    hours: 'L-D · 12:00-00:30',
    channels: ['whatsapp', 'delivery', 'web'],
    brandColor: '#ff2d87',
    ticketMedio: 24.8,
    pedidosDia: 215,
  },
]

export const BUSINESS_BY_ID = Object.fromEntries(BUSINESSES.map((b) => [b.id, b]))
