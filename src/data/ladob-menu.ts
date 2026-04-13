export interface LadoBItem {
  name: string
  description: string
  price: number
  tag?: string
}

export interface LadoBCategory {
  id: string
  name: string
  items: LadoBItem[]
}

export const ladoBCategories: LadoBCategory[] = [
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    items: [
      {
        name: 'Burger Clásica',
        description: 'Carne 100% res 130g, queso cheddar, lechuga, tomate, cebolla, pan brioche artesanal.',
        price: 14000,
      },
      {
        name: 'Smart B',
        description: 'Carne Beyond Meat, guacamole, queso almendra, tomate, champiñones, cebolla morada, pan brioche vegano.',
        price: 26000,
        tag: 'Vegana',
      },
      {
        name: 'Magic B',
        description: 'Carne Beyond Meat, lechuga, tomate, aros cebolla, queso cheddar, pan brioche.',
        price: 22000,
        tag: 'Veggie',
      },
      {
        name: 'Doble Crispy',
        description: 'Carne 260g, lechuga, doble queso cheddar, doble tocineta ahumada.',
        price: 20000,
      },
      {
        name: 'Bacon & Onion',
        description: 'Carne 130g, tiras cebolla, tocineta BBQ, doble queso cheddar.',
        price: 15000,
      },
      {
        name: 'Cheese Bacon',
        description: 'Carne 130g, lechuga, tomate, queso cheddar, doble tocineta ahumada.',
        price: 17000,
      },
    ],
  },
  {
    id: 'combos',
    name: 'Combos',
    items: [
      {
        name: 'Combo Clásica',
        description: 'Burger Clásica + papas + bebida.',
        price: 20000,
      },
      {
        name: 'Combo Doble Crispy',
        description: 'Doble Crispy + papas + bebida.',
        price: 26000,
      },
      {
        name: 'Combo Smart B',
        description: 'Smart B + papas + bebida.',
        price: 31000,
        tag: 'Vegana',
      },
      {
        name: 'Combo Bacon & Onion',
        description: 'Bacon & Onion + papas + bebida.',
        price: 21000,
      },
      {
        name: 'Combo Magic B',
        description: 'Magic B + papas + bebida.',
        price: 27000,
        tag: 'Veggie',
      },
      {
        name: 'Combo Cheese Bacon',
        description: 'Cheese Bacon + papas + bebida.',
        price: 22000,
      },
    ],
  },
  {
    id: 'extras',
    name: 'Extras & Bebidas',
    items: [
      {
        name: 'Aros de Cebolla',
        description: 'Aros de cebolla crujientes.',
        price: 7000,
      },
      {
        name: 'Papas Artesanales Casco',
        description: 'Papas cortadas en casco, doradas.',
        price: 4900,
      },
      {
        name: 'Papas Lado B',
        description: 'Nuestras papas signature.',
        price: 4900,
      },
      {
        name: 'Agua en caja 330ml',
        description: '',
        price: 3200,
      },
      {
        name: 'Coca Cola Original 235ml',
        description: '',
        price: 2500,
      },
      {
        name: 'Coca Cola Sin Azúcar 235ml',
        description: '',
        price: 2500,
      },
    ],
  },
]

export function formatCOP(price: number): string {
  return `$${price.toLocaleString('es-CO')}`
}
