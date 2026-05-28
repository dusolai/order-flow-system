import type { BusinessId, Campaign } from '../types'
import { daysAgo } from '../lib/utils'

const SL: Campaign[] = [
  { id: 'cmp-sl-1', name: 'Nuevos clientes Madrid centro', objective: 'captacion', status: 'activa', budget: 600, spent: 412, channel: 'meta', startDate: daysAgo(18), endDate: daysAgo(-12), impressions: 84200, clicks: 1840, leads: 168, orders: 92, revenue: 1742.50, segment: 'Radio 3km' },
  { id: 'cmp-sl-2', name: 'Reactivar dormidos +60d', objective: 'reactivacion', status: 'activa', budget: 200, spent: 86, channel: 'whatsapp', startDate: daysAgo(5), endDate: daysAgo(-25), impressions: 420, clicks: 0, leads: 0, orders: 38, revenue: 698.40, segment: 'Dormidos 60+ días' },
  { id: 'cmp-sl-3', name: 'Horas valle 17-19h Sábados 2x1', objective: 'horas-valle', status: 'activa', budget: 300, spent: 154, channel: 'meta', startDate: daysAgo(11), endDate: daysAgo(-19), impressions: 38400, clicks: 920, leads: 88, orders: 41, revenue: 612.30 },
  { id: 'cmp-sl-4', name: 'Cumpleaños + 15% descuento', objective: 'fidelizacion', status: 'activa', budget: 100, spent: 22, channel: 'whatsapp', startDate: daysAgo(45), endDate: daysAgo(-300), impressions: 142, clicks: 0, leads: 0, orders: 28, revenue: 522.00 },
  { id: 'cmp-sl-5', name: 'Push Trusada — margen alto', objective: 'producto-margen', status: 'pausada', budget: 250, spent: 250, channel: 'meta', startDate: daysAgo(38), endDate: daysAgo(8), impressions: 42100, clicks: 980, leads: 78, orders: 32, revenue: 412.80, segment: 'Recurrentes' },
  { id: 'cmp-sl-6', name: 'Lanzamiento By Gorry (cerrada)', objective: 'captacion', status: 'finalizada', budget: 500, spent: 500, channel: 'meta', startDate: daysAgo(75), endDate: daysAgo(45), impressions: 96000, clicks: 2240, leads: 196, orders: 124, revenue: 1488.80 },
]

const LC: Campaign[] = [
  { id: 'cmp-lc-1', name: 'Menú degustación reservas online', objective: 'captacion', status: 'activa', budget: 800, spent: 542, channel: 'meta', startDate: daysAgo(22), endDate: daysAgo(-8), impressions: 62400, clicks: 1480, leads: 98, orders: 38, revenue: 2964.00, segment: 'Bilbao 5km · gastrónomos' },
  { id: 'cmp-lc-2', name: 'Cliente VIP cumpleaños', objective: 'fidelizacion', status: 'activa', budget: 150, spent: 18, channel: 'whatsapp', startDate: daysAgo(60), endDate: daysAgo(-300), impressions: 86, clicks: 0, leads: 0, orders: 22, revenue: 1848.00 },
  { id: 'cmp-lc-3', name: 'Comida de empresa Q3', objective: 'captacion', status: 'activa', budget: 600, spent: 312, channel: 'meta', startDate: daysAgo(14), endDate: daysAgo(-16), impressions: 38400, clicks: 920, leads: 42, orders: 8, revenue: 4128.00 },
  { id: 'cmp-lc-4', name: 'Reactivar clientes +90 días', objective: 'reactivacion', status: 'pausada', budget: 200, spent: 122, channel: 'email', startDate: daysAgo(28), endDate: daysAgo(-2), impressions: 1240, clicks: 84, leads: 22, orders: 9, revenue: 698.00 },
  { id: 'cmp-lc-5', name: 'Chuletón + Ribera (margen)', objective: 'producto-margen', status: 'activa', budget: 300, spent: 178, channel: 'meta', startDate: daysAgo(10), endDate: daysAgo(-20), impressions: 22400, clicks: 580, leads: 38, orders: 18, revenue: 2412.00 },
  { id: 'cmp-lc-6', name: 'San Valentín 2026 (cerrada)', objective: 'captacion', status: 'finalizada', budget: 400, spent: 400, channel: 'meta', startDate: daysAgo(108), endDate: daysAgo(96), impressions: 48000, clicks: 1180, leads: 88, orders: 42, revenue: 3654.00 },
]

const VK: Campaign[] = [
  { id: 'cmp-vk-1', name: 'NUEVOCLIENTES -20% primer pedido', objective: 'captacion', status: 'activa', budget: 1200, spent: 842, channel: 'meta', startDate: daysAgo(30), endDate: daysAgo(0), impressions: 184000, clicks: 4680, leads: 412, orders: 248, revenue: 4824.40, segment: 'Valencia 4km' },
  { id: 'cmp-vk-2', name: 'Pizza Velo Sábados', objective: 'horas-valle', status: 'activa', budget: 400, spent: 218, channel: 'meta', startDate: daysAgo(14), endDate: daysAgo(-16), impressions: 64000, clicks: 1820, leads: 142, orders: 78, revenue: 1102.40 },
  { id: 'cmp-vk-3', name: 'Bowl Lab Lunch (12-15h L-V)', objective: 'horas-valle', status: 'activa', budget: 350, spent: 188, channel: 'meta', startDate: daysAgo(20), endDate: daysAgo(-10), impressions: 48000, clicks: 1320, leads: 98, orders: 56, revenue: 824.40 },
  { id: 'cmp-vk-4', name: 'Crispy Co Cena Fin de Semana', objective: 'producto-margen', status: 'activa', budget: 300, spent: 142, channel: 'meta', startDate: daysAgo(8), endDate: daysAgo(-22), impressions: 32400, clicks: 920, leads: 78, orders: 42, revenue: 612.40 },
  { id: 'cmp-vk-5', name: 'Reactivar dormidos 30 días', objective: 'reactivacion', status: 'activa', budget: 80, spent: 32, channel: 'whatsapp', startDate: daysAgo(6), endDate: daysAgo(-24), impressions: 624, clicks: 0, leads: 0, orders: 28, revenue: 642.00 },
  { id: 'cmp-vk-6', name: 'Lanzamiento Pizza Velo (cerrada)', objective: 'captacion', status: 'finalizada', budget: 1000, spent: 1000, channel: 'meta', startDate: daysAgo(95), endDate: daysAgo(65), impressions: 220000, clicks: 5200, leads: 380, orders: 188, revenue: 2842.00 },
]

export const CAMPAIGNS: Record<BusinessId, Campaign[]> = {
  'smash-lab': SL,
  'la-cabana': LC,
  'velocity-kitchen': VK,
}
