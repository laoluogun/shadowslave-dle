import { characters } from './characters'

const baseSchedule = Object.values(characters)
  .map(character => character.id)
  .sort((a, b) => a - b)

export const classicSchedule = baseSchedule