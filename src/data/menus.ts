import type { BusinessId, Product } from '../types'

const SMASH_LAB: Product[] = [
  { id: 'sl-emmy', name: 'Emmylisa', category: 'Burgers', price: 12.5, cost: 4.2, margin: 8.3, stock: 24, stockMin: 10, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true, ingredients: ['Pan Brioche', '2x Smash 90g', 'Cheddar madurado', 'Salsa Emmy', 'Mermelada bacon', 'Pepinillo', 'Cebolla caramelizada'] },
  { id: 'sl-trusada', name: 'Trusada', category: 'Burgers', price: 13.0, cost: 4.6, margin: 8.4, stock: 18, stockMin: 10, unit: 'ud', allergens: ['gluten', 'lactosa', 'huevo'], active: true, ingredients: ['Pan Brioche', '2x Smash 90g', 'Cheddar madurado', 'Mayo trufada', 'Cebolla caramelizada', 'Yema texturizada', 'Cebolla frita'] },
  { id: 'sl-pelotazos', name: 'La Pelotazos', category: 'Burgers', price: 11.9, cost: 3.9, margin: 8.0, stock: 9, stockMin: 12, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true, ingredients: ['Pan tostado', '2x Smash 90g', 'Cheddar inglés', 'Cebolla caramelizada', 'Mermelada bacon', 'Salsa cheddar', 'Polvo Pelotazos'] },
  { id: 'sl-navarrica', name: 'La Navarrica', category: 'Burgers', price: 12.9, cost: 4.4, margin: 8.5, stock: 22, stockMin: 10, unit: 'ud', allergens: ['gluten', 'lactosa', 'huevo'], active: true, ingredients: ['Pan tostado', '2x Smash 90g', 'Cheddar inglés', 'Cebolla caramelizada', 'Salsa secreta', 'Patata paja', 'Yema texturizada', 'Mermelada txistorra'] },
  { id: 'sl-jumpers', name: 'La Jumpers', category: 'Burgers', price: 12.5, cost: 4.5, margin: 8.0, stock: 16, stockMin: 10, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true, ingredients: ['Bollito patata', 'Doble Patty', 'Doble cheddar americano', 'Jumpers Snack', 'Salsa Jumpers', 'Pulled casero', 'Lágrima cebolla'] },
  { id: 'sl-lotusada', name: 'La Lotusada', category: 'Burgers', price: 12.5, cost: 4.3, margin: 8.2, stock: 20, stockMin: 10, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true, ingredients: ['Pan tostado', '2x Smash 90g', 'Cheddar madurado', 'Salsa secreta', 'Cebolla caramelizada', 'Bacon jam', 'Crumbel Lotus', 'Cremita Lotus'] },
  { id: 'sl-nipona', name: 'Nipona', category: 'Burgers', price: 12.5, cost: 4.5, margin: 8.0, stock: 14, stockMin: 10, unit: 'ud', allergens: ['gluten', 'lactosa', 'frutos-secos', 'soja'], active: true, ingredients: ['Pan tostado', '2x Smash 90g', 'Cheddar madurado', 'Cacahuete Eagle', 'Salsa Nipona', 'Pulled casero', 'Pepinillo dulce'] },
  { id: 'sl-bygorry', name: 'By Gorry', category: 'Burgers', price: 11.5, cost: 3.8, margin: 7.7, stock: 30, stockMin: 12, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true, ingredients: ['Pan tostado', '2x Smash 90g', 'Cheddar madurado', 'Cebolla frita', 'Salsa secreta', 'Pepinillo dulce'] },
  { id: 'sl-patatas', name: 'Patatas Smash', category: 'Acompañantes', price: 4.0, cost: 0.9, margin: 3.1, stock: 60, stockMin: 20, unit: 'ración', allergens: [], active: true },
  { id: 'sl-aros', name: 'Aros de Cebolla', category: 'Acompañantes', price: 4.5, cost: 1.1, margin: 3.4, stock: 38, stockMin: 15, unit: 'ración', allergens: ['gluten'], active: true },
  { id: 'sl-nuggets', name: 'Nuggets Caseros', category: 'Acompañantes', price: 5.5, cost: 1.6, margin: 3.9, stock: 28, stockMin: 12, unit: 'ración', allergens: ['gluten', 'huevo'], active: true },
  { id: 'sl-coca', name: 'Coca-Cola', category: 'Bebidas', price: 2.5, cost: 0.6, margin: 1.9, stock: 120, stockMin: 30, unit: 'ud', allergens: [], active: true },
  { id: 'sl-cocazero', name: 'Coca-Cola Zero', category: 'Bebidas', price: 2.5, cost: 0.6, margin: 1.9, stock: 88, stockMin: 30, unit: 'ud', allergens: [], active: true },
  { id: 'sl-agua', name: 'Agua mineral', category: 'Bebidas', price: 1.8, cost: 0.3, margin: 1.5, stock: 4, stockMin: 30, unit: 'ud', allergens: [], active: true },
  { id: 'sl-cerveza', name: 'Cerveza Estrella', category: 'Bebidas', price: 3.5, cost: 1.0, margin: 2.5, stock: 96, stockMin: 24, unit: 'ud', allergens: ['gluten'], active: true },
  { id: 'sl-batido-oreo', name: 'Batido Oreo', category: 'Bebidas', price: 5.5, cost: 1.8, margin: 3.7, stock: 26, stockMin: 10, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true },
  { id: 'sl-tarta-queso', name: 'Tarta de queso', category: 'Postres', price: 5.9, cost: 1.6, margin: 4.3, stock: 12, stockMin: 6, unit: 'ración', allergens: ['gluten', 'lactosa', 'huevo'], active: true },
  { id: 'sl-brownie', name: 'Brownie con helado', category: 'Postres', price: 5.5, cost: 1.4, margin: 4.1, stock: 14, stockMin: 6, unit: 'ración', allergens: ['gluten', 'lactosa', 'huevo', 'frutos-secos'], active: true },
  { id: 'sl-menu-completo', name: 'Menú completo (burger + patatas + bebida)', category: 'Menús', price: 16.9, cost: 5.7, margin: 11.2, stock: 999, stockMin: 0, unit: 'menú', allergens: ['gluten', 'lactosa'], active: true },
]

