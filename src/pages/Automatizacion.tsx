import { Workflow, MessageCircle, ShoppingBag, Package, CreditCard, ListTodo, Users, BarChart3, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'

const FLOW = [
  { icon: MessageCircle, title: 'Cliente escribe por WhatsApp', desc: 'Hola, me pones una Emmylisa con patatas', tint: '#ff6a00' },
  { icon: Sparkles, title: 'IA detecta intención + recomienda', desc: 'Identifica "pedir", sugiere menú completo (upsell)', tint: '#ff2d87' },
  { icon: ShoppingBag, title: 'Pedido construido y confirmado', desc: 'IA valida punto carne, dirección, pago. Cliente confirma.', tint: '#facc15' },
  { icon: Users, title: 'Cliente guardado en CRM', desc: 'Si no existe → ficha nueva. Si existe → historial actualizado, segmento recalculado.', tint: '#22c55e' },
  { icon: Package, title: 'Stock descontado', desc: 'Pan brioche -1, smash 90g -2, cheddar -2, patatas -1...', tint: '#3b82f6' },
  { icon: CreditCard, title: 'Venta + caja actualizada', desc: '16,90€ a tarjeta. Cierre de caja del turno acumula.', tint: '#8b5cf6' },
  { icon: ListTodo, title: 'Aviso a cocina + reparto', desc: 'Mensaje al grupo Telegram cocina. Rider notificado si delivery.', tint: '#ef4444' },
  { icon: BarChart3, title: 'KPIs en tiempo real', desc: 'Ventas, ticket medio, pedidos por canal, margen estimado.', tint: '#06b6d4' },
]

const SLA = [
  { step: 'Recepción del mensaje', ms: '< 50ms' },
  { step: 'Respuesta IA', ms: '180-300ms' },
  { step: 'Confirmación pedido + persistencia', ms: '< 1s' },
  { step: 'Notificación cocina', ms: 'inmediata' },
  { step: 'Actualización dashboard', ms: 'real-time (websocket)' },
]

export function Automatizacion() {
  return (
    <div>
      <PageHeader
        title="Automatización end-to-end"
        subtitle="Un pedido por WhatsApp dispara 8 acciones automáticas. Sin intervención humana."
        icon={<Workflow className="h-5 w-5" />}
        actions={<Badge variant="info"><Sparkles className="h-3 w-3" /> Flujo Sistema 360</Badge>}
      />

      <div className="ofs-card p-6 mb-6 bg-ofs-gradient/5 border-ofs-accent/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-display font-bold text-ofs-text">8 pasos</div>
            <div className="text-xs text-ofs-mute mt-1">automatizados por pedido</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-ofs-text">&lt; 1s</div>
            <div className="text-xs text-ofs-mute mt-1">de WhatsApp a registro en BBDD</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-ofs-text">0</div>
            <div className="text-xs text-ofs-mute mt-1">intervención humana en pedido estándar</div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        {FLOW.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-lg" style={{ background: s.tint }}>
                <s.icon className="h-5 w-5" />
              </div>
              {i < FLOW.length - 1 && <div className="w-px flex-1 bg-ofs-border mt-1" style={{ minHeight: 30 }} />}
            </div>
            <div className="ofs-card p-4 flex-1 mt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-widest text-ofs-mute font-semibold">Paso {i + 1}</span>
                <ArrowRight className="h-3 w-3 text-ofs-mute" />
                <span className="text-sm font-semibold text-ofs-text">{s.title}</span>
              </div>
              <div className="text-xs text-ofs-mute pl-1">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="ofs-card p-5">
          <div className="text-sm font-semibold text-ofs-text mb-3">SLAs del sistema</div>
          <div className="space-y-2">
            {SLA.map((s) => (
              <div key={s.step} className="flex items-center justify-between py-2 border-b border-ofs-border last:border-0">
                <span className="text-sm text-ofs-mute">{s.step}</span>
                <Badge variant="good"><CheckCircle2 className="h-3 w-3" /> {s.ms}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="ofs-card p-5">
          <div className="text-sm font-semibold text-ofs-text mb-3">Escalado a humano (excepciones)</div>
          <div className="text-xs text-ofs-mute mb-3">El bot NO intenta resolver — pasa el control a un humano cuando detecta:</div>
          <ul className="space-y-2 text-sm">
            {[
              'Queja grave o tono enfadado',
              'Alérgenos sensibles con duda',
              'Fallo de pago repetido',
              'Solicitud fuera de catálogo o de horario',
              'Conversación abandonada >24h con interés alto',
              'Cliente VIP que requiere atención personalizada',
            ].map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-ofs-text">
                <span className="text-ofs-warn mt-0.5">▸</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ofs-card p-5 mt-6">
        <div className="text-sm font-semibold text-ofs-text mb-3">Disparadores automáticos adicionales</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            ['Stock crítico', 'Se crea tarea automática para gerente con proveedor sugerido'],
            ['Cliente dormido 60d', 'Se envía WhatsApp con descuento personalizado'],
            ['Factura vencida', 'Notificación a administración + bloqueo de nuevos pedidos al proveedor'],
            ['Pico en horas valle', 'Activa campaña Meta Ads "2x1" automática'],
            ['Producto bajo margen', 'Alerta a dirección con recomendación de subida de precio'],
            ['Pedido recibido > 60€', 'Solicita reseña automática 24h después'],
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
