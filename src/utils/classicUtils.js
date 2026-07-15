import { rankOrder } from '../data/rankOrder'

export function compareGender(guess, answer) {
  return guess === answer ? 'correct' : 'incorrect'
}

export function compareRace(guess, answer) {
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

function getRankTier(rank) {
  return rankOrder.findIndex(group => group.includes(rank))
}

export function compareRank(guessRank, answerRank) {
  const guessIndex = getRankTier(guessRank)
  const answerIndex = getRankTier(answerRank)
  if (guessIndex === answerIndex) 
    if (guessRank != answerRank) return 'partial'
    else return 'correct'
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
    race: compareRace(guess.race, answer.race),
    affiliations: compareAffiliations(guess.affiliations, answer.affiliations),
    currentRank: compareRank(guess.currentRank, answer.currentRank),
    hasTrueName: compareTrueName(guess.hasTrueName, answer.hasTrueName),
    debutVolume: compareDebutVolume(guess.debutVolume, answer.debutVolume),
    genderValue: guess.gender,
    raceValue: guess.race,
    affiliationsValue: guess.affiliations,
    currentRankValue: guess.currentRank,
    hasTrueNameValue: guess.hasTrueName,
    debutVolumeValue: guess.debutVolume,
  }
}