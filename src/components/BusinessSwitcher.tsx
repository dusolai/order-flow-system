import { useState } from 'react'
import { ChevronDown, Check, Store } from 'lucide-react'
import { useBusiness } from '../context/BusinessContext'
import { cn } from '../lib/utils'

const VERTICAL_LABEL: Record<string, string> = {
  'hamburgueseria': 'Hamburguesería',
  'restaurante': 'Restaurante',
  'dark-kitchen': 'Dark Kitchen',
}

export function BusinessSwitcher() {
  const { business, setBusinessId, all } = useBusiness()
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-3 bg-ofs-panel hover:bg-ofs-card border border-ofs-border rounded-lg px-3 py-2 transition-colors"
      >
        <div
          className="h-7 w-7 rounded-md flex items-center justify-center text-white text-xs font-bold"
          style={{ background: business.brandColor }}
        >
          <Store className="h-3.5 w-3.5" />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-ofs-text leading-tight">{business.name}</div>
          <div className="text-[10px] uppercase tracking-wider text-ofs-mute">{VERTICAL_LABEL[business.vertical]} · {business.city}</div>
        </div>
        <ChevronDown className={cn('h-4 w-4 text-ofs-mute transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-2 right-0 min-w-[300px] bg-ofs-card border border-ofs-border rounded-lg shadow-xl overflow-hidden">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-ofs-mute border-b border-ofs-border bg-ofs-panel">
            Cambiar negocio demo
          </div>
          {all.map((b) => (
            <button
              key={b.id}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setBusinessId(b.id)
                setOpen(false)
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-ofs-panel transition-colors border-b border-ofs-border last:border-0"
            >
              <div
                className="h-9 w-9 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: b.brandColor }}
              >
                <Store className="h-4 w-4" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="text-sm font-medium text-ofs-text leading-tight">{b.name}</div>
                <div className="text-xs text-ofs-mute truncate">{VERTICAL_LABEL[b.vertical]} · {b.city} · {b.pedidosDia} pedidos/día</div>
              </div>
              {b.id === business.id && <Check className="h-4 w-4 text-ofs-accent flex-shrink-0" />}
            </button>
          ))}
          <div className="px-3 py-2 text-[10px] text-ofs-mute bg-ofs-panel border-t border-ofs-border">
            En producción real: cada negocio = tenant aislado vía RLS en Supabase.
          </div>
        </div>
      )}
    </div>
  )
}
