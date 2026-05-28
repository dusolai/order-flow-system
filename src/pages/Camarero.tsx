import { useState } from 'react'
import { MessageCircle, Bot, User as UserIcon, UserCog, Phone, CheckCircle2, ShoppingBag, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { KPI } from '../components/KPI'
import { useBusiness } from '../context/BusinessContext'
import { CONVERSATIONS } from '../data/conversations'
import { eur } from '../lib/utils'
import { cn } from '../lib/utils'

const OUTCOME_LABEL: Record<string, string> = {
  pedido: 'Pedido cerrado',
  consulta: 'Consulta resuelta',
  abandonado: 'Abandonado',
  recuperado: 'Recuperado',
  humano: 'Derivado a humano',
}
const OUTCOME_VARIANT: Record<string, 'good' | 'warn' | 'bad' | 'info' | 'neutral'> = {
  pedido: 'good',
  consulta: 'info',
  abandonado: 'bad',
  recuperado: 'good',
  humano: 'warn',
}

export function Camarero() {
  const { businessId, business } = useBusiness()
  const conversations = CONVERSATIONS[businessId]
  const [activeId, setActiveId] = useState(conversations[0]?.id)
  const active = conversations.find((c) => c.id === activeId) || conversations[0]

  const stats = {
    total: conversations.length,
    cerrados: conversations.filter((c) => c.outcome === 'pedido' || c.outcome === 'recuperado').length,
    upselled: conversations.filter((c) => (c.ticketSubidoEUR || 0) > 0).length,
    avgUpsell: conversations.reduce((s, c) => s + (c.ticketSubidoEUR || 0), 0) / conversations.length,
    humanos: conversations.filter((c) => c.outcome === 'humano').length,
  }

  return (
    <div>
      <PageHeader
        title="Camarero Digital + IA conversacional"
        subtitle={`${business.name} · WhatsApp + Telegram · GPT/Gemini con reglas de negocio`}
        icon={<MessageCircle className="h-5 w-5" />}
        actions={
          <Badge variant="good">
            <span className="h-1.5 w-1.5 rounded-full bg-ofs-good animate-pulse mr-1" />
            Bot online · 0,2s respuesta media
          </Badge>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <KPI label="Conversaciones (semana)" value={stats.total * 18} icon={<MessageCircle className="h-4 w-4" />} />
        <KPI label="Pedidos cerrados" value={stats.cerrados * 18} hint="por la IA, sin humano" />
        <KPI label="Ticket subido (upsell)" value={eur(stats.avgUpsell)} delta={{ value: '+19%', positive: true }} icon={<TrendingUp className="h-4 w-4" />} />
        <KPI label="Conversión WA → pedido" value="68,4%" hint="vs 23% mercado" icon={<CheckCircle2 className="h-4 w-4" />} />
        <KPI label="Derivados a humano" value={`${(stats.humanos / stats.total * 100).toFixed(0)}%`} hint="quejas + alérgenos críticos" icon={<UserCog className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[680px]">
        <div className="ofs-card overflow-hidden flex flex-col">
          <div className="p-3 border-b border-ofs-border bg-ofs-panel">
            <div className="text-sm font-semibold text-ofs-text">Conversaciones en vivo</div>
            <div className="text-xs text-ofs-mute mt-0.5">{conversations.length} mostradas · sembradas</div>
          </div>
          <div className="overflow-y-auto flex-1">
            {conversations.map((c) => {
              const last = c.messages[c.messages.length - 1]
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    'w-full text-left p-3 border-b border-ofs-border hover:bg-ofs-panel transition-colors',
                    activeId === c.id && 'bg-ofs-panel border-l-2 border-l-ofs-accent',
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="text-sm font-medium text-ofs-text truncate flex-1">{c.clientName}</div>
                    <Badge variant={OUTCOME_VARIANT[c.outcome]} className="text-[10px]">{OUTCOME_LABEL[c.outcome]}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ofs-mute">
                    <Phone className="h-3 w-3" />
                    {c.clientPhone}
                    <span className="ml-auto uppercase text-[9px] tracking-wider px-1.5 py-0.5 rounded bg-ofs-card">{c.channel}</span>
                  </div>
                  <div className="text-xs text-ofs-mute mt-1 line-clamp-2">{last?.content}</div>
                  {c.ticketSubidoEUR ? (
                    <div className="text-[10px] text-ofs-good mt-1">+{eur(c.ticketSubidoEUR)} ticket subido por la IA</div>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        <div className="ofs-card lg:col-span-2 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-ofs-border bg-ofs-panel flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-ofs-text">{active.clientName}</div>
              <div className="text-xs text-ofs-mute">{active.clientPhone} · {active.channel}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={OUTCOME_VARIANT[active.outcome]}>{OUTCOME_LABEL[active.outcome]}</Badge>
              {active.orderId && <Badge variant="info"><ShoppingBag className="h-3 w-3" /> {active.orderId.split('-').pop()}</Badge>}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-ofs-bg">
            {active.messages.map((m, i) => (
              <div key={i} className={cn('flex gap-2', m.role === 'cliente' ? 'justify-end' : 'justify-start')}>
                {m.role !== 'cliente' && (
                  <div className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1',
                    m.role === 'bot' ? 'bg-ofs-gradient' : 'bg-ofs-warn/30',
                  )}>
                    {m.role === 'bot' ? <Bot className="h-4 w-4 text-white" /> : <UserCog className="h-4 w-4 text-ofs-warn" />}
                  </div>
                )}
                <div className={cn('max-w-[78%] space-y-1')}>
                  <div className={cn(
                    'rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed',
                    m.role === 'cliente'
                      ? 'bg-ofs-accent text-white rounded-br-sm'
                      : m.role === 'humano'
                      ? 'bg-ofs-warn/15 border border-ofs-warn/30 text-ofs-text rounded-bl-sm'
                      : 'bg-ofs-card border border-ofs-border text-ofs-text rounded-bl-sm',
                  )}>
                    {m.content}
                  </div>
                  <div className={cn('flex gap-2 px-1', m.role === 'cliente' ? 'justify-end' : 'justify-start')}>
                    {m.timestamp && <span className="text-[10px] text-ofs-mute">{m.timestamp}</span>}
                    {m.intent && <span className="text-[10px] text-ofs-accent">intent: {m.intent}</span>}
                    {m.meta && <span className="text-[10px] text-ofs-mute italic">{m.meta}</span>}
                  </div>
                </div>
                {m.role === 'cliente' && (
                  <div className="h-8 w-8 rounded-full bg-ofs-card border border-ofs-border flex items-center justify-center flex-shrink-0 mt-1">
                    <UserIcon className="h-4 w-4 text-ofs-mute" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-ofs-border bg-ofs-panel">
            <div className="flex items-center gap-2">
              <input className="ofs-input flex-1" placeholder="Demo: escribir aquí no envía nada · la conversación es sembrada" disabled />
              <button className="ofs-btn-secondary text-xs" disabled><RefreshCw className="h-3.5 w-3.5" /> Simular</button>
            </div>
            <div className="text-[10px] text-ofs-mute mt-1.5 flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3" />
              En producción: WhatsApp Cloud API + Gemini 2.0 Flash con system prompt configurable por negocio.
            </div>
          </div>
        </div>
      </div>

      <div className="ofs-card p-5 mt-6">
        <div className="text-sm font-semibold text-ofs-text mb-3">Reglas inviolables del bot (system prompt activo)</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            ['Punto de carne obligatorio', 'Nunca confirma una burger sin preguntar poco / al punto / hecha.'],
            ['Upselling automático', 'Ofrece bebida o patatas si no las pidió. Sugiere menú si ahorra.'],
            ['Alérgenos sensibles', 'Sin gluten → marca ⚠️ en cocina. Si hay duda alta, deriva a humano.'],
            ['Solo carne / solo queso', 'Aplica lógica de modificación exacta según la regla de negocio del local.'],
            ['Queja grave', 'Detecta tono y deriva a humano sin intentar solucionar solo.'],
            ['Datos mínimos', 'Nunca confirma pedido sin dirección, pago y resumen explícito.'],
          ].map(([t, d]) => (
            <div key={t} className="p-3 rounded-lg bg-ofs-panel border border-ofs-border">
              <div className="font-medium text-ofs-text mb-1">{t}</div>
              <div className="text-ofs-mute">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
