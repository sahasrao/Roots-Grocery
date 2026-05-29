export interface Product {
  id: number
  name: string
  price: number
  priceUnit: string
  imageUrl: string
  description: string
  tags: string[]
  category: string
}

export interface CartItem {
  productId: number
  quantity: number
}
