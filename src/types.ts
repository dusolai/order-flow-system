export type BusinessId = 'smash-lab' | 'la-cabana' | 'velocity-kitchen'

export type Vertical = 'hamburgueseria' | 'restaurante' | 'dark-kitchen'

export interface Business {
  id: BusinessId
  name: string
  vertical: Vertical
  tagline: string
  city: string
  hours: string
  channels: Channel[]
  brandColor: string
  ticketMedio: number
  pedidosDia: number
}

export type Channel = 'whatsapp' | 'sala' | 'delivery' | 'recogida' | 'web' | 'telefono' | 'instagram'

export type Role = 'owner' | 'gerente' | 'camarero' | 'cocina' | 'marketing' | 'administracion' | 'soporte'

export interface User {
  id: string
  name: string
  role: Role
  department: string
  email: string
  active: boolean
  avatar?: string
}

export type ClientSegment = 'nuevo' | 'recurrente' | 'vip' | 'dormido' | 'campana' | 'incidencia'

export interface Client {
  id: string
  name: string
  phone: string
  email?: string
  segment: ClientSegment
  origin: Channel
  totalOrders: number
  totalSpent: number
  ticketMedio: number
  lastOrder: string
  firstOrder: string
  tags: string[]
}

export type Allergen = 'gluten' | 'lactosa' | 'frutos-secos' | 'huevo' | 'pescado' | 'soja' | 'apio' | 'mostaza' | 'sesamo'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  cost: number
  margin: number
  stock: number
  stockMin: number
  unit: string
  allergens: Allergen[]
  active: boolean
  image?: string
  ingredients?: string[]
}

export interface RecipeIngredient {
  productId: string
  ingredient: string
  qty: number
  unit: string
  costPerUnit: number
}

export type OrderStatus = 'pendiente' | 'preparando' | 'listo' | 'enviado' | 'entregado' | 'cancelado'
export type PaymentMethod = 'efectivo' | 'tarjeta' | 'online' | 'bizum' | 'mixto'

export interface Order {
  id: string
  clientId: string
  clientName: string
  channel: Channel
  items: OrderItem[]
  total: number
  status: OrderStatus
  payment: PaymentMethod
  createdAt: string
  notes?: string
  table?: string
}

export interface OrderItem {
  productId: string
  productName: string
  qty: number
  price: number
  modifications?: string[]
  doneness?: 'poco' | 'punto' | 'hecha'
}

export type TaskPriority = 'baja' | 'media' | 'alta' | 'critica'
export type TaskStatus = 'pendiente' | 'en-proceso' | 'bloqueada' | 'completada'

export interface Task {
  id: string
  title: string
  assignee: string
  department: string
  priority: TaskPriority
  status: TaskStatus
  due: string
  notes?: string
}

export interface Supplier {
  id: string
  name: string
  contact: string
  category: string
  rating: number
  totalSpent: number
  invoicesCount: number
}

export type InvoiceStatus = 'pendiente' | 'pagada' | 'vencida'

export interface Invoice {
  id: string
  number: string
  supplierName: string
  date: string
  baseImponible: number
  iva: number
  total: number
  category: string
  status: InvoiceStatus
  ocrConfidence: number
}

export type ExpenseCategory =
  | 'comida' | 'bebida' | 'luz' | 'agua' | 'gas' | 'alquiler'
  | 'personal' | 'marketing' | 'seguros' | 'mantenimiento' | 'otros'

export interface Expense {
  id: string
  category: ExpenseCategory
  amount: number
  date: string
  description: string
}

export type CampaignObjective = 'captacion' | 'reactivacion' | 'fidelizacion' | 'horas-valle' | 'producto-margen'
export type CampaignStatus = 'borrador' | 'activa' | 'pausada' | 'finalizada'

export interface Campaign {
  id: string
  name: string
  objective: CampaignObjective
  status: CampaignStatus
  budget: number
  spent: number
  channel: 'meta' | 'google' | 'whatsapp' | 'email'
  startDate: string
  endDate: string
  impressions: number
  clicks: number
  leads: number
  orders: number
  revenue: number
  segment?: string
}

export interface ConversationMessage {
  role: 'cliente' | 'bot' | 'humano'
  content: string
  timestamp?: string
  intent?: string
  meta?: string
}

export interface Conversation {
  id: string
  clientName: string
  clientPhone: string
  channel: 'whatsapp' | 'telegram' | 'instagram'
  messages: ConversationMessage[]
  outcome: 'pedido' | 'consulta' | 'abandonado' | 'recuperado' | 'humano'
  orderId?: string
  ticketSubidoEUR?: number
}

export interface StockMovement {
  id: string
  productId: string
  productName: string
  type: 'entrada' | 'salida' | 'merma' | 'ajuste'
  qty: number
  date: string
  reason?: string
}

export interface KPISnapshot {
  ventasHoy: number
  ventasSemana: number
  ventasMes: number
  pedidosHoy: number
  ticketMedio: number
  clientesNuevos: number
  clientesRecuperados: number
  conversionWA: number
  margenEstimado: number
  cajaEfectivo: number
  cajaTarjeta: number
  cajaOnline: number
  facturasPendientes: number
  stockCritico: number
  leads: number
  cpl: number
  roas: number
}
