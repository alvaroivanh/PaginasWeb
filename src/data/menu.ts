export interface MenuItem {
  name: string
  description: string
  price: number
  image?: string
  tag?: string
}

export interface MenuCategory {
  id: string
  name: string
  icon: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'sopas',
    name: 'Sopas',
    icon: '🍲',
    items: [
      {
        name: 'Ajiaco Santafereño',
        description: 'Sopa tradicional bogotana con tres tipos de papa, pollo desmechado, mazorca, guascas, alcaparras y crema.',
        price: 28000,
        tag: 'Especialidad',
      },
      {
        name: 'Sancocho de Gallina',
        description: 'Caldo espeso con gallina criolla, yuca, plátano, papa, mazorca y cilantro fresco.',
        price: 32000,
      },
      {
        name: 'Sopa de Mondongo',
        description: 'Callos de res cocidos lentamente con papa, yuca, zanahoria y especias criollas.',
        price: 26000,
      },
      {
        name: 'Changua',
        description: 'Caldo campesino con leche, huevo pochado, cilantro y pan calentano.',
        price: 18000,
      },
    ],
  },
  {
    id: 'fuertes',
    name: 'Platos Fuertes',
    icon: '🥩',
    items: [
      {
        name: 'Bandeja Paisa',
        description: 'El plato insignia: frijoles, arroz, chicharrón, carne molida, chorizo, huevo frito, tajada, arepa y aguacate.',
        price: 38000,
        tag: 'Popular',
      },
      {
        name: 'Lomo al Trapo',
        description: 'Lomo de res envuelto en sal gruesa y tela, cocinado a la brasa. Jugoso por dentro, crujiente por fuera.',
        price: 52000,
        tag: 'Chef recomienda',
      },
      {
        name: 'Mojarra Frita',
        description: 'Mojarra roja dorada con patacones, arroz con coco, ensalada fresca y ají.',
        price: 36000,
      },
      {
        name: 'Mamona Llanera',
        description: 'Ternera a la llanera asada lentamente sobre brasas de leña. Servida con yuca, plátano y guacamole.',
        price: 48000,
      },
      {
        name: 'Arepas Rellenas de la Casa',
        description: 'Trio de arepas: hogao con queso, chicharrón desmechado, y pollo con aguacate.',
        price: 28000,
      },
      {
        name: 'Cazuela de Mariscos',
        description: 'Langostinos, calamares y pescado en salsa de coco con arroz de coco y patacón.',
        price: 45000,
      },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    icon: '🍮',
    items: [
      {
        name: 'Tres Leches Colombiano',
        description: 'Bizcocho esponjoso bañado en tres leches con canela y merengue dorado.',
        price: 16000,
        tag: 'Favorito',
      },
      {
        name: 'Natilla con Buñuelos',
        description: 'Natilla de panela con canela acompañada de buñuelos de queso recién hechos.',
        price: 14000,
      },
      {
        name: 'Postre de Natas',
        description: 'Capas de natas de leche con arequipe, canela y galleta molida.',
        price: 15000,
      },
      {
        name: 'Cuajada con Melao',
        description: 'Cuajada fresca campesina bañada en melao de panela caliente.',
        price: 12000,
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    icon: '🥤',
    items: [
      {
        name: 'Limonada de Coco',
        description: 'Limonada cremosa con leche de coco, hielo y toque de hierbabuena.',
        price: 12000,
      },
      {
        name: 'Jugo de Lulo',
        description: 'Jugo natural de lulo fresco, endulzado al gusto.',
        price: 10000,
      },
      {
        name: 'Aguapanela con Limón',
        description: 'Tradicional bebida de panela con limón, servida fría o caliente.',
        price: 8000,
      },
      {
        name: 'Café de Origen',
        description: 'Café especial de finca del Huila, preparado en método pour-over.',
        price: 9000,
        tag: 'Especial',
      },
      {
        name: 'Cóctel Leña Criolla',
        description: 'Aguardiente antioqueño, pulpa de maracuyá, limón y panela. Nuestro signature.',
        price: 22000,
        tag: 'Signature',
      },
      {
        name: 'Cerveza Artesanal',
        description: 'Selección rotativa de cervecerías colombianas. Pregunta por la del día.',
        price: 14000,
      },
    ],
  },
]

export function formatCOP(price: number): string {
  return `$${price.toLocaleString('es-CO')}`
}
