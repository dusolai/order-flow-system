import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, MessageCircle, Users, ListTodo, Package,
  CreditCard, Receipt, Megaphone, Workflow, FileCheck2, Sparkles, Map, LifeBuoy,
} from 'lucide-react'
import { Logo } from './Logo'
import { cn } from '../lib/utils'

interface NavItem {
  to: string
  label: string
  icon: typeof LayoutDashboard
  badge?: string
  section?: 'main' | 'ops' | 'growth' | 'meta'
}

const NAV: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'main' },
  { to: '/camarero', label: 'Camarero Digital', icon: MessageCircle, badge: 'IA', section: 'main' },
  { to: '/crm', label: 'CRM', icon: Users, section: 'main' },
  { to: '/equipo', label: 'Equipo y Tareas', icon: ListTodo, section: 'ops' },
  { to: '/stock', label: 'Stock y Escandallos', icon: Package, section: 'ops' },
  { to: '/tpv', label: 'TPV / Ventas', icon: CreditCard, section: 'ops' },
  { to: '/facturas', label: 'Facturas y Gastos', icon: Receipt, section: 'ops' },
  { to: '/campanas', label: 'Campañas Meta Ads', icon: Megaphone, section: 'growth' },
  { to: '/automatizacion', label: 'Automatización', icon: Workflow, section: 'growth' },
  { to: '/fiscal', label: 'Fiscalidad / VERI*FACTU', icon: FileCheck2, section: 'meta' },
  { to: '/tour', label: 'Tour comercial', icon: Map, section: 'meta' },
]

const SECTION_LABELS: Record<string, string> = {
  main: 'Principal',
  ops: 'Operaciones',
  growth: 'Crecimiento',
  meta: 'Sistema',
}

export function Sidebar() {
  const grouped = NAV.reduce<Record<string, NavItem[]>>((acc, item) => {
    const s = item.section || 'main'
    acc[s] = acc[s] || []
    acc[s].push(item)
    return acc
  }, {})

  return (
    <aside className="w-64 bg-ofs-panel border-r border-ofs-border flex flex-col h-full">
      <div className="p-4 border-b border-ofs-border">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {['main', 'ops', 'growth', 'meta'].map((sec) => (
          <div key={sec}>
            <div className="text-[10px] uppercase tracking-widest text-ofs-mute font-semibold px-3 py-1.5">
              {SECTION_LABELS[sec]}
            </div>
            {grouped[sec]?.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                    isActive
                      ? 'bg-ofs-accent/10 text-ofs-accent font-medium border border-ofs-accent/20'
                      : 'text-ofs-text hover:bg-ofs-card hover:text-ofs-text',
                  )
                }
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-ofs-gradient text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-ofs-border space-y-2">
        <div className="ofs-card p-3 bg-ofs-gradient/10 border-ofs-accent/30">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-ofs-accent" />
            <span className="text-xs font-semibold text-ofs-text">Modo demo</span>
          </div>
          <p className="text-[11px] text-ofs-mute leading-tight">Datos sembrados. Cambia de negocio en la barra superior.</p>
        </div>
        <a
          href="https://github.com/dusolai/order-flow-system"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-xs text-ofs-mute hover:text-ofs-text"
        >
          <LifeBuoy className="h-3.5 w-3.5" />
          Repositorio
        </a>
      </div>
    </aside>
  )
}