const LA_CABANA: Product[] = [
  { id: 'lc-menu-degustacion', name: 'Menú Degustación 8 pases', category: 'Menús', price: 78.0, cost: 22.0, margin: 56.0, stock: 999, stockMin: 0, unit: 'menú', allergens: ['gluten', 'lactosa', 'huevo', 'pescado'], active: true },
  { id: 'lc-menu-corto', name: 'Menú Corto 5 pases', category: 'Menús', price: 52.0, cost: 14.5, margin: 37.5, stock: 999, stockMin: 0, unit: 'menú', allergens: ['gluten', 'lactosa', 'huevo'], active: true },
  { id: 'lc-tartar-atun', name: 'Tartar de atún rojo', category: 'Entrantes', price: 22.0, cost: 7.0, margin: 15.0, stock: 14, stockMin: 6, unit: 'ración', allergens: ['pescado', 'soja', 'sesamo'], active: true },
  { id: 'lc-foie', name: 'Foie a la brasa con manzana', category: 'Entrantes', price: 24.0, cost: 8.5, margin: 15.5, stock: 10, stockMin: 4, unit: 'ración', allergens: ['gluten'], active: true },
  { id: 'lc-carrillera', name: 'Carrillera al vino tinto', category: 'Principales', price: 26.5, cost: 7.8, margin: 18.7, stock: 16, stockMin: 6, unit: 'ración', allergens: [], active: true },
  { id: 'lc-merluza', name: 'Merluza en salsa verde', category: 'Principales', price: 28.0, cost: 9.4, margin: 18.6, stock: 12, stockMin: 6, unit: 'ración', allergens: ['pescado', 'gluten'], active: true },
  { id: 'lc-chuletón', name: 'Chuletón vaca madurada', category: 'Principales', price: 64.0, cost: 22.0, margin: 42.0, stock: 5, stockMin: 4, unit: 'ración', allergens: [], active: true },
  { id: 'lc-rabo', name: 'Rabo de toro estofado', category: 'Principales', price: 25.0, cost: 7.4, margin: 17.6, stock: 9, stockMin: 5, unit: 'ración', allergens: [], active: true },
  { id: 'lc-coulant', name: 'Coulant de chocolate', category: 'Postres', price: 9.0, cost: 2.2, margin: 6.8, stock: 22, stockMin: 8, unit: 'ración', allergens: ['gluten', 'lactosa', 'huevo'], active: true },
  { id: 'lc-cuajada', name: 'Cuajada con miel', category: 'Postres', price: 7.5, cost: 1.6, margin: 5.9, stock: 18, stockMin: 6, unit: 'ración', allergens: ['lactosa'], active: true },
  { id: 'lc-vino-rioja', name: 'Rioja Reserva (botella)', category: 'Vinos', price: 32.0, cost: 11.0, margin: 21.0, stock: 24, stockMin: 12, unit: 'botella', allergens: [], active: true },
  { id: 'lc-vino-ribera', name: 'Ribera del Duero Crianza (botella)', category: 'Vinos', price: 38.0, cost: 13.5, margin: 24.5, stock: 18, stockMin: 12, unit: 'botella', allergens: [], active: true },
  { id: 'lc-vino-blanco', name: 'Albariño (botella)', category: 'Vinos', price: 26.0, cost: 9.0, margin: 17.0, stock: 3, stockMin: 12, unit: 'botella', allergens: [], active: true },
  { id: 'lc-vino-cava', name: 'Cava Brut Nature', category: 'Vinos', price: 24.0, cost: 8.2, margin: 15.8, stock: 22, stockMin: 10, unit: 'botella', allergens: [], active: true },
  { id: 'lc-agua', name: 'Agua mineral 1L', category: 'Bebidas', price: 3.5, cost: 0.5, margin: 3.0, stock: 60, stockMin: 24, unit: 'botella', allergens: [], active: true },
  { id: 'lc-cafe', name: 'Café especial', category: 'Bebidas', price: 3.0, cost: 0.4, margin: 2.6, stock: 999, stockMin: 0, unit: 'ud', allergens: [], active: true },
]

