import { useMemo, useState } from 'react'
import { Receipt, Upload, Sparkles, Check, AlertTriangle, Building2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { KPI } from '../components/KPI'
import { useBusiness } from '../context/BusinessContext'
import { INVOICES, EXPENSES } from '../data/invoices'
import { SUPPLIERS } from '../data/suppliers'
import { eur, pct, relativeDate, cn } from '../lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts'

const CAT_COLORS: Record<string, string> = {
  comida: '#ff6a00', bebida: '#ff2d87', luz: '#facc15', agua: '#3b82f6', gas: '#8b5cf6',
  alquiler: '#22c55e', personal: '#ef4444', marketing: '#06b6d4', seguros: '#a3a3a3',
  mantenimiento: '#84cc16', otros: '#737373',
}

export function Facturas() {
  const { businessId, business } = useBusiness()
  const invoices = INVOICES[businessId]
  const expenses = EXPENSES[businessId]
  const suppliers = SUPPLIERS[businessId]
  const [tab, setTab] = useState<'facturas' | 'gastos' | 'proveedores' | 'ocr'>('facturas')

  const pending = invoices.filter((i) => i.status === 'pendiente' || i.status === 'vencida')
  const totalSpentYear = expenses.reduce((s, e) => s + e.amount, 0)
  const byCategory = useMemo(() => {
    const m = new Map<string, number>()
    expenses.forEach((e) => m.set(e.category, (m.get(e.category) || 0) + e.amount))
    return Array.from(m.entries()).map(([name, value]) => ({ name, value: Math.round(value), color: CAT_COLORS[name] || '#737373' }))
  }, [expenses])
  const totalLast30 = byCategory.reduce((s, c) => s + c.value, 0)

  const ocrShowcase = invoices.slice(0, 3)

  return (
    <div>
      <PageHeader
        title="Facturas, gastos y proveedores"
        subtitle={`${business.name} · OCR automático · Categorización inteligente`}
        icon={<Receipt className="h-5 w-5" />}
        actions={<button className="ofs-btn-primary text-sm"><Upload className="h-4 w-4" /> Subir factura</button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Facturas pendientes" value={pending.length} icon={<AlertTriangle className="h-4 w-4" />} hint={`${eur(pending.reduce((s, p) => s + p.total, 0), 0)} por pagar`} />
        <KPI label="Gasto últimos 6 meses" value={eur(totalSpentYear, 0)} />
        <KPI label="Precisión OCR media" value="91,4%" delta={{ value: '+2,3pp', positive: true }} icon={<Sparkles className="h-4 w-4" />} />
        <KPI label="Proveedores" value={suppliers.length} icon={<Building2 className="h-4 w-4" />} />
      </div>

      <div className="flex items-center gap-1 mb-4 border-b border-ofs-border">
        {(['facturas', 'gastos', 'proveedores', 'ocr'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn('px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px', tab === t ? 'text-ofs-accent border-ofs-accent' : 'text-ofs-mute border-transparent hover:text-ofs-text')}
          >
            {t === 'ocr' ? 'OCR en vivo' : t}
          </button>
        ))}
      </div>

      {tab === 'facturas' && (
        <div className="ofs-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ofs-panel">
                <tr className="text-left text-xs uppercase tracking-wider text-ofs-mute">
                  <th className="px-4 py-3">Número</th>
                  <th className="px-4 py-3">Proveedor</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3 text-right">Base</th>
                  <th className="px-4 py-3 text-right">IVA</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3">OCR</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 25).map((i) => (
                  <tr key={i.id} className="border-t border-ofs-border hover:bg-ofs-panel/50">
                    <td className="px-4 py-2.5 text-xs font-mono text-ofs-mute">{i.number}</td>
                    <td className="px-4 py-2.5 text-ofs-text">{i.supplierName}</td>
                    <td className="px-4 py-2.5"><Badge variant="info" className="capitalize">{i.category}</Badge></td>
                    <td className="px-4 py-2.5 text-xs text-ofs-mute">{relativeDate(i.date)}</td>
                    <td className="px-4 py-2.5 text-right text-ofs-mute">{eur(i.baseImponible)}</td>
                    <td className="px-4 py-2.5 text-right text-ofs-mute">{eur(i.iva)}</td>
                    <td className="px-4 py-2.5 text-right font-display font-bold text-ofs-text">{eur(i.total)}</td>
                    <td className="px-4 py-2.5">
                      <span className={cn('text-xs', i.ocrConfidence >= 90 ? 'text-ofs-good' : i.ocrConfidence >= 85 ? 'text-ofs-warn' : 'text-ofs-bad')}>
                        {pct(i.ocrConfidence)}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={i.status === 'pagada' ? 'good' : i.status === 'vencida' ? 'bad' : 'warn'}>{i.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'gastos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="ofs-card p-5 lg:col-span-2">
            <div className="text-sm font-semibold text-ofs-text mb-3">Gasto por categoría (últimos 30 días)</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byCategory.slice(0, 6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#26262b" />
                <XAxis type="number" stroke="#8a8a92" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                <YAxis type="category" dataKey="name" stroke="#8a8a92" fontSize={11} width={90} />
                <Tooltip contentStyle={{ background: '#17171a', border: '1px solid #26262b', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => eur(v, 0)} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {byCategory.slice(0, 6).map((c, i) => <Cell key={i} fill={c.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="ofs-card p-5">
            <div className="text-sm font-semibold text-ofs-text mb-3">Distribución</div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={40} outerRadius={75} paddingAngle={2}>
                  {byCategory.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#17171a', border: '1px solid #26262b', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => eur(v, 0)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center pt-2 border-t border-ofs-border mt-2">
              <div className="text-xs text-ofs-mute">Total mes</div>
              <div className="text-2xl font-display font-bold text-ofs-text">{eur(totalLast30, 0)}</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'proveedores' && (
        <div className="ofs-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ofs-panel">
              <tr className="text-left text-xs uppercase tracking-wider text-ofs-mute">
                <th className="px-4 py-3">Proveedor</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3 text-right">Facturas</th>
                <th className="px-4 py-3 text-right">Total gastado</th>
                <th className="px-4 py-3 text-right">Rating</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id} className="border-t border-ofs-border hover:bg-ofs-panel/50">
                  <td className="px-4 py-2.5 text-ofs-text font-medium">{s.name}</td>
                  <td className="px-4 py-2.5"><Badge variant="neutral">{s.category}</Badge></td>
                  <td className="px-4 py-2.5 text-xs text-ofs-mute">{s.contact}</td>
                  <td className="px-4 py-2.5 text-right text-ofs-text">{s.invoicesCount}</td>
                  <td className="px-4 py-2.5 text-right font-display font-bold text-ofs-text">{eur(s.totalSpent, 0)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={cn('text-sm font-medium', s.rating >= 4.5 ? 'text-ofs-good' : s.rating >= 4 ? 'text-ofs-warn' : 'text-ofs-bad')}>
                      ★ {s.rating.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'ocr' && (
        <div className="space-y-4">
          <div className="ofs-card p-5 bg-ofs-gradient/5 border-ofs-accent/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg bg-ofs-gradient flex items-center justify-center"><Sparkles className="h-5 w-5 text-white" /></div>
              <div>
                <div className="text-sm font-semibold text-ofs-text">OCR automático sobre facturas españolas</div>
                <div className="text-xs text-ofs-mute">Tesseract.js local · sin enviar a la nube · precisión 85-95%</div>
              </div>
            </div>
            <p className="text-sm text-ofs-mute">Subes la foto / PDF de la factura → el sistema extrae proveedor, CIF, fecha, número, base imponible, IVA, total y categoría. Auto-rellena el formulario. Tú solo revisas y guardas.</p>
          </div>

          {ocrShowcase.map((inv) => (
            <div key={inv.id} className="ofs-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-ofs-text">Factura {inv.number}</div>
                  <div className="text-xs text-ofs-mute">{inv.supplierName} · {relativeDate(inv.date)}</div>
                </div>
                <Badge variant={inv.ocrConfidence >= 90 ? 'good' : inv.ocrConfidence >= 85 ? 'warn' : 'bad'}>
                  <Sparkles className="h-3 w-3" /> OCR {pct(inv.ocrConfidence)}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                {[
                  ['Proveedor', inv.supplierName],
                  ['Categoría', inv.category],
                  ['Base imponible', eur(inv.baseImponible)],
                  ['IVA (10%)', eur(inv.iva)],
                  ['Total', eur(inv.total)],
                ].map(([k, v]) => (
                  <div key={k} className="ofs-card p-2.5 bg-ofs-panel">
                    <div className="text-[10px] uppercase tracking-wider text-ofs-mute">{k}</div>
                    <div className="font-medium text-ofs-text mt-0.5 truncate">{v}</div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-ofs-good">
                      <Check className="h-2.5 w-2.5" /> Auto-extraído
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
