import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function eur(n: number, decimals = 2): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n)
}

export function num(n: number): string {
  return new Intl.NumberFormat('es-ES').format(n)
}

export function pct(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`
}

export function relativeDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMs / 3600000)
  const diffD = Math.floor(diffMs / 86400000)
  if (diffMin < 1) return 'ahora'
  if (diffMin < 60) return `hace ${diffMin} min`
  if (diffH < 24) return `hace ${diffH}h`
  if (diffD < 7) return `hace ${diffD}d`
  return d.toLocaleDateString('es-ES')
}

export function mulberry32(seed: number) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function pick<T>(arr: T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)]
}

export function rndBetween(rnd: () => number, min: number, max: number, decimals = 0): number {
  const v = rnd() * (max - min) + min
  if (decimals === 0) return Math.round(v)
  const p = 10 ** decimals
  return Math.round(v * p) / p
}

export function daysAgo(d: number): string {
  const dt = new Date()
  dt.setDate(dt.getDate() - d)
  return dt.toISOString()
}

export function hoursAgo(h: number): string {
  const dt = new Date()
  dt.setHours(dt.getHours() - h)
  return dt.toISOString()
}
