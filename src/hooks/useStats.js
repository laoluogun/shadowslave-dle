import { useState } from 'react'

export function useStats(prefix) {
  const load = (key, fallback) => {
    const saved = localStorage.getItem(`${prefix}-${key}`)
    return saved !== null ? JSON.parse(saved) : fallback
  }

  //State variables describing statistics of user
  const [gamesPlayed, setGamesPlayed] = useState(() => load('gamesPlayed', 0))
  const [gamesWon, setGamesWon] = useState(() => load('gamesWon', 0))
  const [totalGuesses, setTotalGuesses] = useState(() => load('totalGuesses', 0))
  const [currentStreak, setCurrentStreak] = useState(() => load('currentStreak', 0))
  const [maxStreak, setMaxStreak] = useState(() => load('maxStreak', 0))

  function recordWin(guessCount) {
    const newPlayed = gamesPlayed + 1
    const newWon = gamesWon + 1
    const newTotal = totalGuesses + guessCount
    const newStreak = currentStreak + 1
    const newMax = Math.max(maxStreak, newStreak)

    setGamesPlayed(newPlayed)
    setGamesWon(newWon)
    setTotalGuesses(newTotal)
    setCurrentStreak(newStreak)
    setMaxStreak(newMax)

    //Store variables in local memory 
    localStorage.setItem(`${prefix}-gamesPlayed`, JSON.stringify(newPlayed))
    localStorage.setItem(`${prefix}-gamesWon`, JSON.stringify(newWon))
    localStorage.setItem(`${prefix}-totalGuesses`, JSON.stringify(newTotal))
    localStorage.setItem(`${prefix}-currentStreak`, JSON.stringify(newStreak))
    localStorage.setItem(`${prefix}-maxStreak`, JSON.stringify(newMax))
  }

  function recordLoss() {
    const newPlayed = gamesPlayed + 1
    setGamesPlayed(newPlayed)
    setCurrentStreak(0)
    localStorage.setItem(`${prefix}-gamesPlayed`, JSON.stringify(newPlayed))
    localStorage.setItem(`${prefix}-currentStreak`, JSON.stringify(0))
  }

  const avgGuesses = gamesWon > 0 ? (totalGuesses / gamesWon).toFixed(1) : '—'
  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0

  return { gamesPlayed, gamesWon, avgGuesses, winRate, currentStreak, maxStreak, recordWin, recordLoss }
}