import type { BusinessId, Invoice, InvoiceStatus, Expense, ExpenseCategory } from '../types'
import { mulberry32, pick, rndBetween, daysAgo } from '../lib/utils'
import { SUPPLIERS } from './suppliers'

const CATS_BY_SUPPLIER: Record<string, ExpenseCategory> = {
  'Carne': 'comida',
  'Pescado': 'comida',
  'Pollo': 'comida',
  'Pan': 'comida',
  'Lácteos': 'comida',
  'Congelados': 'comida',
  'Verdura': 'comida',
  'Verdura/Fruta': 'comida',
  'Aceite': 'comida',
  'Multiproducto': 'comida',
  'Bebidas': 'bebida',
  'Vinos': 'bebida',
  'Suministros': 'luz',
  'Servicios': 'mantenimiento',
  'Delivery': 'otros',
}

function genInvoices(businessId: BusinessId, count: number, seed: number): Invoice[] {
  const rnd = mulberry32(seed)
  const sups = SUPPLIERS[businessId]
  const out: Invoice[] = []
  for (let i = 0; i < count; i++) {
    const sup = pick(sups, rnd)
    const base = rndBetween(rnd, 80, 1800, 2)
    const iva = Math.round(base * 0.1 * 100) / 100
    const total = Math.round((base + iva) * 100) / 100
    const days = rndBetween(rnd, 0, 90)
    let status: InvoiceStatus = 'pagada'
    if (days < 15) status = rnd() < 0.6 ? 'pendiente' : 'pagada'
    else if (days < 30 && rnd() < 0.15) status = 'vencida'
    out.push({
      id: `inv-${businessId}-${i + 1}`,
      number: `${sup.name.split(' ')[0].toUpperCase()}-2026-${(1000 + i).toString()}`,
      supplierName: sup.name,
      date: daysAgo(days),
      baseImponible: base,
      iva,
      total,
      category: CATS_BY_SUPPLIER[sup.category] || 'otros',
      status,
      ocrConfidence: rndBetween(rnd, 78, 97, 1),
    })
  }
  return out.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function genExpenses(businessId: BusinessId, seed: number): Expense[] {
  const rnd = mulberry32(seed)
  const cats: ExpenseCategory[] = ['comida', 'bebida', 'luz', 'agua', 'gas', 'alquiler', 'personal', 'marketing', 'seguros', 'mantenimiento', 'otros']
  const out: Expense[] = []
  for (let m = 0; m < 6; m++) {
    for (const cat of cats) {
      const baseAmount = (() => {
        switch (cat) {
          case 'comida': return rndBetween(rnd, 4200, 9800)
          case 'bebida': return rndBetween(rnd, 1200, 3400)
          case 'luz': return rndBetween(rnd, 480, 920)
          case 'agua': return rndBetween(rnd, 80, 180)
          case 'gas': return rndBetween(rnd, 120, 320)
          case 'alquiler': return rndBetween(rnd, 1800, 3800)
          case 'personal': return rndBetween(rnd, 8400, 18400)
          case 'marketing': return rndBetween(rnd, 600, 2400)
          case 'seguros': return rndBetween(rnd, 180, 380)
          case 'mantenimiento': return rndBetween(rnd, 120, 580)
          case 'otros': return rndBetween(rnd, 80, 480)
        }
      })()
      out.push({
        id: `exp-${businessId}-${m}-${cat}`,
        category: cat,
        amount: baseAmount,
        date: daysAgo(m * 30 + 15),
        description: `${cat.charAt(0).toUpperCase() + cat.slice(1)} mes M-${m}`,
      })
    }
  }
  return out
}

export const INVOICES: Record<BusinessId, Invoice[]> = {
  'smash-lab': genInvoices('smash-lab', 32, 701),
  'la-cabana': genInvoices('la-cabana', 38, 802),
  'velocity-kitchen': genInvoices('velocity-kitchen', 42, 903),
}

export const EXPENSES: Record<BusinessId, Expense[]> = {
  'smash-lab': genExpenses('smash-lab', 1001),
  'la-cabana': genExpenses('la-cabana', 1102),
  'velocity-kitchen': genExpenses('velocity-kitchen', 1203),
}
