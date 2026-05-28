import type { BusinessId, User, Task, Role, TaskPriority, TaskStatus } from '../types'

const ROLES_FULL: { role: Role; dept: string; titles: string[] }[] = [
  { role: 'owner', dept: 'Dirección', titles: ['Dueño'] },
  { role: 'gerente', dept: 'Operaciones', titles: ['Gerente de local', 'Responsable de turno'] },
  { role: 'cocina', dept: 'Cocina', titles: ['Jefe de cocina', 'Cocinero', 'Ayudante'] },
  { role: 'camarero', dept: 'Sala', titles: ['Jefe de barra', 'Camarero', 'Runner'] },
  { role: 'marketing', dept: 'Marketing', titles: ['Marketing manager', 'Community manager'] },
  { role: 'administracion', dept: 'Administración', titles: ['Administración', 'Facturación'] },
  { role: 'soporte', dept: 'Soporte', titles: ['Soporte interno'] },
]

const TEAM_SL: User[] = [
  { id: 'u-sl-1', name: 'Joel Martín', role: 'owner', department: 'Dirección', email: 'joel@smashlab.demo', active: true },
  { id: 'u-sl-2', name: 'Carla Romero', role: 'gerente', department: 'Operaciones', email: 'carla@smashlab.demo', active: true },
  { id: 'u-sl-3', name: 'Mateo López', role: 'cocina', department: 'Cocina', email: 'mateo@smashlab.demo', active: true },
  { id: 'u-sl-4', name: 'Aitor González', role: 'cocina', department: 'Cocina', email: 'aitor@smashlab.demo', active: true },
  { id: 'u-sl-5', name: 'Lucía Sanz', role: 'camarero', department: 'Sala', email: 'lucia@smashlab.demo', active: true },
  { id: 'u-sl-6', name: 'Hugo Pérez', role: 'camarero', department: 'Sala', email: 'hugo@smashlab.demo', active: false },
  { id: 'u-sl-7', name: 'Diego Vázquez', role: 'marketing', department: 'Marketing', email: 'diego@smashlab.demo', active: true },
  { id: 'u-sl-8', name: 'Paula Torres', role: 'administracion', department: 'Administración', email: 'paula@smashlab.demo', active: true },
]

const TEAM_LC: User[] = [
  { id: 'u-lc-1', name: 'Sergio Etxeberria', role: 'owner', department: 'Dirección', email: 'sergio@lacabana.demo', active: true },
  { id: 'u-lc-2', name: 'Andrea Iglesias', role: 'gerente', department: 'Operaciones', email: 'andrea@lacabana.demo', active: true },
  { id: 'u-lc-3', name: 'Mikel Aranzabe', role: 'cocina', department: 'Cocina', email: 'mikel@lacabana.demo', active: true },
  { id: 'u-lc-4', name: 'Olatz Garmendia', role: 'cocina', department: 'Cocina', email: 'olatz@lacabana.demo', active: true },
  { id: 'u-lc-5', name: 'Iker Mendoza', role: 'camarero', department: 'Sala', email: 'iker@lacabana.demo', active: true },
  { id: 'u-lc-6', name: 'Ainhoa Sanz', role: 'camarero', department: 'Sala', email: 'ainhoa@lacabana.demo', active: true },
  { id: 'u-lc-7', name: 'Marta Solé', role: 'marketing', department: 'Marketing', email: 'marta@lacabana.demo', active: true },
  { id: 'u-lc-8', name: 'Javier Lozano', role: 'administracion', department: 'Administración', email: 'javier@lacabana.demo', active: true },
]

const TEAM_VK: User[] = [
  { id: 'u-vk-1', name: 'Pablo Domínguez', role: 'owner', department: 'Dirección', email: 'pablo@velocitykitchen.demo', active: true },
  { id: 'u-vk-2', name: 'Sara Cortés', role: 'gerente', department: 'Operaciones', email: 'sara@velocitykitchen.demo', active: true },
  { id: 'u-vk-3', name: 'Bruno Castro', role: 'cocina', department: 'Cocina · Pizza Velo', email: 'bruno@velocitykitchen.demo', active: true },
  { id: 'u-vk-4', name: 'Noa Suárez', role: 'cocina', department: 'Cocina · Bowl Lab', email: 'noa@velocitykitchen.demo', active: true },
  { id: 'u-vk-5', name: 'Leo Ortega', role: 'cocina', department: 'Cocina · Crispy Co', email: 'leo@velocitykitchen.demo', active: true },
  { id: 'u-vk-6', name: 'Claudia Núñez', role: 'marketing', department: 'Marketing', email: 'claudia@velocitykitchen.demo', active: true },
  { id: 'u-vk-7', name: 'Nicolás Garrido', role: 'administracion', department: 'Administración', email: 'nico@velocitykitchen.demo', active: true },
  { id: 'u-vk-8', name: 'Lola Cruz', role: 'soporte', department: 'Soporte', email: 'lola@velocitykitchen.demo', active: true },
]

export const TEAMS: Record<BusinessId, User[]> = {
  'smash-lab': TEAM_SL,
  'la-cabana': TEAM_LC,
  'velocity-kitchen': TEAM_VK,
}

