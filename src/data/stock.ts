import type { BusinessId, StockMovement } from '../types'
import { mulberry32, pick, rndBetween, daysAgo } from '../lib/utils'
import { MENUS } from './menus'

function gen(businessId: BusinessId, seed: number, count: number): StockMovement[] {
  const rnd = mulberry32(seed)
  const menu = MENUS[businessId]
  const types: StockMovement['type'][] = ['salida', 'salida', 'salida', 'salida', 'entrada', 'merma', 'ajuste']
  const reasons: Record<StockMovement['type'], string[]> = {
    salida: ['Venta TPV', 'Pedido WhatsApp', 'Pedido delivery'],
    entrada: ['Recepción proveedor', 'Pedido semanal Makro', 'Reposición urgente'],
    merma: ['Producto caducado', 'Roto durante manipulación', 'Cliente devuelve'],
    ajuste: ['Inventario físico', 'Corrección manual'],
  }
  const out: StockMovement[] = []
  for (let i = 0; i < count; i++) {
    const p = pick(menu, rnd)
    const type = pick(types, rnd)
    const qty = type === 'entrada' ? rndBetween(rnd, 12, 60) : rndBetween(rnd, 1, 6)
    out.push({
      id: `mov-${businessId}-${i + 1}`,
      productId: p.id,
      productName: p.name,
      type,
      qty,
      date: daysAgo(rndBetween(rnd, 0, 20)),
      reason: pick(reasons[type], rnd),
    })
  }
  return out.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const STOCK_MOVEMENTS: Record<BusinessId, StockMovement[]> = {
  'smash-lab': gen('smash-lab', 1301, 64),
  'la-cabana': gen('la-cabana', 1402, 48),
  'velocity-kitchen': gen('velocity-kitchen', 1503, 80),
}
