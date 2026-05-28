import { useMemo, useState } from 'react'
import { Megaphone, Target, TrendingUp, Users, Eye, MousePointerClick, ShoppingBag } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { KPI } from '../components/KPI'
import { useBusiness } from '../context/BusinessContext'
import { CAMPAIGNS } from '../data/campaigns'
import { eur, num, pct, cn } from '../lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import type { CampaignStatus } from '../types'

const STATUS_VAR: Record<CampaignStatus, 'good' | 'warn' | 'bad' | 'info' | 'neutral'> = {
  activa: 'good', pausada: 'warn', finalizada: 'neutral', borrador: 'info',
}

const OBJ_LABEL: Record<string, string> = {
  captacion: 'Captación',
  reactivacion: 'Reactivación',
  fidelizacion: 'Fidelización',
  'horas-valle': 'Horas valle',
  'producto-margen': 'Producto alto margen',
}

export function Campanas() {
  const { businessId, business } = useBusiness()
  const campaigns = CAMPAIGNS[businessId]
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'all'>('all')

  const filtered = statusFilter === 'all' ? campaigns : campaigns.filter((c) => c.status === statusFilter)

  const totalSpent = campaigns.filter((c) => c.status !== 'borrador').reduce((s, c) => s + c.spent, 0)
  const totalRevenue = campaigns.filter((c) => c.status !== 'borrador').reduce((s, c) => s + c.revenue, 0)
  const totalLeads = campaigns.reduce((s, c) => s + c.leads, 0)
  const totalOrders = campaigns.reduce((s, c) => s + c.orders, 0)
  const avgRoas = totalSpent > 0 ? totalRevenue / totalSpent : 0
  const avgCpl = totalLeads > 0 ? totalSpent / totalLeads : 0

  const chartData = useMemo(() => campaigns.map((c) => ({
    name: c.name.length > 22 ? c.name.slice(0, 22) + '…' : c.name,
    spent: c.spent,
    revenue: c.revenue,
    roas: c.spent > 0 ? Number((c.revenue / c.spent).toFixed(2)) : 0,
  })), [campaigns])

  return (
    <div>
      <PageHeader
        title="Campañas Meta Ads + Crecimiento"
        subtitle={`${business.name} · Atribución conectada a CRM · ROAS calculado por pedido`}
        icon={<Megaphone className="h-5 w-5" />}
        actions={<button className="ofs-btn-primary text-sm">+ Nueva campaña</button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <KPI label="Invertido" value={eur(totalSpent, 0)} icon={<Target className="h-4 w-4" />} />
        <KPI label="Ingresos atribuidos" value={eur(totalRevenue, 0)} delta={{ value: '+34,2%', positive: true }} />
        <KPI label="ROAS medio" value={`${avgRoas.toFixed(2)}×`} icon={<TrendingUp className="h-4 w-4" />} hint="objetivo 3×" />
        <KPI label="Leads totales" value={num(totalLeads)} icon={<Users className="h-4 w-4" />} />
        <KPI label="CPL medio" value={eur(avgCpl)} hint={`${totalOrders} pedidos atribuidos`} />
      </div>

      <div className="ofs-card p-5 mb-6">
        <div className="text-sm font-semibold text-ofs-text mb-3">Comparativa inversión vs ingresos por campaña</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#26262b" />
            <XAxis dataKey="name" stroke="#8a8a92" fontSize={10} angle={-15} textAnchor="end" height={70} />
            <YAxis stroke="#8a8a92" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
            <Tooltip
              contentStyle={{ background: '#17171a', border: '1px solid #26262b', borderRadius: 8, fontSize: 12 }}
              formatter={(v: number, key: string) => key === 'roas' ? `${v}×` : eur(v, 0)}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#8a8a92' }} />
            <Bar dataKey="spent" name="Invertido" fill="#facc15" radius={[4, 4, 0, 0]} />
            <Bar dataKey="revenue" name="Ingresos" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1.5 mb-4 flex-wrap">
        {(['all', 'activa', 'pausada', 'finalizada'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn('badge px-3 py-1', statusFilter === s ? 'bg-ofs-accent/15 text-ofs-accent' : 'bg-ofs-card text-ofs-mute')}
          >
            {s === 'all' ? 'Todas' : s} ({s === 'all' ? campaigns.length : campaigns.filter((c) => c.status === s).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c) => {
          const roas = c.spent > 0 ? c.revenue / c.spent : 0
          const cpl = c.leads > 0 ? c.spent / c.leads : 0
          const cpp = c.orders > 0 ? c.spent / c.orders : 0
          const used = c.budget > 0 ? (c.spent / c.budget) * 100 : 0
          return (
            <div key={c.id} className="ofs-card p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={STATUS_VAR[c.status]}>{c.status}</Badge>
                    <Badge variant="info">{OBJ_LABEL[c.objective]}</Badge>
                    <Badge variant="neutral">{c.channel}</Badge>
                  </div>
                  <h3 className="font-semibold text-ofs-text">{c.name}</h3>
                  {c.segment && <div className="text-xs text-ofs-mute mt-0.5">Segmento: {c.segment}</div>}
                </div>
                <div className="text-right">
                  <div className="text-xs text-ofs-mute">ROAS</div>
                  <div className={cn('text-2xl font-display font-bold', roas >= 3 ? 'text-ofs-good' : roas >= 1 ? 'text-ofs-warn' : 'text-ofs-bad')}>
                    {roas.toFixed(2)}×
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs mb-3">
                <div className="ofs-card bg-ofs-panel p-2">
                  <div className="text-[10px] uppercase tracking-wider text-ofs-mute"><Eye className="h-2.5 w-2.5 inline mr-1" />Impr.</div>
                  <div className="font-display font-bold text-ofs-text">{num(c.impressions)}</div>
                </div>
                <div className="ofs-card bg-ofs-panel p-2">
                  <div className="text-[10px] uppercase tracking-wider text-ofs-mute"><MousePointerClick className="h-2.5 w-2.5 inline mr-1" />Clicks</div>
                  <div className="font-display font-bold text-ofs-text">{num(c.clicks)}</div>
                </div>
                <div className="ofs-card bg-ofs-panel p-2">
                  <div className="text-[10px] uppercase tracking-wider text-ofs-mute"><Users className="h-2.5 w-2.5 inline mr-1" />Leads</div>
                  <div className="font-display font-bold text-ofs-text">{c.leads}</div>
                </div>
                <div className="ofs-card bg-ofs-panel p-2">
                  <div className="text-[10px] uppercase tracking-wider text-ofs-mute"><ShoppingBag className="h-2.5 w-2.5 inline mr-1" />Pedidos</div>
                  <div className="font-display font-bold text-ofs-text">{c.orders}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3 pb-3 border-b border-ofs-border text-xs">
                <div>
                  <div className="text-ofs-mute">CPL</div>
                  <div className="text-ofs-text font-medium">{eur(cpl)}</div>
                </div>
                <div>
                  <div className="text-ofs-mute">Coste/pedido</div>
                  <div className="text-ofs-text font-medium">{eur(cpp)}</div>
                </div>
                <div>
                  <div className="text-ofs-mute">Ingresos</div>
                  <div className="text-ofs-text font-medium">{eur(c.revenue, 0)}</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-ofs-mute">Presupuesto consumido</span>
                  <span className="text-ofs-text">{eur(c.spent)} / {eur(c.budget)} ({pct(used)})</span>
                </div>
                <div className="h-2 bg-ofs-panel rounded overflow-hidden">
                  <div className="h-full bg-ofs-gradient transition-all" style={{ width: `${Math.min(100, used)}%` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
