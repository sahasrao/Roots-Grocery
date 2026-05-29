export interface User {
  id: string
  name: string
  email: string
  picture?: string
}

export interface GoogleJwtPayload {
  sub: string
  name: string
  email: string
  picture?: string
}
