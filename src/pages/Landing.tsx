import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, MessageCircle, Users, Package, CreditCard, Receipt, Megaphone, Workflow, FileCheck2, LayoutDashboard, ListTodo, Bot } from 'lucide-react'
import { Logo } from '../components/Logo'

const MODULES = [
  { icon: MessageCircle, title: 'Camarero Digital 24/7', text: 'WhatsApp / Telegram. Atiende, recomienda, toma pedidos sin errores.' },
  { icon: Bot, title: 'IA que vende', text: 'Upselling, cross-selling, recuperación de carrito y reactivación automática.' },
  { icon: Users, title: 'CRM personalizado', text: 'Cada cliente con historial, ticket medio, segmento y campañas dirigidas.' },
  { icon: ListTodo, title: 'Equipo y tareas', text: 'Roles, organigrama, tareas trazadas. Adiós al WhatsApp interno.' },
  { icon: Package, title: 'Stock y escandallos', text: 'Inventario en tiempo real. Margen real por plato. Alertas de reposición.' },
  { icon: CreditCard, title: 'TPV y caja', text: 'Comandas, cierre por turno, ventas por camarero, integrado con stock.' },
  { icon: LayoutDashboard, title: 'Dashboard en tiempo real', text: 'Ventas, márgenes, canales, KPIs. El dueño ve todo desde el móvil.' },
  { icon: Receipt, title: 'Facturas con OCR', text: 'Sube la factura, el sistema extrae proveedor, base, IVA y categoriza.' },
  { icon: Megaphone, title: 'Campañas Meta Ads', text: 'Campañas conectadas a WhatsApp. Atribución a pedidos. ROAS real.' },
  { icon: Workflow, title: 'Automatización end-to-end', text: 'Pedido → confirmación → stock → caja → CRM → KPI. Sin intervención.' },
  { icon: FileCheck2, title: 'Preparado fiscalmente', text: 'Estructura lista para VERI*FACTU y facturación electrónica.' },
]

export function Landing() {
  return (
    <div className="min-h-screen bg-ofs-bg">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <Link to="/tour" className="text-sm text-ofs-mute hover:text-ofs-text">Tour comercial</Link>
          <Link to="/dashboard" className="ofs-btn-primary text-sm">
            Entrar a la demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ofs-card border border-ofs-border text-xs text-ofs-mute mb-6">
          <Sparkles className="h-3.5 w-3.5 text-ofs-accent" />
          Demo nacional · Sistema 360 hostelería · 3 verticales sembradas
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-ofs-text leading-tight max-w-4xl">
          No vendemos un bot.<br />
          Instalamos el <span className="bg-ofs-gradient bg-clip-text text-transparent">sistema operativo</span> de tu hostelería.
        </h1>
        <p className="text-lg text-ofs-mute mt-6 max-w-2xl leading-relaxed">
          Order Flow System™ conecta pedidos, IA, CRM, equipo, stock, caja, facturas, campañas y KPIs en una sola plataforma. Más pedidos, menos caos, control real.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <Link to="/dashboard" className="ofs-btn-primary">
            Abrir demo Sistema 360
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/tour" className="ofs-btn-secondary">
            Tour guiado para closer
          </Link>
          <Link to="/camarero" className="ofs-btn-secondary">
            Ver bot IA en acción
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl">
          <div>
            <div className="text-3xl font-display font-bold text-ofs-text">11</div>
            <div className="text-sm text-ofs-mute mt-1">Módulos integrados</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-ofs-text">3</div>
            <div className="text-sm text-ofs-mute mt-1">Verticales sembrados</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-ofs-text">14-30d</div>
            <div className="text-sm text-ofs-mute mt-1">Implementación</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-display font-bold text-ofs-text mb-2">Los 11 módulos del sistema 360</h2>
        <p className="text-sm text-ofs-mute mb-8">Todos accesibles desde la demo. Cada uno con datos sembrados para hamburguesería, restaurante y dark kitchen.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m) => (
            <div key={m.title} className="ofs-card p-5 hover:border-ofs-accent/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-ofs-gradient/15 text-ofs-accent flex items-center justify-center mb-3">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-ofs-text">{m.title}</h3>
              <p className="text-sm text-ofs-mute mt-1">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="ofs-card p-8 bg-ofs-gradient/5 border-ofs-accent/20">
          <h2 className="text-2xl font-display font-bold text-ofs-text">3 verticales sembrados</h2>
          <p className="text-sm text-ofs-mute mt-1 mb-6">El closer puede cambiar de negocio en vivo desde la barra superior.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="ofs-card p-5">
              <div className="h-1 w-12 bg-[#ff6a00] rounded mb-3" />
              <h3 className="font-semibold text-ofs-text">Smash Lab</h3>
              <p className="text-xs text-ofs-mute uppercase tracking-wider mt-1">Hamburguesería · Madrid</p>
              <p className="text-sm text-ofs-mute mt-3">Smash burgers + delivery + sala. Ticket 18,50€ · 142 pedidos/día.</p>
            </div>
            <div className="ofs-card p-5">
              <div className="h-1 w-12 bg-[#c89760] rounded mb-3" />
              <h3 className="font-semibold text-ofs-text">Restaurante La Cabaña</h3>
              <p className="text-xs text-ofs-mute uppercase tracking-wider mt-1">Restaurante · Bilbao</p>
              <p className="text-sm text-ofs-mute mt-3">Cocina de mercado + menú degustación 78€. Ticket 42€ · 58 pedidos/día.</p>
            </div>
            <div className="ofs-card p-5">
              <div className="h-1 w-12 bg-[#ff2d87] rounded mb-3" />
              <h3 className="font-semibold text-ofs-text">Velocity Dark Kitchen</h3>
              <p className="text-xs text-ofs-mute uppercase tracking-wider mt-1">Dark Kitchen · Valencia</p>
              <p className="text-sm text-ofs-mute mt-3">3 marcas virtuales (pizza · poke · pollo) · solo delivery. 215 pedidos/día.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ofs-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-ofs-mute">
          <div>Order Flow System™ · Demo</div>
          <div>Datos sembrados · Sin backend real · Para reuniones comerciales</div>
        </div>
      </footer>
    </div>
  )
}
