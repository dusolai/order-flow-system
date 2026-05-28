import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import type { Business, BusinessId } from '../types'
import { BUSINESSES } from '../data/businesses'

interface BusinessContextValue {
  business: Business
  businessId: BusinessId
  setBusinessId: (id: BusinessId) => void
  all: Business[]
}

const BusinessContext = createContext<BusinessContextValue | null>(null)

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [businessId, setBusinessId] = useState<BusinessId>('smash-lab')
  const value = useMemo<BusinessContextValue>(
    () => ({
      businessId,
      setBusinessId,
      business: BUSINESSES.find((b) => b.id === businessId)!,
      all: BUSINESSES,
    }),
    [businessId],
  )
  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>
}

export function useBusiness() {
  const ctx = useContext(BusinessContext)
  if (!ctx) throw new Error('useBusiness must be inside BusinessProvider')
  return ctx
}
