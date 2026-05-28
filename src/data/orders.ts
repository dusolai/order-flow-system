import type { BusinessId, Order, OrderItem, OrderStatus, PaymentMethod, Channel } from '../types'
import { mulberry32, pick, rndBetween, hoursAgo } from '../lib/utils'
import { MENUS } from './menus'
import { CLIENTS } from './clients'

const STATUS_DIST_RECENT: OrderStatus[] = ['pendiente', 'preparando', 'preparando', 'listo', 'enviado', 'enviado']
const STATUS_DIST_PAST: OrderStatus[] = ['entregado', 'entregado', 'entregado', 'entregado', 'entregado', 'cancelado']

const PAYMENT_DIST: PaymentMethod[] = ['tarjeta', 'tarjeta', 'tarjeta', 'efectivo', 'bizum', 'online']
const CHANNEL_DIST: Record<BusinessId, Channel[]> = {
  'smash-lab': ['whatsapp', 'whatsapp', 'delivery', 'sala', 'recogida'],
  'la-cabana': ['sala', 'sala', 'sala', 'whatsapp', 'telefono'],
  'velocity-kitchen': ['whatsapp', 'whatsapp', 'delivery', 'web'],
}

function genOrders(businessId: BusinessId, count: number, seed: number): Order[] {
  const rnd = mulberry32(seed)
  const menu = MENUS[businessId]
  const clients = CLIENTS[businessId]
  const orders: Order[] = []
  for (let i = 0; i < count; i++) {
    const client = pick(clients, rnd)
    const numItems = rndBetween(rnd, 1, 4)
    const items: OrderItem[] = []
    let total = 0
    const usedIds = new Set<string>()
    for (let j = 0; j < numItems; j++) {
      let p = pick(menu, rnd)
      let attempts = 0
      while (usedIds.has(p.id) && attempts < 4) {
        p = pick(menu, rnd)
        attempts++
      }
      usedIds.add(p.id)
      const qty = rndBetween(rnd, 1, 2)
      const isBurger = p.category === 'Burgers'
      const mods: string[] = []
      if (isBurger && rnd() < 0.18) mods.push(pick(['Sin cebolla', 'Sin pepinillo', 'Sin queso', 'Solo carne', 'Sin gluten ⚠️'], rnd))
      items.push({
        productId: p.id,
        productName: p.name,
        qty,
        price: p.price,
        modifications: mods.length ? mods : undefined,
        doneness: isBurger ? pick(['poco', 'punto', 'hecha'] as const, rnd) : undefined,
      })
      total += p.price * qty
    }
    const isRecent = i < count * 0.05
    const hours = isRecent ? rndBetween(rnd, 0, 6) : rndBetween(rnd, 7, 24 * 30)
    orders.push({
      id: `o-${businessId}-${(1000 + i).toString()}`,
      clientId: client.id,
      clientName: client.name,
      channel: pick(CHANNEL_DIST[businessId], rnd),
      items,
      total: Math.round(total * 100) / 100,
      status: pick(isRecent ? STATUS_DIST_RECENT : STATUS_DIST_PAST, rnd),
      payment: pick(PAYMENT_DIST, rnd),
      createdAt: hoursAgo(hours),
      table: businessId === 'la-cabana' && rnd() > 0.3 ? `M${rndBetween(rnd, 1, 18)}` : undefined,
    })
  }
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const ORDERS: Record<BusinessId, Order[]> = {
  'smash-lab': genOrders('smash-lab', 180, 401),
  'la-cabana': genOrders('la-cabana', 90, 502),
  'velocity-kitchen': genOrders('velocity-kitchen', 260, 603),
}
