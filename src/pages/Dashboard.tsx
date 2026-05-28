import { LayoutDashboard, TrendingUp, Users, ShoppingBag, Banknote, AlertTriangle, Target, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { KPI } from '../components/KPI'
import { Badge } from '../components/Badge'
import { useBusiness } from '../context/BusinessContext'
import { KPIS } from '../data/kpis'
import { ORDERS } from '../data/orders'
import { CAMPAIGNS } from '../data/campaigns'
import { CLIENTS } from '../data/clients'
import { TASKS } from '../data/team'
import { eur, num, pct, relativeDate } from '../lib/utils'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

// Synthetic hourly sales for "hoy"
function buildHourly(seed: number, totalDay: number) {
  const peaks = [13, 14, 15, 20, 21, 22, 23]
  const data: { hour: string; ventas: number }[] = []
  let total = 0
  const weights: number[] = []
  for (let h = 0; h < 24; h++) {
    const close = peaks.reduce((min, p) => Math.min(min, Math.abs(h - p)), 99)
    const w = h >= 12 ? Math.max(0, 5 - close) + (h >= 12 && h < 16 ? 1 : 0) + (h >= 20 ? 1.5 : 0) : 0
    weights.push(w)
    total += w
  }
  for (let h = 0; h < 24; h++) {
    const v = total === 0 ? 0 : (weights[h] / total) * totalDay
    data.push({ hour: `${h}:00`, ventas: Math.round(v) })
  }
  return data
}

function build7d(seed: number, base: number) {
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const mult = [0.85, 0.78, 0.92, 1.0, 1.35, 1.55, 1.18]
  return days.map((d, i) => ({ day: d, ventas: Math.round(base * mult[i]) }))
}

const CHANNEL_COLORS = ['#ff6a00', '#ff2d87', '#facc15', '#22c55e', '#3b82f6']

export function Dashboard() {
  const { businessId, business } = useBusiness()
  const kpi = KPIS[businessId]
  const orders = ORDERS[businessId]
  const campaigns = CAMPAIGNS[businessId]
  const tasks = TASKS[businessId]
  const clients = CLIENTS[businessId]

  const totalCajaDia = kpi.cajaEfectivo + kpi.cajaTarjeta + kpi.cajaOnline
  const channelData = (() => {
    const m = new Map<string, number>()
    orders.slice(0, 50).forEach((o) => m.set(o.channel, (m.get(o.channel) || 0) + o.total))
    return Array.from(m.entries()).map(([name, value]) => ({ name, value: Math.round(value) }))
  })()
  const topProducts = (() => {
    const m = new Map<string, { count: number; revenue: number }>()
    orders.slice(0, 80).forEach((o) =>
      o.items.forEach((it) => {
        const c = m.get(it.productName) || { count: 0, revenue: 0 }
        c.count += it.qty
        c.revenue += it.qty * it.price
        m.set(it.productName, c)
      }),
    )
    return Array.from(m.entries())
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6)
  })()

  const hourly = buildHourly(1, kpi.ventasHoy)
  const weekly = build7d(1, kpi.ventasSemana / 7)

  const activeCampaigns = campaigns.filter((c) => c.status === 'activa')
  const totalRevenueCmp = activeCampaigns.reduce((s, c) => s + c.revenue, 0)
  const totalSpentCmp = activeCampaigns.reduce((s, c) => s + c.spent, 0)
  const avgRoas = totalSpentCmp > 0 ? totalRevenueCmp / totalSpentCmp : 0

  const criticalTasks = tasks.filter((t) => (t.priority === 'critica' || t.priority === 'alta') && t.status !== 'completada').slice(0, 5)

  return (
    <div>
      <PageHeader
        title="Dashboard ejecutivo"
        subtitle={`${business.name} · ${business.city} · Tiempo real`}
        icon={<LayoutDashboard className="h-5 w-5" />}
        actions={
          <Badge variant="info">
            <Sparkles className="h-3 w-3" /> Live · actualizado ahora
          </Badge>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Ventas hoy" value={eur(kpi.ventasHoy)} delta={{ value: '+12,4%', positive: true }} icon={<Banknote className="h-4 w-4" />} hint="vs ayer" />
        <KPI label="Pedidos hoy" value={kpi.pedidosHoy} delta={{ value: '+8 pedidos', positive: true }} icon={<ShoppingBag className="h-4 w-4" />} />
        <KPI label="Ticket medio" value={eur(kpi.ticketMedio)} delta={{ value: '+0,80€', positive: true }} icon={<TrendingUp className="h-4 w-4" />} hint="objetivo: 20€" />
        <KPI label="Margen estimado" value={pct(kpi.margenEstimado)} delta={{ value: '-1,2pp', positive: false }} icon={<Target className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Clientes nuevos (mes)" value={kpi.clientesNuevos} icon={<Users className="h-4 w-4" />} />
        <KPI label="Recuperados" value={kpi.clientesRecuperados} hint="reactivación automática" />
        <KPI label="Conversión WA → pedido" value={pct(kpi.conversionWA)} delta={{ value: '+3,4pp', positive: true }} />
        <KPI label="Stock crítico" value={kpi.stockCritico} icon={<AlertTriangle className="h-4 w-4" />} hint="productos por debajo del mínimo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="ofs-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-ofs-text">Ventas por hora · hoy</div>
              <div className="text-xs text-ofs-mute">{business.hours}</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hourly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#26262b" />
              <XAxis dataKey="hour" stroke="#8a8a92" fontSize={11} />
              <YAxis stroke="#8a8a92" fontSize={11} tickFormatter={(v) => `${v}€`} />
              <Tooltip contentStyle={{ background: '#17171a', border: '1px solid #26262b', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => eur(v)} />
              <Bar dataKey="ventas" fill="#ff6a00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="ofs-card p-5">
          <div className="text-sm font-semibold text-ofs-text mb-1">Ventas por canal</div>
          <div className="text-xs text-ofs-mute mb-3">Últimos 50 pedidos</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={channelData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {channelData.map((_, i) => (
                  <Cell key={i} fill={CHANNEL_COLORS[i % CHANNEL_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#17171a', border: '1px solid #26262b', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => eur(v)} />
              <Legend verticalAlign="bottom" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#8a8a92' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="ofs-card p-5">
          <div className="text-sm font-semibold text-ofs-text mb-1">Tendencia 7 días</div>
          <div className="text-xs text-ofs-mute mb-3">Pico viernes y sábado</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#26262b" />
              <XAxis dataKey="day" stroke="#8a8a92" fontSize={11} />
              <YAxis stroke="#8a8a92" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <Tooltip contentStyle={{ background: '#17171a', border: '1px solid #26262b', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => eur(v)} />
              <Line type="monotone" dataKey="ventas" stroke="#ff2d87" strokeWidth={2.5} dot={{ fill: '#ff2d87', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="ofs-card p-5">
          <div className="text-sm font-semibold text-ofs-text mb-3">Top productos (revenue)</div>
          <div className="space-y-2">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="text-xs text-ofs-mute w-5">{i + 1}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-ofs-text truncate">{p.name}</div>
                  <div className="text-xs text-ofs-mute">{p.count} unidades</div>
                </div>
                <div className="text-sm font-display font-bold text-ofs-text">{eur(p.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="ofs-card p-5">
          <div className="text-sm font-semibold text-ofs-text mb-3">Caja del día</div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ofs-mute">Efectivo</span>
              <span className="text-sm font-display font-bold text-ofs-text">{eur(kpi.cajaEfectivo)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ofs-mute">Tarjeta</span>
              <span className="text-sm font-display font-bold text-ofs-text">{eur(kpi.cajaTarjeta)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ofs-mute">Online / Bizum</span>
              <span className="text-sm font-display font-bold text-ofs-text">{eur(kpi.cajaOnline)}</span>
            </div>
            <div className="h-px bg-ofs-border my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ofs-text">Total</span>
              <span className="text-base font-display font-bold text-ofs-text">{eur(totalCajaDia)}</span>
            </div>
          </div>
        </div>

        <div className="ofs-card p-5">
          <div className="text-sm font-semibold text-ofs-text mb-3">Marketing</div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ofs-mute">Leads (campañas activas)</span>
              <span className="text-sm font-display font-bold text-ofs-text">{num(kpi.leads)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ofs-mute">CPL medio</span>
              <span className="text-sm font-display font-bold text-ofs-text">{eur(kpi.cpl)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ofs-mute">Invertido (activas)</span>
              <span className="text-sm font-display font-bold text-ofs-text">{eur(totalSpentCmp)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ofs-mute">Ingresos atribuidos</span>
              <span className="text-sm font-display font-bold text-ofs-text">{eur(totalRevenueCmp)}</span>
            </div>
            <div className="h-px bg-ofs-border my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ofs-text">ROAS</span>
              <span className="text-base font-display font-bold text-ofs-good">{avgRoas.toFixed(2)}×</span>
            </div>
          </div>
        </div>

        <div className="ofs-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-ofs-text">Tareas críticas</div>
            <Badge variant="bad">{criticalTasks.length}</Badge>
          </div>
          <div className="space-y-2">
            {criticalTasks.length === 0 && <p className="text-xs text-ofs-mute">Sin tareas críticas. Todo bajo control.</p>}
            {criticalTasks.map((t) => (
              <div key={t.id} className="border border-ofs-border rounded-md p-2 bg-ofs-panel">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-medium text-ofs-text leading-tight">{t.title}</div>
                  <Badge variant={t.priority === 'critica' ? 'bad' : 'warn'}>{t.priority}</Badge>
                </div>
                <div className="text-[10px] text-ofs-mute mt-1">{t.assignee} · {t.department}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ofs-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-ofs-text">Pedidos recientes</div>
          <Badge variant="info">{orders.length} totales</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-ofs-mute">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Cliente</th>
                <th className="py-2 pr-4">Canal</th>
                <th className="py-2 pr-4">Items</th>
                <th className="py-2 pr-4 text-right">Total</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4">Hora</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((o) => (
                <tr key={o.id} className="border-t border-ofs-border">
                  <td className="py-2 pr-4 text-xs font-mono text-ofs-mute">{o.id.split('-').pop()}</td>
                  <td className="py-2 pr-4 text-ofs-text">{o.clientName}</td>
                  <td className="py-2 pr-4 text-ofs-mute capitalize">{o.channel}</td>
                  <td className="py-2 pr-4 text-ofs-mute">{o.items.length} prod.</td>
                  <td className="py-2 pr-4 text-right font-display font-bold text-ofs-text">{eur(o.total)}</td>
                  <td className="py-2 pr-4">
                    <Badge variant={
                      o.status === 'entregado' ? 'good' :
                      o.status === 'cancelado' ? 'bad' :
                      o.status === 'preparando' || o.status === 'listo' ? 'warn' : 'info'
                    }>{o.status}</Badge>
                  </td>
                  <td className="py-2 pr-4 text-xs text-ofs-mute">{relativeDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
