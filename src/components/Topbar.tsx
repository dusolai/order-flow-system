import { Bell, Search, User } from 'lucide-react'
import { BusinessSwitcher } from './BusinessSwitcher'
import { useBusiness } from '../context/BusinessContext'
import { KPIS } from '../data/kpis'
import { eur } from '../lib/utils'

export function Topbar() {
  const { businessId, business } = useBusiness()
  const kpi = KPIS[businessId]

  return (
    <header className="h-16 bg-ofs-panel border-b border-ofs-border flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-ofs-mute absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="ofs-input w-full pl-9 py-1.5 text-sm"
            placeholder={`Buscar en ${business.name}...`}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm">
        <div className="text-right">
          <div className="kpi-label">Ventas hoy</div>
          <div className="font-display font-bold text-ofs-text">{eur(kpi.ventasHoy)}</div>
        </div>
        <div className="text-right">
          <div className="kpi-label">Pedidos hoy</div>
          <div className="font-display font-bold text-ofs-text">{kpi.pedidosHoy}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <BusinessSwitcher />
        <button className="relative p-2 rounded-lg hover:bg-ofs-card transition-colors">
          <Bell className="h-4 w-4 text-ofs-mute" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-ofs-accent2" />
        </button>
        <div className="h-9 w-9 rounded-full bg-ofs-gradient flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  )
}