const VELOCITY: Product[] = [
  { id: 'vk-pollo-crispy', name: 'Pollo Crispy (marca: Crispy Co)', category: 'Crispy Co', price: 13.5, cost: 4.0, margin: 9.5, stock: 38, stockMin: 15, unit: 'ud', allergens: ['gluten'], active: true },
  { id: 'vk-pollo-buffalo', name: 'Pollo Buffalo (marca: Crispy Co)', category: 'Crispy Co', price: 14.0, cost: 4.2, margin: 9.8, stock: 32, stockMin: 15, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true },
  { id: 'vk-pollo-katsu', name: 'Pollo Katsu (marca: Crispy Co)', category: 'Crispy Co', price: 14.5, cost: 4.4, margin: 10.1, stock: 26, stockMin: 12, unit: 'ud', allergens: ['gluten', 'soja'], active: true },
  { id: 'vk-poke-salmon', name: 'Poke salmón (marca: Bowl Lab)', category: 'Bowl Lab', price: 13.9, cost: 4.6, margin: 9.3, stock: 24, stockMin: 12, unit: 'ud', allergens: ['pescado', 'soja', 'sesamo'], active: true },
  { id: 'vk-poke-veggie', name: 'Poke veggie (marca: Bowl Lab)', category: 'Bowl Lab', price: 11.9, cost: 3.4, margin: 8.5, stock: 28, stockMin: 12, unit: 'ud', allergens: ['soja'], active: true },
  { id: 'vk-poke-tuna', name: 'Poke atún picante (marca: Bowl Lab)', category: 'Bowl Lab', price: 14.5, cost: 4.8, margin: 9.7, stock: 14, stockMin: 12, unit: 'ud', allergens: ['pescado', 'soja'], active: true },
  { id: 'vk-pizza-margherita', name: 'Margherita (marca: Pizza Velo)', category: 'Pizza Velo', price: 11.5, cost: 3.2, margin: 8.3, stock: 999, stockMin: 0, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true },
  { id: 'vk-pizza-trufa', name: 'Pizza Trufa (marca: Pizza Velo)', category: 'Pizza Velo', price: 15.9, cost: 5.0, margin: 10.9, stock: 999, stockMin: 0, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true },
  { id: 'vk-pizza-cuatroquesos', name: 'Cuatro quesos (marca: Pizza Velo)', category: 'Pizza Velo', price: 13.5, cost: 4.0, margin: 9.5, stock: 999, stockMin: 0, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true },
  { id: 'vk-pizza-bbq', name: 'BBQ Bacon (marca: Pizza Velo)', category: 'Pizza Velo', price: 14.5, cost: 4.4, margin: 10.1, stock: 999, stockMin: 0, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true },
  { id: 'vk-patatas', name: 'Patatas extra', category: 'Extras', price: 3.5, cost: 0.8, margin: 2.7, stock: 80, stockMin: 30, unit: 'ración', allergens: [], active: true },
  { id: 'vk-bebida-coca', name: 'Coca-Cola lata', category: 'Bebidas', price: 2.2, cost: 0.5, margin: 1.7, stock: 140, stockMin: 36, unit: 'lata', allergens: [], active: true },
  { id: 'vk-bebida-agua', name: 'Agua mineral', category: 'Bebidas', price: 1.5, cost: 0.3, margin: 1.2, stock: 100, stockMin: 36, unit: 'botella', allergens: [], active: true },
  { id: 'vk-bebida-cerveza', name: 'Cerveza Mahou', category: 'Bebidas', price: 2.8, cost: 0.8, margin: 2.0, stock: 56, stockMin: 24, unit: 'lata', allergens: ['gluten'], active: true },
  { id: 'vk-postre-cheesecake', name: 'Cheesecake mini', category: 'Postres', price: 4.5, cost: 1.2, margin: 3.3, stock: 22, stockMin: 10, unit: 'ud', allergens: ['gluten', 'lactosa'], active: true },
  { id: 'vk-postre-cookies', name: 'Pack 3 cookies', category: 'Postres', price: 4.0, cost: 0.9, margin: 3.1, stock: 8, stockMin: 10, unit: 'pack', allergens: ['gluten', 'lactosa', 'huevo'], active: true },
]

export const MENUS: Record<BusinessId, Product[]> = {
  'smash-lab': SMASH_LAB,
  'la-cabana': LA_CABANA,
  'velocity-kitchen': VELOCITY,
}
