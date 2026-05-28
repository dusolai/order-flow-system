import { FileCheck2, AlertTriangle, ShieldCheck, Database, FileSpreadsheet, Lock } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Badge } from '../components/Badge'

const FEATURES = [
  { icon: Database, title: 'Estructura preparada VERI*FACTU', text: 'Modelo de datos compatible con Real Decreto 1007/2023 — hash encadenado, registros inmutables, sello temporal por venta.' },
  { icon: ShieldCheck, title: 'Cumplimiento Ley antifraude', text: 'Software de facturación no manipulable. Trazabilidad completa de cada operación. Sin posibilidad de eliminar registros.' },
  { icon: FileSpreadsheet, title: 'Exportación normalizada', text: 'Exporta a CSV/SII/FacturaE para gestoría. Compatible con Aplicación de la AEAT.' },
  { icon: Lock, title: 'Protección de datos LOPD/RGPD', text: 'Cifrado en reposo y en tránsito. Roles y permisos por usuario. Auditoría completa.' },
]

const STATUS = [
  { item: 'Modelo de datos compatible VERI*FACTU', state: 'preparado' },
  { item: 'Hash encadenado entre tickets', state: 'preparado' },
  { item: 'Sello temporal por venta', state: 'preparado' },
  { item: 'Envío a AEAT vía servicio web', state: 'pendiente-validacion' },
  { item: 'Generación de QR en ticket', state: 'preparado' },
  { item: 'Exportación SII / FacturaE', state: 'preparado' },
  { item: 'Certificado digital configurado por cliente', state: 'pendiente-configuracion' },
  { item: 'Auditoría legal externa', state: 'pendiente' },
]

const VAR = { 'preparado': 'good', 'pendiente-validacion': 'warn', 'pendiente-configuracion': 'warn', 'pendiente': 'neutral' } as const

export function Fiscal() {
  return (
    <div>
      <PageHeader
        title="Fiscalidad / VERI*FACTU"
        subtitle="Preparación para evolución fiscal del sistema (no certificado todavía)"
        icon={<FileCheck2 className="h-5 w-5" />}
        actions={<Badge variant="warn">Preview · Pendiente validación legal</Badge>}
      />

      <div className="ofs-card p-5 mb-6 bg-ofs-warn/5 border-ofs-warn/30">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-ofs-warn flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-ofs-text mb-1">Importante (transparencia comercial)</div>
            <p className="text-sm text-ofs-mute leading-relaxed">
              Order Flow System™ tiene la <strong>estructura técnica preparada</strong> para cumplir con VERI*FACTU y la Ley antifraude, pero <strong>el cumplimiento legal completo requiere validación por gestoría/auditoría legal</strong> antes de garantizarlo. Cada cliente debe contratar esta validación o aportar gestoría propia.
              <br /><br />
              Lo que sí garantizamos hoy: trazabilidad, registros inmutables, exportación normalizada y arquitectura compatible.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {FEATURES.map((f) => (
          <div key={f.title} className="ofs-card p-5">
            <div className="h-10 w-10 rounded-lg bg-ofs-gradient/15 text-ofs-accent flex items-center justify-center mb-3">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-ofs-text">{f.title}</h3>
            <p className="text-sm text-ofs-mute mt-1">{f.text}</p>
          </div>
        ))}
      </div>

      <div className="ofs-card p-5">
        <div className="text-sm font-semibold text-ofs-text mb-4">Estado de cumplimiento por cliente</div>
        <div className="space-y-1.5">
          {STATUS.map((s) => (
            <div key={s.item} className="flex items-center justify-between py-2 border-b border-ofs-border last:border-0">
              <span className="text-sm text-ofs-text">{s.item}</span>
              <Badge variant={VAR[s.state as keyof typeof VAR]}>{s.state.replace(/-/g, ' ')}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="ofs-card p-5 mt-6">
        <div className="text-sm font-semibold text-ofs-text mb-3">Hoja de ruta fiscal</div>
        <div className="space-y-3 text-sm">
          <div>
            <div className="text-ofs-text font-medium">Fase V1 (actual)</div>
            <div className="text-ofs-mute">Estructura técnica preparada. Hash encadenado. Sello temporal. Trazabilidad completa.</div>
          </div>
          <div>
            <div className="text-ofs-text font-medium">Fase V2 (próximo trimestre)</div>
            <div className="text-ofs-mute">Integración con servicio AEAT. Auditoría legal externa contratada. Validación por gestoría asociada.</div>
          </div>
          <div>
            <div className="text-ofs-text font-medium">Fase V3</div>
            <div className="text-ofs-mute">Certificación oficial Software de Facturación cumplidor. Configuración asistida por cliente.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
