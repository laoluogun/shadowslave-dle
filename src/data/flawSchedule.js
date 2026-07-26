import { flaws } from './flaws'

export const flawSchedule = flaws
  .map(flaw => flaw.id)
  .sort((a, b) => a - b)