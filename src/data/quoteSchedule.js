import { quotes } from './quotes'

export const quoteSchedule = quotes
  .map(quote => quote.id)
  .sort((a, b) => a - b)