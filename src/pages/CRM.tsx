import { useState, useMemo } from 'react'
import { Users, Search, Mail, Phone, Tag, Star, MessageCircle } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { KPI } from '../components/KPI'
import { useBusiness } from '../context/BusinessContext'
import { CLIENTS } from '../data/clients'
import type { ClientSegment } from '../types'
import { eur, relativeDate } from '../lib/utils'
import { cn } from '../lib/utils'

const SEG_LABEL: Record<ClientSegment, string> = {
  nuevo: 'Nuevo', recurrente: 'Recurrente', vip: 'VIP', dormido: 'Dormido', campana: 'De campaña', incidencia: 'Incidencia',
}
const SEG_VAR: Record<ClientSegment, 'good' | 'warn' | 'bad' | 'info' | 'neutral'> = {
  nuevo: 'info', recurrente: 'good', vip: 'good', dormido: 'warn', campana: 'info', incidencia: 'bad',
}

export function CRM() {
  const { businessId, business } = useBusiness()
  const clients = CLIENTS[businessId]
  const [search, setSearch] = useState('')
  const [seg, setSeg] = useState<ClientSegment | 'all'>('all')

  const filtered = useMemo(() => {
    return clients
      .filter((c) => (seg === 'all' ? true : c.segment === seg))
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search))
      .sort((a, b) => b.totalSpent - a.totalSpent)
  }, [clients, search, seg])

  const bySeg = useMemo(() => {
    const m = new Map<ClientSegment, number>()
    clients.forEach((c) => m.set(c.segment, (m.get(c.segment) || 0) + 1))
    return m
  }, [clients])

  const totalRevenue = clients.reduce((s, c) => s + c.totalSpent, 0)
  const vipRevenue = clients.filter((c) => c.segment === 'vip').reduce((s, c) => s + c.totalSpent, 0)

  return (
    <div>
      <PageHeader
        title="CRM personalizado"
        subtitle={`${clients.length} clientes en ${business.name} · segmentación automática`}
        icon={<Users className="h-5 w-5" />}
        actions={<button className="ofs-btn-primary text-sm">+ Nuevo cliente</button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Clientes totales" value={clients.length} icon={<Users className="h-4 w-4" />} />
        <KPI label="Revenue acumulado" value={eur(totalRevenue, 0)} hint="vida del cliente (LTV total)" />
        <KPI label="Clientes VIP" value={bySeg.get('vip') || 0} hint={`${eur(vipRevenue, 0)} del total`} icon={<Star className="h-4 w-4" />} />
        <KPI label="Dormidos (reactivar)" value={bySeg.get('dormido') || 0} hint="+60 días sin pedir" />
      </div>

      <div className="ofs-card p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-ofs-mute absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o teléfono..."
              className="ofs-input w-full pl-9"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button onClick={() => setSeg('all')} className={cn('badge px-3 py-1', seg === 'all' ? 'bg-ofs-accent/15 text-ofs-accent' : 'bg-ofs-card text-ofs-mute')}>Todos ({clients.length})</button>
            {(['nuevo', 'recurrente', 'vip', 'dormido', 'campana', 'incidencia'] as ClientSegment[]).map((s) => (
              <button key={s} onClick={() => setSeg(s)} className={cn('badge px-3 py-1', seg === s ? `bg-ofs-accent/15 text-ofs-accent` : 'bg-ofs-card text-ofs-mute')}>
                {SEG_LABEL[s]} ({bySeg.get(s) || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ofs-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ofs-panel">
              <tr className="text-left text-xs uppercase tracking-wider text-ofs-mute">
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Segmento</th>
                <th className="px-4 py-3">Origen</th>
                <th className="px-4 py-3 text-right">Pedidos</th>
                <th className="px-4 py-3 text-right">Ticket medio</th>
                <th className="px-4 py-3 text-right">Total gastado</th>
                <th className="px-4 py-3">Último pedido</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 30).map((c) => (
                <tr key={c.id} className="border-t border-ofs-border hover:bg-ofs-panel/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-ofs-gradient text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {c.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-ofs-text">{c.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {c.tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[10px] text-ofs-mute"><Tag className="h-2.5 w-2.5 inline" /> {t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-ofs-mute">
                    <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {c.phone}</div>
                    {c.email && <div className="flex items-center gap-1 mt-0.5"><Mail className="h-3 w-3" /> {c.email}</div>}
                  </td>
                  <td className="px-4 py-3"><Badge variant={SEG_VAR[c.segment]}>{SEG_LABEL[c.segment]}</Badge></td>
                  <td className="px-4 py-3 text-xs text-ofs-mute capitalize">{c.origin}</td>
                  <td className="px-4 py-3 text-right text-ofs-text">{c.totalOrders}</td>
                  <td className="px-4 py-3 text-right text-ofs-text">{eur(c.ticketMedio)}</td>
                  <td className="px-4 py-3 text-right font-display font-bold text-ofs-text">{eur(c.totalSpent, 0)}</td>
                  <td className="px-4 py-3 text-xs text-ofs-mute">{relativeDate(c.lastOrder)}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-ofs-accent hover:text-ofs-accent2"><MessageCircle className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 30 && (
          <div className="px-4 py-3 text-xs text-ofs-mute text-center border-t border-ofs-border">
            Mostrando 30 de {filtered.length} · scroll para ver más en producción
          </div>
        )}
      </div>
    </div>
  )
}
