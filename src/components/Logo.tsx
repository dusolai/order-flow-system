import { cn } from '../lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative h-8 w-8 rounded-lg bg-ofs-gradient flex items-center justify-center shadow-lg shadow-ofs-accent/20">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
          <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="19" cy="17" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-display font-bold text-ofs-text">Order Flow</div>
        <div className="text-[10px] uppercase tracking-widest text-ofs-mute">System™</div>
      </div>
    </div>
  )
}
