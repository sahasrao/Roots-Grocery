import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Pacific Halibut',
    price: 16.85,
    priceUnit: '/10oz',
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&auto=format',
    description:
      'Line-caught Pacific halibut from the icy waters off the Alaskan coast. Mild, flaky white flesh with a clean ocean flavor. Perfect for pan-searing or grilling.',
    tags: ['Pescatarian', 'Low-carbon', 'Wild-caught'],
    category: 'Seafood',
  },
  {
    id: 2,
    name: 'Aged Parmesan',
    price: 6,
    priceUnit: '/lb',
    imageUrl:
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=400&fit=crop&auto=format',
    description:
      '24-month aged Parmigiano Reggiano from a small cooperative in Emilia-Romagna. Rich, crystalline, and deeply savory with notes of hazelnut.',
    tags: ['Grass-fed', 'Organic', 'Vegetarian'],
    category: 'Dairy',
  },
  {
    id: 3,
    name: 'Natural Wine',
    price: 19,
    priceUnit: 'each',
    imageUrl:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop&auto=format',
    description:
      'A light-bodied pét-nat from a biodynamic farm in the Loire Valley. Naturally effervescent, cloudy amber hue, with notes of apricot and brioche.',
    tags: ['Organic', 'Vegan', 'Biodynamic'],
    category: 'Beverages',
  },
  {
    id: 4,
    name: 'Raw Wildflower Honey',
    price: 12.5,
    priceUnit: 'per 8oz',
    imageUrl:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&auto=format',
    description:
      'Unfiltered, unpasteurized wildflower honey from small-batch hives in the Pacific Northwest. Rich in enzymes and antioxidants. Crystallizes naturally with time.',
    tags: ['Organic', 'Vegan', 'Raw'],
    category: 'Pantry',
  },
  {
    id: 5,
    name: 'Heirloom Tomatoes',
    price: 4.5,
    priceUnit: '/lb',
    imageUrl:
      'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=400&h=400&fit=crop&auto=format',
    description:
      'A colorful mix of Brandywine, Cherokee Purple, and Sun Gold heirloom tomatoes. Grown without pesticides on a family farm in Sonoma County.',
    tags: ['Vegan', 'Organic', 'Local'],
    category: 'Produce',
  },
  {
    id: 6,
    name: 'Grass-fed Butter',
    price: 8.75,
    priceUnit: '/lb',
    imageUrl:
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop&auto=format',
    description:
      'Cultured European-style butter from 100% grass-fed Jersey cows. Deep golden color with a complex, tangy flavor from slow churning and live cultures.',
    tags: ['Grass-fed', 'Vegetarian', 'Keto'],
    category: 'Dairy',
  },
  {
    id: 7,
    name: 'Sourdough Loaf',
    price: 9,
    priceUnit: 'each',
    imageUrl:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&auto=format',
    description:
      'Cold-fermented sourdough made with freshly milled whole wheat and rye. 36-hour fermentation yields deep flavor, open crumb, and a shattering crust.',
    tags: ['Vegan', 'Vegetarian', 'Artisan'],
    category: 'Bakery',
  },
  {
    id: 8,
    name: 'Shiitake Mushrooms',
    price: 6.25,
    priceUnit: '/8oz',
    imageUrl:
      'https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=400&h=400&fit=crop&auto=format',
    description:
      'Fresh shiitake mushrooms grown on oak logs using traditional Japanese methods. Meaty, umami-rich caps ideal for stir-fries, soups, and ramen.',
    tags: ['Vegan', 'Vegetarian', 'Keto', 'Low-sugar', 'Gluten-free'],
    category: 'Produce',
  },
  {
    id: 9,
    name: 'Cold-Pressed Olive Oil',
    price: 22,
    priceUnit: 'per 500ml',
    imageUrl:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&auto=format',
    description:
      'Single-origin extra virgin olive oil from a small grove in Crete. First cold press of Koroneiki olives. Fruity, peppery finish with low acidity.',
    tags: ['Organic', 'Vegan', 'Keto', 'Gluten-free'],
    category: 'Pantry',
  },
  {
    id: 10,
    name: 'Almond Milk Kefir',
    price: 7,
    priceUnit: 'per quart',
    imageUrl:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop&auto=format',
    description:
      'Probiotic-rich almond milk kefir fermented with a traditional tibicos culture. Creamy, lightly tart, and dairy-free. Great for gut health and smoothies.',
    tags: ['Vegan', 'Gluten-free', 'Low-sugar', 'Probiotic'],
    category: 'Beverages',
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function filterProducts(options: {
  search?: string
  diet?: string | null
}): Product[] {
  const query = options.search?.trim().toLowerCase()
  const diet = options.diet

  return products.filter((product) => {
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)

    const matchesDiet =
      !diet ||
      product.tags.some((tag) => tag.toLowerCase() === diet.toLowerCase())

    return matchesSearch && matchesDiet
  })
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2).replace(/\.00$/, '')}`
}
