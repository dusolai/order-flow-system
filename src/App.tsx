import { Routes, Route, Navigate } from 'react-router-dom'
import { BusinessProvider } from './context/BusinessContext'
import { Layout } from './components/Layout'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'
import { Camarero } from './pages/Camarero'
import { CRM } from './pages/CRM'
import { Equipo } from './pages/Equipo'
import { Stock } from './pages/Stock'
import { TPV } from './pages/TPV'
import { Facturas } from './pages/Facturas'
import { Campanas } from './pages/Campanas'
import { Automatizacion } from './pages/Automatizacion'
import { Fiscal } from './pages/Fiscal'
import { Tour } from './pages/Tour'

export default function App() {
  return (
    <BusinessProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/camarero" element={<Camarero />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/tpv" element={<TPV />} />
          <Route path="/facturas" element={<Facturas />} />
          <Route path="/campanas" element={<Campanas />} />
          <Route path="/automatizacion" element={<Automatizacion />} />
          <Route path="/fiscal" element={<Fiscal />} />
          <Route path="/tour" element={<Tour />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BusinessProvider>
  )
}
