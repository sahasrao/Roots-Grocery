export const DIETS = [
  'Vegetarian',
  'Vegan',
  'Keto',
  'Low-sugar',
  'Gluten-free',
] as const

export type Diet = (typeof DIETS)[number]