function task(id: string, title: string, assignee: string, dept: string, priority: TaskPriority, status: TaskStatus, dueDays: number, notes?: string): Task {
  const dt = new Date()
  dt.setDate(dt.getDate() + dueDays)
  return { id, title, assignee, department: dept, priority, status, due: dt.toISOString(), notes }
}

const TASKS_SL: Task[] = [
  task('t-sl-1', 'Reponer stock de Agua mineral (crítico, 4 ud)', 'Mateo López', 'Cocina', 'critica', 'pendiente', 0, 'Quedan 4 botellas, mínimo 30.'),
  task('t-sl-2', 'Reponer Patatas Smash congeladas — proveedor McCain', 'Carla Romero', 'Operaciones', 'alta', 'en-proceso', 1),
  task('t-sl-3', 'Lanzar campaña "Vuelve por San Juan" en Meta Ads', 'Diego Vázquez', 'Marketing', 'alta', 'pendiente', 3),
  task('t-sl-4', 'Pagar factura proveedor Carnes Aramburu (vencida)', 'Paula Torres', 'Administración', 'critica', 'pendiente', 0),
  task('t-sl-5', 'Cambiar precio Trusada de 13 a 13,50€ (margen)', 'Joel Martín', 'Dirección', 'media', 'completada', -2),
  task('t-sl-6', 'Formación nuevo runner — Hugo', 'Carla Romero', 'Operaciones', 'media', 'bloqueada', 4, 'Hugo de baja médica esta semana.'),
  task('t-sl-7', 'Cierre de caja viernes — diferencia 12€', 'Joel Martín', 'Dirección', 'media', 'en-proceso', 1),
  task('t-sl-8', 'Atender queja cliente Pablo Méndez (pedido frío)', 'Carla Romero', 'Operaciones', 'alta', 'completada', -1),
  task('t-sl-9', 'Pedir hojas de inspección sanitaria', 'Paula Torres', 'Administración', 'baja', 'pendiente', 14),
  task('t-sl-10', 'Diseñar pack "Sábado 2x1" para horas valle 17:00-19:00', 'Diego Vázquez', 'Marketing', 'media', 'en-proceso', 7),
]

const TASKS_LC: Task[] = [
  task('t-lc-1', 'Reservar productos para menú San Sebastián día (16/07)', 'Mikel Aranzabe', 'Cocina', 'alta', 'pendiente', 5),
  task('t-lc-2', 'Stock Albariño crítico (3 botellas)', 'Andrea Iglesias', 'Operaciones', 'critica', 'pendiente', 0),
  task('t-lc-3', 'Confirmar reserva grupo 12 pax sábado', 'Iker Mendoza', 'Sala', 'media', 'completada', -1),
  task('t-lc-4', 'Actualizar carta de vinos en la web', 'Marta Solé', 'Marketing', 'baja', 'en-proceso', 7),
  task('t-lc-5', 'Auditoría escandallos Q2 2026', 'Sergio Etxeberria', 'Dirección', 'media', 'pendiente', 10),
  task('t-lc-6', 'Negociar precio nuevo proveedor pescado', 'Sergio Etxeberria', 'Dirección', 'alta', 'pendiente', 3),
  task('t-lc-7', 'Cambiar coulant del menú degustación (verano)', 'Mikel Aranzabe', 'Cocina', 'media', 'en-proceso', 6),
  task('t-lc-8', 'Pagar factura Bodegas Muga', 'Javier Lozano', 'Administración', 'alta', 'en-proceso', 1),
]

const TASKS_VK: Task[] = [
  task('t-vk-1', 'Mantenimiento horno Pizza Velo (pizza #2)', 'Bruno Castro', 'Cocina', 'alta', 'pendiente', 2),
  task('t-vk-2', 'Optimizar campaña "Nuevos clientes" — CPL subió a 4,8€', 'Claudia Núñez', 'Marketing', 'alta', 'en-proceso', 1),
  task('t-vk-3', 'Reponer cookies (stock 8, mínimo 10)', 'Sara Cortés', 'Operaciones', 'media', 'pendiente', 1),
  task('t-vk-4', 'Lanzar nueva marca virtual "Sushi Bay"', 'Pablo Domínguez', 'Dirección', 'alta', 'bloqueada', 30, 'Esperando licencia regulación marca'),
  task('t-vk-5', 'Procesar factura Glovo enero (OCR confianza 87%)', 'Nicolás Garrido', 'Administración', 'media', 'pendiente', 3),
  task('t-vk-6', 'Resolver incidencia rider pedido #1241 (entregado tarde)', 'Lola Cruz', 'Soporte', 'media', 'completada', -1),
  task('t-vk-7', 'Revisar márgenes Pizza Velo (cuatro quesos baja)', 'Pablo Domínguez', 'Dirección', 'media', 'pendiente', 5),
  task('t-vk-8', 'Activar promoción horas valle 15:00-19:00', 'Claudia Núñez', 'Marketing', 'media', 'pendiente', 4),
  task('t-vk-9', 'Pedido a proveedor Makro (semanal)', 'Sara Cortés', 'Operaciones', 'alta', 'completada', -1),
]

export const TASKS: Record<BusinessId, Task[]> = {
  'smash-lab': TASKS_SL,
  'la-cabana': TASKS_LC,
  'velocity-kitchen': TASKS_VK,
}
