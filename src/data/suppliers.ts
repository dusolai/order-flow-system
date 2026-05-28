import type { BusinessId, Supplier } from '../types'

const S_SL: Supplier[] = [
  { id: 'sup-sl-1', name: 'Carnes Aramburu', contact: '+34 911 223 344', category: 'Carne', rating: 4.6, totalSpent: 18420, invoicesCount: 24 },
  { id: 'sup-sl-2', name: 'Panadería Brioche Lab', contact: '+34 912 332 211', category: 'Pan', rating: 4.8, totalSpent: 6890, invoicesCount: 36 },
  { id: 'sup-sl-3', name: 'Quesos Sierra', contact: '+34 913 445 566', category: 'Lácteos', rating: 4.4, totalSpent: 4220, invoicesCount: 18 },
  { id: 'sup-sl-4', name: 'McCain Foods', contact: '+34 914 778 899', category: 'Congelados', rating: 4.2, totalSpent: 3680, invoicesCount: 12 },
  { id: 'sup-sl-5', name: 'Coca-Cola European Partners', contact: '+34 915 887 766', category: 'Bebidas', rating: 4.7, totalSpent: 7220, invoicesCount: 24 },
  { id: 'sup-sl-6', name: 'Iberdrola', contact: 'atencion@iberdrola.es', category: 'Suministros', rating: 3.8, totalSpent: 4680, invoicesCount: 12 },
  { id: 'sup-sl-7', name: 'Canal de Isabel II', contact: 'atencion@canal.es', category: 'Suministros', rating: 4.0, totalSpent: 980, invoicesCount: 6 },
  { id: 'sup-sl-8', name: 'Verdulería La Plaza', contact: '+34 916 776 655', category: 'Verdura', rating: 4.5, totalSpent: 3120, invoicesCount: 30 },
]

const S_LC: Supplier[] = [
  { id: 'sup-lc-1', name: 'Pescados Donostia', contact: '+34 943 112 233', category: 'Pescado', rating: 4.8, totalSpent: 22800, invoicesCount: 48 },
  { id: 'sup-lc-2', name: 'Carnicería Vasca Premium', contact: '+34 943 223 344', category: 'Carne', rating: 4.9, totalSpent: 26400, invoicesCount: 36 },
  { id: 'sup-lc-3', name: 'Bodegas Muga', contact: '+34 941 332 211', category: 'Vinos', rating: 4.7, totalSpent: 9800, invoicesCount: 12 },
  { id: 'sup-lc-4', name: 'Bodegas Granbazán', contact: '+34 986 443 322', category: 'Vinos', rating: 4.6, totalSpent: 5200, invoicesCount: 10 },
  { id: 'sup-lc-5', name: 'Aceites Premium Jaén', contact: '+34 953 554 433', category: 'Aceite', rating: 4.7, totalSpent: 3120, invoicesCount: 8 },
  { id: 'sup-lc-6', name: 'Mercado Central Bilbao', contact: '+34 944 665 544', category: 'Verdura/Fruta', rating: 4.5, totalSpent: 8400, invoicesCount: 52 },
  { id: 'sup-lc-7', name: 'Iberdrola', contact: 'atencion@iberdrola.es', category: 'Suministros', rating: 3.9, totalSpent: 6200, invoicesCount: 12 },
  { id: 'sup-lc-8', name: 'Lavandería Profesional Norte', contact: '+34 944 776 655', category: 'Servicios', rating: 4.3, totalSpent: 2880, invoicesCount: 12 },
]

const S_VK: Supplier[] = [
  { id: 'sup-vk-1', name: 'Makro Cash & Carry', contact: '+34 963 112 233', category: 'Multiproducto', rating: 4.5, totalSpent: 18600, invoicesCount: 48 },
  { id: 'sup-vk-2', name: 'Glovo Partners', contact: 'partners@glovo.com', category: 'Delivery', rating: 4.2, totalSpent: 12400, invoicesCount: 24 },
  { id: 'sup-vk-3', name: 'Uber Eats', contact: 'restaurants@uber.com', category: 'Delivery', rating: 4.1, totalSpent: 9800, invoicesCount: 24 },
  { id: 'sup-vk-4', name: 'Just Eat', contact: 'partners@justeat.es', category: 'Delivery', rating: 4.0, totalSpent: 6420, invoicesCount: 24 },
  { id: 'sup-vk-5', name: 'Coca-Cola European Partners', contact: '+34 915 887 766', category: 'Bebidas', rating: 4.7, totalSpent: 4220, invoicesCount: 24 },
  { id: 'sup-vk-6', name: 'Pescados Valencia', contact: '+34 962 332 221', category: 'Pescado', rating: 4.4, totalSpent: 5680, invoicesCount: 36 },
  { id: 'sup-vk-7', name: 'Pollerías El Saler', contact: '+34 962 445 566', category: 'Pollo', rating: 4.6, totalSpent: 7820, invoicesCount: 36 },
  { id: 'sup-vk-8', name: 'Iberdrola', contact: 'atencion@iberdrola.es', category: 'Suministros', rating: 3.7, totalSpent: 5400, invoicesCount: 12 },
]

export const SUPPLIERS: Record<BusinessId, Supplier[]> = {
  'smash-lab': S_SL,
  'la-cabana': S_LC,
  'velocity-kitchen': S_VK,
}
