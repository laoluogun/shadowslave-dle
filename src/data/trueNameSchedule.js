import { trueNames } from './trueNames'

export const trueNameSchedule = trueNames
  .map(trueName => trueName.id)
  .sort((a, b) => a - b)