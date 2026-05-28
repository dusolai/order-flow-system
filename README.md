# Order Flow System™ — Demo

Sistema 360 para hostelería: CRM + POS + IA conversacional + Stock + Campañas + Dashboard unificado.

**Esta es la versión DEMO** — datos mockeados, sin backend real, pensada para enseñar el producto en reuniones comerciales.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6
- Recharts (gráficas)
- Lucide React (iconos)

## Run local

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Deploy

Auto-deploy a GitHub Pages en cada push a `main` vía GitHub Actions.

URL pública: https://dusolai.github.io/order-flow-system/

## Negocios demo sembrados

1. **Hamburguesería Smash Lab** (vertical: burger / delivery)
2. **Restaurante La Cabaña** (vertical: sala / reservas / menú degustación)
3. **Dark Kitchen Velocity** (vertical: solo delivery / multi-marca virtual)

## Estructura de módulos

11 módulos según especificación oferta nacional:

1. Camarero Digital 24/7
2. IA conversacional comercial
3. CRM personalizado
4. Gestión equipo / tareas / roles
5. Stock + escandallos + márgenes
6. TPV inteligente
7. Dashboard tiempo real
8. Facturas + gastos + proveedores
9. Campañas Meta Ads + ROAS
10. Automatización end-to-end
11. Fiscal / VERI*FACTU (preview)

## Sobre el producto final (no este demo)

Cuando arranquemos el producto real:
- Backend Supabase (multi-tenant con RLS por `business_id`)
- Bot Python con Gemini + WhatsApp Business API
- Meta Marketing API
- OCR real (Tesseract.js ya validado)

Ver `PLAN_ORDER_FLOW_SYSTEM.md` en el directorio padre.
