import { Link } from 'react-router-dom'
import { Map, ChevronRight, MessageCircle, Users, ListTodo, Package, CreditCard, LayoutDashboard, Receipt, Megaphone, Workflow, FileCheck2, Sparkles, Quote, ArrowRight } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'
import { useBusiness } from '../context/BusinessContext'

const STEPS = [
  { num: 1, to: '/dashboard', icon: LayoutDashboard, title: 'Arranca con el dashboard', script: 'Aquí el dueño ve TODO en tiempo real: ventas, márgenes, KPIs, cajas, stock crítico, ROAS. Antes vivía en 40 WhatsApps; ahora lo tiene en una pantalla.', highlights: ['Ventas hoy', 'Top productos', 'Caja en vivo', 'Tareas críticas'] },
  { num: 2, to: '/camarero', icon: MessageCircle, title: 'Muestra el bot en acción', script: 'Esto es el camarero digital: atiende WhatsApp 24/7, recomienda, hace upsell automático (mira los +7€ de ticket subido), gestiona modificaciones (sin gluten, sin cebolla) y deriva a humano cuando toca.', highlights: ['Conversaciones reales', 'Upsell IA', 'Alérgenos', 'Derivación humano'] },
  { num: 3, to: '/crm', icon: Users, title: 'El CRM que se construye solo', script: 'Cada cliente que escribe se guarda con su historial, ticket medio y segmento (nuevo / recurrente / VIP / dormido). Mira los dormidos: el bot los reactivó con WhatsApp + descuento → mira al CRM ahora.', highlights: ['Segmentación', 'Historial pedidos', 'VIPs', 'Dormidos reactivados'] },
  { num: 4, to: '/equipo', icon: ListTodo, title: 'Equipo, tareas y organigrama', script: '7 roles definidos (dueño, gerente, cocina, sala, marketing, admin, soporte). Tareas trazadas con responsable, prioridad y vencimiento. Las críticas se ven en rojo en el dashboard. El gerente deja de perseguir al equipo por WhatsApp.', highlights: ['Kanban tareas', 'Organigrama', 'Prioridades'] },
  { num: 5, to: '/stock', icon: Package, title: 'Stock, escandallos y márgenes', script: 'Aquí está el secreto del margen real. Cada plato lleva su escandallo, su coste, su margen %. Si vendes mucha Pelotazos pero margen es bajo, lo ves al instante. Stock se descuenta automático con cada venta.', highlights: ['Escandallos completos', 'Margen por plato', 'Alertas reposición'] },
  { num: 6, to: '/tpv', icon: CreditCard, title: 'TPV integrado', script: 'El camarero abre la app en la tablet, toca el plato, cobra y se actualiza TODO: stock, caja, dashboard, ventas por usuario. Sin teclados raros, sin importes a mano.', highlights: ['Comanda táctil', 'Multipago', 'Cierre caja'] },
  { num: 7, to: '/facturas', icon: Receipt, title: 'Facturas con OCR automático', script: 'Llega la factura del proveedor: sacas foto, el OCR lee proveedor, base, IVA, total y categoría con 91% de precisión. En 5 segundos clasificada y guardada. Multiplica por 50 facturas/mes y entiendes el ahorro.', highlights: ['OCR auto', '91% precisión', 'Categorización'] },
  { num: 8, to: '/campanas', icon: Megaphone, title: 'Campañas Meta Ads + ROAS real', script: 'Esto es lo que ningún sistema ofrece junto: campañas conectadas a WhatsApp, leads atribuidos a pedidos reales, ROAS calculado por euro invertido. Cada euro de Meta Ads se rastrea hasta el ticket.', highlights: ['Atribución pedido', 'ROAS real', 'Segmentación local'] },
  { num: 9, to: '/automatizacion', icon: Workflow, title: 'El flujo completo end-to-end', script: 'Cierre del demo: enseña cómo un pedido por WhatsApp dispara 8 acciones automáticas en menos de 1 segundo. Esto es "sistema operativo", no una herramienta más.', highlights: ['8 pasos', '<1s end-to-end', '0 intervención humana'] },
  { num: 10, to: '/fiscal', icon: FileCheck2, title: 'Fiscalidad preparada', script: 'Solo si el cliente pregunta: preparados para VERI*FACTU, ley antifraude, exportación a gestoría. NO PROMETER cumplimiento certificado todavía — necesita validación legal por cliente.', highlights: ['VERI*FACTU ready', 'Trazable', 'Exportable'] },
]

