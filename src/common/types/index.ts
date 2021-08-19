export interface NavItem {
  path: string
  name: string
  isActive: boolean
}

export interface Router {
  path: string
  query: {
    id: number
  }
}
