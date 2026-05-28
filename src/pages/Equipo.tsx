import { ListTodo, Users, CheckCircle2, Clock, AlertOctagon, Pause } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { KPI } from '../components/KPI'
import { useBusiness } from '../context/BusinessContext'
import { TEAMS, TASKS } from '../data/team'
import { relativeDate, cn } from '../lib/utils'

const STATUS_COLUMNS = ['pendiente', 'en-proceso', 'bloqueada', 'completada'] as const
const STATUS_LABEL: Record<string, string> = {
  pendiente: 'Pendientes', 'en-proceso': 'En proceso', bloqueada: 'Bloqueadas', completada: 'Completadas',
}
const STATUS_ICON: Record<string, typeof Clock> = {
  pendiente: Clock, 'en-proceso': Clock, bloqueada: Pause, completada: CheckCircle2,
}

const ROLE_LABEL: Record<string, string> = {
  owner: 'Dueño', gerente: 'Gerente', cocina: 'Cocina', camarero: 'Sala', marketing: 'Marketing', administracion: 'Administración', soporte: 'Soporte',
}

export function Equipo() {
  const { businessId, business } = useBusiness()
  const team = TEAMS[businessId]
  const tasks = TASKS[businessId]

  const active = team.filter((u) => u.active).length
  const completed = tasks.filter((t) => t.status === 'completada').length
  const blocked = tasks.filter((t) => t.status === 'bloqueada').length

  return (
    <div>
      <PageHeader
        title="Equipo, tareas y roles"
        subtitle={`${business.name} · ${team.length} usuarios · 7 roles`}
        icon={<ListTodo className="h-5 w-5" />}
        actions={<button className="ofs-btn-primary text-sm">+ Nueva tarea</button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Equipo activo" value={`${active} / ${team.length}`} icon={<Users className="h-4 w-4" />} />
        <KPI label="Tareas pendientes" value={tasks.filter((t) => t.status === 'pendiente').length} />
        <KPI label="Completadas (semana)" value={completed} icon={<CheckCircle2 className="h-4 w-4" />} delta={{ value: '+24%', positive: true }} />
        <KPI label="Bloqueadas" value={blocked} icon={<AlertOctagon className="h-4 w-4" />} hint="requieren intervención" />
      </div>

      <div className="ofs-card p-5 mb-6">
        <div className="text-sm font-semibold text-ofs-text mb-3">Organigrama por roles</div>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {(['owner', 'gerente', 'cocina', 'camarero', 'marketing', 'administracion', 'soporte'] as const).map((role) => {
            const members = team.filter((u) => u.role === role)
            return (
              <div key={role} className="ofs-card p-3 bg-ofs-panel">
                <div className="text-[10px] uppercase tracking-wider text-ofs-mute font-semibold mb-2">{ROLE_LABEL[role]}</div>
                <div className="space-y-1.5">
                  {members.length === 0 && <div className="text-xs text-ofs-mute italic">Sin asignar</div>}
                  {members.map((u) => (
                    <div key={u.id} className="flex items-center gap-2">
                      <div className={cn('h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0', u.active ? 'bg-ofs-gradient text-white' : 'bg-ofs-card text-ofs-mute border border-ofs-border')}>
                        {u.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="text-xs text-ofs-text truncate">{u.name.split(' ')[0]}</div>
                      {!u.active && <span className="text-[9px] text-ofs-mute">·off</span>}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {STATUS_COLUMNS.map((status) => {
          const Icon = STATUS_ICON[status]
          const col = tasks.filter((t) => t.status === status)
          return (
            <div key={status} className="ofs-card flex flex-col min-h-[280px]">
              <div className="p-3 border-b border-ofs-border flex items-center justify-between bg-ofs-panel">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-ofs-mute" />
                  <span className="text-sm font-semibold text-ofs-text">{STATUS_LABEL[status]}</span>
                </div>
                <Badge variant="neutral">{col.length}</Badge>
              </div>
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {col.length === 0 && <div className="text-xs text-ofs-mute italic px-2 py-3 text-center">—</div>}
                {col.map((t) => (
                  <div key={t.id} className="ofs-card bg-ofs-panel p-3 border border-ofs-border">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-ofs-text leading-tight flex-1">{t.title}</div>
                      <Badge variant={t.priority === 'critica' ? 'bad' : t.priority === 'alta' ? 'warn' : 'neutral'} className="flex-shrink-0">
                        {t.priority}
                      </Badge>
                    </div>
                    <div className="text-[11px] text-ofs-mute mt-2 flex items-center gap-2">
                      <span>{t.assignee.split(' ')[0]}</span>
                      <span>·</span>
                      <span>{t.department}</span>
                    </div>
                    {t.notes && <div className="text-[11px] text-ofs-mute italic mt-1.5 pt-1.5 border-t border-ofs-border">{t.notes}</div>}
                    <div className="text-[10px] text-ofs-mute mt-1.5">vence {relativeDate(t.due)}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