export function Tour() {
  const { business } = useBusiness()
  return (
    <div>
      <PageHeader
        title="Tour comercial guiado"
        subtitle={`Guion para el closer · Demo activa: ${business.name}`}
        icon={<Map className="h-5 w-5" />}
        actions={
          <Badge variant="info">
            <Sparkles className="h-3 w-3" /> Cambia de vertical en la barra superior para adaptar el demo al cliente
          </Badge>
        }
      />

      <div className="ofs-card p-5 mb-6 bg-ofs-gradient/5 border-ofs-accent/30">
        <div className="flex items-start gap-3">
          <Quote className="h-6 w-6 text-ofs-accent flex-shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-ofs-text mb-2">Apertura recomendada</h3>
            <p className="text-sm text-ofs-mute leading-relaxed mb-3">
              "La idea de esta demo no es enseñarte una herramienta más. Es entender cómo funciona hoy tu negocio, dónde se pierden pedidos, tiempo o dinero, y ver si Order Flow System puede ayudarte a automatizar, controlar y escalar. Si vemos que no tiene sentido, te lo diremos claro. ¿Te parece?"
            </p>
            <div className="text-xs text-ofs-mute italic">→ Conecta con el dolor antes de enseñar nada. No abrir con módulos, abrir con preguntas.</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {STEPS.map((s) => (
          <Link
            to={s.to}
            key={s.num}
            className="ofs-card p-5 flex items-start gap-4 hover:border-ofs-accent/40 transition-colors group"
          >
            <div className="h-12 w-12 rounded-xl bg-ofs-gradient text-white font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
              {s.num}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="h-4 w-4 text-ofs-accent" />
                <h3 className="font-semibold text-ofs-text group-hover:text-ofs-accent">{s.title}</h3>
              </div>
              <p className="text-sm text-ofs-mute mb-2 italic">"{s.script}"</p>
              <div className="flex flex-wrap gap-1.5">
                {s.highlights.map((h) => (
                  <span key={h} className="text-[10px] uppercase tracking-wider text-ofs-mute px-2 py-0.5 rounded bg-ofs-panel border border-ofs-border">{h}</span>
                ))}
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-ofs-mute group-hover:text-ofs-accent flex-shrink-0 mt-2" />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="ofs-card p-5">
          <h3 className="text-sm font-semibold text-ofs-text mb-3">Cierre recomendado</h3>
          <p className="text-sm text-ofs-mute italic leading-relaxed">
            "Por lo que hemos visto, el problema no es solo conseguir más clientes. Es que ahora mismo hay pedidos, datos, equipo, caja y stock funcionando dispersos. Order Flow System tiene sentido porque primero ordena la operación y después la escala. Mi recomendación sería empezar con [alcance] y dejar una primera versión operativa en [14/21/30] días. ¿Avanzamos con la fase piloto?"
          </p>
        </div>
        <div className="ofs-card p-5">
          <h3 className="text-sm font-semibold text-ofs-text mb-3">Objeciones más frecuentes</h3>
          <div className="space-y-2 text-sm">
            <div>
              <div className="text-ofs-text font-medium">— Es caro</div>
              <div className="text-ofs-mute text-xs">Caro es seguir perdiendo pedidos, stock y clientes sin medirlo. Veamos cuánto está costando el problema al mes.</div>
            </div>
            <div>
              <div className="text-ofs-text font-medium">— Tengo que pensarlo</div>
              <div className="text-ofs-mute text-xs">Normal. ¿Qué parte: precio, implementación, confianza o prioridad?</div>
            </div>
            <div>
              <div className="text-ofs-text font-medium">— Ya tengo TPV</div>
              <div className="text-ofs-mute text-xs">Perfecto. La pregunta es si está conectado al CRM, al stock y a las campañas. Si no, tienes herramientas pero no sistema.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="ofs-card p-5 mt-6 text-center bg-ofs-gradient/5 border-ofs-accent/30">
        <Sparkles className="h-6 w-6 text-ofs-accent mx-auto mb-2" />
        <h3 className="text-lg font-display font-bold text-ofs-text mb-1">Estás listo para enseñar.</h3>
        <p className="text-sm text-ofs-mute mb-4">Compártele al cliente la URL pública y empieza por el dashboard.</p>
        <Link to="/dashboard" className="ofs-btn-primary inline-flex">
          Abrir Dashboard <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
