export interface Currency {
  high: string
  low: string
  percentChange: string
  quoteVolume: string
  symbol: string
  updatedAt: string
  volume: string
  imgUrl?: string
}

export interface ContextType {
  currency: Currency[]
  totalPages: number
  updatePage: (operation: string) => void
  page: number

}
