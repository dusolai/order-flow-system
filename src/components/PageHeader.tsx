import { ReactNode } from 'react'

interface Props {
  title: string
  subtitle?: string
  icon?: ReactNode
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, icon, actions }: Props) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div className="flex items-start gap-3">
        {icon && <div className="h-10 w-10 rounded-lg bg-ofs-gradient/15 flex items-center justify-center text-ofs-accent">{icon}</div>}
        <div>
          <h1 className="text-2xl font-display font-bold text-ofs-text">{title}</h1>
          {subtitle && <p className="text-sm text-ofs-mute mt-1">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
