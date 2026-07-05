import { rankOrder } from '../data/rankOrder'

export function compareGender(guess, answer) {
  return guess === answer ? 'correct' : 'incorrect'
}

export function compareAffiliations(guessAffiliations, answerAffiliations) {
  const guessSet = new Set(guessAffiliations)
  const answerSet = new Set(answerAffiliations)
  const isExact = guessAffiliations.length === answerAffiliations.length &&
    [...answerSet].every(a => guessSet.has(a))
  const hasOverlap = [...answerSet].some(a => guessSet.has(a))
  if (isExact) return 'correct'
  if (hasOverlap) return 'partial'
  return 'incorrect'
}

export function compareRank(guessRank, answerRank) {
  const guessIndex = rankOrder.indexOf(guessRank)
  const answerIndex = rankOrder.indexOf(answerRank)
  if (guessIndex === answerIndex) return 'correct'
  if (guessIndex < answerIndex) return 'higher'
  return 'lower'
}

export function compareTrueName(guess, answer) {
  return guess === answer ? 'correct' : 'incorrect'
}

export function compareDebutVolume(guess, answer) {
  if (guess === answer) return 'correct'
  const guessNum = parseInt(guess.match(/\d+/)?.[0])
  const answerNum = parseInt(answer.match(/\d+/)?.[0])
  if (guessNum < answerNum) return 'higher'
  return 'lower'
}

export function compareCharacters(guessName, answerName, classicCharacters) {
  const guess = classicCharacters[guessName]
  const answer = classicCharacters[answerName]
  return {
    name: guessName,
    image: guess.image,
    gender: compareGender(guess.gender, answer.gender),
    affiliations: compareAffiliations(guess.affiliations, answer.affiliations),
    currentRank: compareRank(guess.currentRank, answer.currentRank),
    hasTrueName: compareTrueName(guess.hasTrueName, answer.hasTrueName),
    debutVolume: compareDebutVolume(guess.debutVolume, answer.debutVolume),
    genderValue: guess.gender,
    affiliationsValue: guess.affiliations,
    currentRankValue: guess.currentRank,
    hasTrueNameValue: guess.hasTrueName,
    debutVolumeValue: guess.debutVolume,
  }
}