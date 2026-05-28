import { useMemo, useState } from 'react'
import { Package, AlertTriangle, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { KPI } from '../components/KPI'
import { useBusiness } from '../context/BusinessContext'
import { MENUS } from '../data/menus'
import { STOCK_MOVEMENTS } from '../data/stock'
import { eur, pct, relativeDate, cn } from '../lib/utils'

export function Stock() {
  const { businessId, business } = useBusiness()
  const products = MENUS[businessId]
  const movements = STOCK_MOVEMENTS[businessId]
  const [tab, setTab] = useState<'productos' | 'escandallos' | 'movimientos'>('productos')

  const critical = products.filter((p) => p.stock < p.stockMin)
  const totalValue = products.reduce((s, p) => s + p.stock * p.cost, 0)
  const avgMargin = useMemo(() => {
    const valid = products.filter((p) => p.price > 0)
    const sum = valid.reduce((s, p) => s + ((p.price - p.cost) / p.price) * 100, 0)
    return sum / valid.length
  }, [products])

  const grouped = products.reduce<Record<string, typeof products>>((acc, p) => {
    acc[p.category] = acc[p.category] || []
    acc[p.category].push(p)
    return acc
  }, {})

  return (
    <div>
      <PageHeader
        title="Stock, escandallos y márgenes"
        subtitle={`${business.name} · ${products.length} productos · descuento automático por venta`}
        icon={<Package className="h-5 w-5" />}
        actions={
          <div className="flex gap-2">
            <button className="ofs-btn-secondary text-sm"><ArrowDownToLine className="h-4 w-4" /> Recepción</button>
            <button className="ofs-btn-primary text-sm">+ Producto</button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Productos en catálogo" value={products.length} icon={<Package className="h-4 w-4" />} />
        <KPI label="Stock crítico" value={critical.length} icon={<AlertTriangle className="h-4 w-4" />} hint="por debajo del mínimo" />
        <KPI label="Margen medio" value={pct(avgMargin)} delta={{ value: '+0,6pp', positive: true }} icon={<TrendingUp className="h-4 w-4" />} />
        <KPI label="Valor de inventario" value={eur(totalValue, 0)} hint="a coste" />
      </div>

      {critical.length > 0 && (
        <div className="ofs-card p-4 mb-6 bg-ofs-bad/5 border-ofs-bad/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-ofs-bad" />
            <span className="text-sm font-semibold text-ofs-text">Productos por debajo del stock mínimo</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {critical.map((p) => (
              <span key={p.id} className="badge px-3 py-1.5 bg-ofs-bad/10 text-ofs-bad border border-ofs-bad/20">
                {p.name} · stock {p.stock} / mín {p.stockMin}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 mb-4 border-b border-ofs-border">
        {(['productos', 'escandallos', 'movimientos'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn('px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px', tab === t ? 'text-ofs-accent border-ofs-accent' : 'text-ofs-mute border-transparent hover:text-ofs-text')}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'productos' && (
        <div className="space-y-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="ofs-card overflow-hidden">
              <div className="px-4 py-2.5 bg-ofs-panel border-b border-ofs-border flex items-center justify-between">
                <span className="text-sm font-semibold text-ofs-text">{cat}</span>
                <span className="text-xs text-ofs-mute">{items.length} productos</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-ofs-mute">
                      <th className="px-4 py-2">Producto</th>
                      <th className="px-4 py-2 text-right">PVP</th>
                      <th className="px-4 py-2 text-right">Coste</th>
                      <th className="px-4 py-2 text-right">Margen €</th>
                      <th className="px-4 py-2 text-right">Margen %</th>
                      <th className="px-4 py-2 text-right">Stock</th>
                      <th className="px-4 py-2">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p) => {
                      const marginPct = (p.margin / p.price) * 100
                      const lowStock = p.stock < p.stockMin
                      return (
                        <tr key={p.id} className="border-t border-ofs-border hover:bg-ofs-panel/50">
                          <td className="px-4 py-2.5 text-ofs-text">{p.name}</td>
                          <td className="px-4 py-2.5 text-right text-ofs-text">{eur(p.price)}</td>
                          <td className="px-4 py-2.5 text-right text-ofs-mute">{eur(p.cost)}</td>
                          <td className="px-4 py-2.5 text-right text-ofs-text">{eur(p.margin)}</td>
                          <td className="px-4 py-2.5 text-right">
                            <span className={cn(marginPct > 65 ? 'text-ofs-good' : marginPct > 50 ? 'text-ofs-text' : 'text-ofs-warn')}>
                              {pct(marginPct)}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right text-ofs-text">{p.stock === 999 ? '∞' : p.stock} {p.unit}</td>
                          <td className="px-4 py-2.5">
                            {lowStock ? <Badge variant="bad">Crítico</Badge> : <Badge variant="good">OK</Badge>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'escandallos' && (
        <div className="space-y-3">
          {products.filter((p) => p.ingredients && p.ingredients.length).slice(0, 8).map((p) => {
            const marginPct = (p.margin / p.price) * 100
            return (
              <div key={p.id} className="ofs-card p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-base font-semibold text-ofs-text">{p.name}</div>
                    <div className="text-xs text-ofs-mute mt-0.5">{p.category} · {p.allergens.length} alérgenos · PVP {eur(p.price)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-ofs-mute">Margen bruto</div>
                    <div className="text-xl font-display font-bold text-ofs-good">{eur(p.margin)}</div>
                    <div className="text-xs text-ofs-mute">{pct(marginPct)}</div>
                  </div>
                </div>
                <div className="text-xs uppercase tracking-wider text-ofs-mute mb-1.5">Receta</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.ingredients?.map((ing, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded bg-ofs-panel border border-ofs-border text-ofs-text">{ing}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-ofs-border">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ofs-mute">Coste real</div>
                    <div className="text-sm font-display font-bold text-ofs-text">{eur(p.cost)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ofs-mute">PVP</div>
                    <div className="text-sm font-display font-bold text-ofs-text">{eur(p.price)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ofs-mute">% margen</div>
                    <div className="text-sm font-display font-bold text-ofs-text">{pct(marginPct)}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'movimientos' && (
        <div className="ofs-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ofs-panel">
                <tr className="text-left text-xs uppercase tracking-wider text-ofs-mute">
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3 text-right">Cantidad</th>
                  <th className="px-4 py-3">Motivo</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {movements.slice(0, 25).map((m) => (
                  <tr key={m.id} className="border-t border-ofs-border">
                    <td className="px-4 py-2.5 text-ofs-text">{m.productName}</td>
                    <td className="px-4 py-2.5">
                      {m.type === 'entrada' && <Badge variant="good"><ArrowDownToLine className="h-3 w-3" /> Entrada</Badge>}
                      {m.type === 'salida' && <Badge variant="info"><ArrowUpFromLine className="h-3 w-3" /> Salida</Badge>}
                      {m.type === 'merma' && <Badge variant="bad">Merma</Badge>}
                      {m.type === 'ajuste' && <Badge variant="warn">Ajuste</Badge>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-ofs-text">{m.qty}</td>
                    <td className="px-4 py-2.5 text-xs text-ofs-mute">{m.reason}</td>
                    <td className="px-4 py-2.5 text-xs text-ofs-mute">{relativeDate(m.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
