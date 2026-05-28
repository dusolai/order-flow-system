import { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface Props {
  label: string
  value: string | number
  delta?: { value: string; positive?: boolean }
  icon?: ReactNode
  hint?: string
  className?: string
}

export function KPI({ label, value, delta, icon, hint, className }: Props) {
  return (
    <div className={cn('ofs-card p-4', className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="kpi-label">{label}</div>
        {icon && <div className="text-ofs-mute">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="kpi-value">{value}</div>
        {delta && (
          <span className={cn('text-xs font-semibold', delta.positive ? 'text-ofs-good' : 'text-ofs-bad')}>
            {delta.positive ? '↑' : '↓'} {delta.value}
          </span>
        )}
      </div>
      {hint && <div className="text-[11px] text-ofs-mute mt-1">{hint}</div>}
    </div>
  )
}
