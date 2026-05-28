import { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface Props {
  variant?: 'good' | 'warn' | 'bad' | 'info' | 'neutral'
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'neutral', children, className }: Props) {
  const variants = {
    good: 'bg-ofs-good/15 text-ofs-good',
    warn: 'bg-ofs-warn/15 text-ofs-warn',
    bad: 'bg-ofs-bad/15 text-ofs-bad',
    info: 'bg-ofs-accent/15 text-ofs-accent',
    neutral: 'bg-ofs-card text-ofs-mute border border-ofs-border',
  }
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
