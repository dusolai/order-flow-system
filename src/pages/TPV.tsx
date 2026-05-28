import { useMemo, useState } from 'react'
import { CreditCard, Plus, Minus, Trash2, Banknote, Smartphone, Wifi, Printer, X } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { KPI } from '../components/KPI'
import { useBusiness } from '../context/BusinessContext'
import { MENUS } from '../data/menus'
import { KPIS } from '../data/kpis'
import { eur, cn } from '../lib/utils'
import type { Product } from '../types'

interface CartLine {
  product: Product
  qty: number
}

export function TPV() {
  const { businessId, business } = useBusiness()
  const products = MENUS[businessId]
  const kpi = KPIS[businessId]
  const [category, setCategory] = useState<string>('all')
  const [cart, setCart] = useState<CartLine[]>([])

  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map((p) => p.category)))], [products])
  const filtered = category === 'all' ? products : products.filter((p) => p.category === category)

  const total = cart.reduce((s, l) => s + l.product.price * l.qty, 0)

  const add = (p: Product) => {
    setCart((c) => {
      const found = c.find((l) => l.product.id === p.id)
      if (found) return c.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l))
      return [...c, { product: p, qty: 1 }]
    })
  }
  const dec = (id: string) => setCart((c) => c.flatMap((l) => l.product.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l]))
  const remove = (id: string) => setCart((c) => c.filter((l) => l.product.id !== id))

  return (
    <div>
      <PageHeader
        title="TPV · Punto de venta"
        subtitle={`${business.name} · Turno actual: ${new Date().toLocaleDateString('es-ES', { weekday: 'long' })}`}
        icon={<CreditCard className="h-5 w-5" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Ventas turno" value={eur(kpi.ventasHoy)} delta={{ value: '+12,4%', positive: true }} />
        <KPI label="Pedidos turno" value={kpi.pedidosHoy} />
        <KPI label="Caja en efectivo" value={eur(kpi.cajaEfectivo)} icon={<Banknote className="h-4 w-4" />} />
        <KPI label="Pagos digitales" value={eur(kpi.cajaTarjeta + kpi.cajaOnline)} icon={<Smartphone className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[680px]">
        <div className="lg:col-span-2 ofs-card overflow-hidden flex flex-col">
          <div className="p-3 border-b border-ofs-border bg-ofs-panel flex items-center gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium flex-shrink-0 transition-colors',
                  category === c ? 'bg-ofs-gradient text-white' : 'bg-ofs-card text-ofs-mute hover:text-ofs-text',
                )}
              >
                {c === 'all' ? 'Todos' : c}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => add(p)}
                  className="ofs-card p-3 text-left hover:border-ofs-accent transition-colors group"
                >
                  <div className="text-sm font-semibold text-ofs-text leading-tight group-hover:text-ofs-accent">{p.name}</div>
                  <div className="text-xs text-ofs-mute mt-0.5">{p.category}</div>
                  <div className="flex items-end justify-between mt-3">
                    <div className="font-display font-bold text-ofs-text">{eur(p.price)}</div>
                    <div className="text-[10px] text-ofs-mute">stock {p.stock === 999 ? '∞' : p.stock}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="ofs-card flex flex-col overflow-hidden">
          <div className="p-3 border-b border-ofs-border bg-ofs-panel flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-ofs-text">Comanda actual</div>
              <div className="text-xs text-ofs-mute">{cart.length} líneas · Mesa libre</div>
            </div>
            {cart.length > 0 && (
              <button onClick={() => setCart([])} className="text-xs text-ofs-mute hover:text-ofs-bad"><X className="h-3.5 w-3.5" /></button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {cart.length === 0 && (
              <div className="text-center py-12 text-sm text-ofs-mute">
                <CreditCard className="h-8 w-8 mx-auto mb-2 opacity-30" />
                Toca un producto para añadir
              </div>
            )}
            {cart.map((l) => (
              <div key={l.product.id} className="border-b border-ofs-border py-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-ofs-text truncate">{l.product.name}</div>
                    <div className="text-xs text-ofs-mute">{eur(l.product.price)} c/u</div>
                  </div>
                  <button onClick={() => remove(l.product.id)} className="text-ofs-mute hover:text-ofs-bad p-1"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="inline-flex items-center gap-1.5 bg-ofs-panel border border-ofs-border rounded-lg overflow-hidden">
                    <button onClick={() => dec(l.product.id)} className="px-2 py-1 hover:bg-ofs-card"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="px-2 text-sm font-medium text-ofs-text">{l.qty}</span>
                    <button onClick={() => add(l.product)} className="px-2 py-1 hover:bg-ofs-card"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="text-sm font-display font-bold text-ofs-text">{eur(l.product.price * l.qty)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-ofs-border bg-ofs-panel space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ofs-mute">Subtotal</span>
              <span className="text-ofs-text">{eur(total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ofs-text">Total</span>
              <span className="text-2xl font-display font-bold text-ofs-text">{eur(total)}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-2">
              <button disabled={cart.length === 0} className="ofs-btn-secondary text-xs py-2 disabled:opacity-50 justify-center">
                <Banknote className="h-3.5 w-3.5" /> Efectivo
              </button>
              <button disabled={cart.length === 0} className="ofs-btn-secondary text-xs py-2 disabled:opacity-50 justify-center">
                <CreditCard className="h-3.5 w-3.5" /> Tarjeta
              </button>
              <button disabled={cart.length === 0} className="ofs-btn-secondary text-xs py-2 disabled:opacity-50 justify-center">
                <Wifi className="h-3.5 w-3.5" /> Bizum
              </button>
            </div>
            <button disabled={cart.length === 0} className="ofs-btn-primary w-full justify-center disabled:opacity-50">
              <Printer className="h-4 w-4" /> Cobrar y imprimir ticket
            </button>
            <div className="text-[10px] text-ofs-mute text-center mt-1">
              Demo · al cobrar se actualizan stock + caja + CRM + KPIs (en prod)
            </div>
          </div>
        </div>
      </div>

      <div className="ofs-card p-4 mt-6">
        <div className="text-sm font-semibold text-ofs-text mb-3">Ventas por usuario · turno actual</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Lucía Sanz', 'Hugo Pérez', 'Carla Romero', 'Joel Martín'].slice(0, businessId === 'velocity-kitchen' ? 0 : 4).map((name, i) => {
            const v = [842, 612, 420, 280][i]
            return (
              <div key={name} className="ofs-card p-3 bg-ofs-panel">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-ofs-gradient text-white text-[10px] font-bold flex items-center justify-center">
                    {name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="text-sm text-ofs-text">{name}</div>
                </div>
                <div className="text-xs text-ofs-mute mt-2">Ventas</div>
                <div className="text-lg font-display font-bold text-ofs-text">{eur(v)}</div>
              </div>
            )
          })}
          {businessId === 'velocity-kitchen' && (
            <div className="col-span-full text-sm text-ofs-mute text-center py-6 ofs-card bg-ofs-panel">
              Dark kitchen: sin sala. Pedidos enrutados directamente a cocina por marca virtual (Pizza Velo / Bowl Lab / Crispy Co).
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
