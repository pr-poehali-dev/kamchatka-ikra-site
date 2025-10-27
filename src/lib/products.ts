export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  category: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'keta-premium',
    name: 'Кета премиум',
    description: 'Крупная икра насыщенного оранжево-красного цвета с деликатным вкусом',
    price: 5500,
    weight: '1 кг',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/3cf5f1db-0a37-4dc7-9e45-684c93b8085d.jpg',
    category: 'premium',
    features: ['Крупные икринки 5-6 мм', 'Насыщенный вкус', 'Высшая категория'],
    inStock: true
  },
  {
    id: 'gorbuscha-classic',
    name: 'Горбуша классик',
    description: 'Традиционный выбор с ярким вкусом и средним размером икринок',
    price: 4200,
    weight: '1 кг',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/35ed52f9-6d71-4d5a-b665-2f9752703e04.jpg',
    category: 'classic',
    features: ['Икринки 4-5 мм', 'Классический вкус', 'Лучшая цена'],
    inStock: true
  },
  {
    id: 'nerka-elite',
    name: 'Нерка элит',
    description: 'Редкая икра с пикантным вкусом и мелкими икринками',
    price: 6200,
    weight: '1 кг',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/3cf5f1db-0a37-4dc7-9e45-684c93b8085d.jpg',
    category: 'premium',
    features: ['Уникальный вкус', 'Мелкие икринки 3-4 мм', 'Ограниченная партия'],
    inStock: true
  },
  {
    id: 'kijuch-gold',
    name: 'Кижуч голд',
    description: 'Икра с нежным вкусом и характерной горчинкой',
    price: 4800,
    weight: '1 кг',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/35ed52f9-6d71-4d5a-b665-2f9752703e04.jpg',
    category: 'classic',
    features: ['Средние икринки 4 мм', 'Нежный вкус', 'Для гурманов'],
    inStock: true
  },
  {
    id: 'chawych-royal',
    name: 'Чавыча роял',
    description: 'Королевская икра с самыми крупными икринками',
    price: 7500,
    weight: '1 кг',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/3cf5f1db-0a37-4dc7-9e45-684c93b8085d.jpg',
    category: 'premium',
    features: ['Гигантские икринки 6-7 мм', 'Королевский сорт', 'Эксклюзив'],
    inStock: true
  },
  {
    id: 'gift-set-luxury',
    name: 'Подарочный набор "Люкс"',
    description: 'Элегантная упаковка с золотой лентой, 3 вида икры',
    price: 18000,
    weight: '3 кг (3x1кг)',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/a805a0e1-eb09-4142-a586-3b54e2b3004a.jpg',
    category: 'gift',
    features: ['3 вида икры', 'Подарочная упаковка', 'Идеально для подарка'],
    inStock: true
  },
  {
    id: 'gift-set-premium',
    name: 'Подарочный набор "Премиум"',
    description: 'Изысканный набор с кетой и горбушей',
    price: 9500,
    weight: '2 кг (2x1кг)',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/a805a0e1-eb09-4142-a586-3b54e2b3004a.jpg',
    category: 'gift',
    features: ['2 вида икры', 'Красивая упаковка', 'Отличная цена'],
    inStock: true
  },
  {
    id: 'wholesale-13kg',
    name: 'Оптовая партия 13 кг',
    description: 'Минимальная оптовая партия с максимальной выгодой',
    price: 52000,
    weight: '13 кг',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/3cf5f1db-0a37-4dc7-9e45-684c93b8085d.jpg',
    category: 'wholesale',
    features: ['Оптовая цена', 'Свежий улов', 'Для ресторанов'],
    inStock: true
  },
  {
    id: 'beluga-imperial',
    name: 'Белуга империал',
    description: 'Королева чёрной икры с крупными икринками и нежным вкусом',
    price: 45000,
    weight: '500 г',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/c3abc963-c76d-45bf-8c2e-a44ee3124fde.jpg',
    category: 'black',
    features: ['Крупные икринки 3-4 мм', 'Самый деликатный вкус', 'Элитный сорт'],
    inStock: true
  },
  {
    id: 'osetr-classic',
    name: 'Осетр классик',
    description: 'Классическая чёрная икра с насыщенным вкусом',
    price: 28000,
    weight: '500 г',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/c3abc963-c76d-45bf-8c2e-a44ee3124fde.jpg',
    category: 'black',
    features: ['Средние икринки 2-3 мм', 'Насыщенный вкус', 'Лучшее соотношение цена-качество'],
    inStock: true
  },
  {
    id: 'sevruga-select',
    name: 'Севрюга селект',
    description: 'Изысканная чёрная икра с пикантным послевкусием',
    price: 22000,
    weight: '500 г',
    image: 'https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/c3abc963-c76d-45bf-8c2e-a44ee3124fde.jpg',
    category: 'black',
    features: ['Мелкие икринки 1-2 мм', 'Пикантный вкус', 'Доступная цена'],
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};