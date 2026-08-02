import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { characters } from '../data/characters'
import { compareCharacters } from '../utils/classicUtils'
import ClassicGrid from '../components/ClassicGrid'
import InputField from '../components/InputField'
import Suggestions from '../components/Suggestions'
import VictoryModal from '../components/VictoryModal'
import WinnerCard from '../components/WinnerCard'
import TopBar from '../components/TopBar'
import patchnotetext from '../data/classicPatchNote'
import ClassicHelp from '../components/ClassicHelp'
import { useStats } from '../hooks/useStats'
import StatsDisplay from '../components/StatsDisplay'
import ModeSwitcher from '../components/ModeSwitcher'
import { classicSchedule } from '../data/classicSchedule'


function ClassicPage() {
  //Set title
  useEffect(() => {
  document.title = 'Shadow Slave Dle | Classic'
}, [])

  //Reset `local` storage every day when a new character is selected
  const today = new Date().toISOString().slice(0, 10)
  const savedDate = localStorage.getItem('classic-date')

  if (savedDate !== null && savedDate !== today) {
    const wasWon = localStorage.getItem('classic-gameOver') === 'true'
    const guesses = JSON.parse(localStorage.getItem('classic-guessHistory') || '[]')

  //Check if more than 1 day has passed (missed a day)
    const savedMs = new Date(savedDate).getTime()
    const todayMs = new Date(today).getTime()
    const daysMissed = Math.floor((todayMs - savedMs) / 86400000)
    
    if (daysMissed > 1) {
      localStorage.setItem('classic-currentStreak', '0')
    } else if (!wasWon && guesses.length > 0) {
      const played = JSON.parse(localStorage.getItem('classic-gamesPlayed') || '0')
      const total = JSON.parse(localStorage.getItem('classic-totalGuesses') || '0')
      const guessCount = JSON.parse(localStorage.getItem('classic-guessCount') || '0')
      localStorage.setItem('classic-gamesPlayed', JSON.stringify(played + 1))
      localStorage.setItem('classic-totalGuesses', JSON.stringify(total + guessCount))
      localStorage.setItem('classic-currentStreak', '0')
    }


    localStorage.removeItem('classic-guessResults')
    localStorage.removeItem('classic-guessHistory')
    localStorage.removeItem('classic-gameOver')
  }
  
  localStorage.setItem('classic-date', today)

    //Initialize user stats that should not be reset each day.
  const { gamesPlayed, gamesWon, avgGuesses, winRate, currentStreak, maxStreak, recordWin } = useStats('classic')
  
  //Create mode constant that will be used to change page dependent content
  const MODE  = 'CLASSIC'

  const navigate = useNavigate()
  const characterNames = Object.keys(characters)

  //State variables to control the logic of the game

  const START_DATE = new Date("2026-07-21").getTime()

   //Find the character of the day
   const [todaysChar] = useState(() => {
     const today = new Date().toISOString().slice(0, 10)
     const todaysId = classicSchedule[today]

    if (todaysId) {
      return Object.entries(characters).find(([_, c]) => c.id === todaysId)?.[0]
    }
   })
  
  const [guess, setGuess] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [alreadyGuessed, setAlreadyGuessed] = useState(false)

  //Add local storage to guess results, guess history, and game over state so user can swap between pages.

  const [guessResults, setGuessResults] = useState(() => {
    const saved = localStorage.getItem('classic-guessResults')
    return saved ? JSON.parse(saved) : []
  })

  const [guessHistory, setGuessHistory] = useState(() => {
    const saved = localStorage.getItem('classic-guessHistory')
    return saved ? JSON.parse(saved) : []
  })

  const [gameOver, setGameOver] = useState(() => {
    return localStorage.getItem('classic-gameOver') === 'true'
  })

  //Sync effects
  useEffect(() => {
    localStorage.setItem('classic-guessResults', JSON.stringify(guessResults))
  }, [guessResults])

  useEffect(() => {
    localStorage.setItem('classic-guessHistory', JSON.stringify(guessHistory))
  }, [guessHistory])

  useEffect(() => {
    localStorage.setItem('classic-gameOver', gameOver)
  }, [gameOver])

  //State variable to control the visibility of victory modal
  const [showVictoryModal, setShowVictoryModal] = useState(false)  

  //Suggestions of characters beginning with user input
  const suggestions = characterNames.filter(name =>
    name.toLowerCase().startsWith(guess.toLowerCase()) &&
    !guessHistory.includes(name)
  )

  const hasSelectedCharacter = characterNames.some(name =>
    name.toLowerCase() === guess.toLowerCase()
  )

  //Function to check the guess of the user input
  function checkGuess(nameOverride) {
    //Name override is when the user selects a character instead of typing it fully themselves
    const submittedGuess = nameOverride ?? guess
    if (!characterNames.includes(submittedGuess)) {
      setNotFound(true)
      return
    }
    if (guessHistory.includes(submittedGuess)) {
      setAlreadyGuessed(true)
      return
    }
    setNotFound(false)
    setAlreadyGuessed(false)
    const result = compareCharacters(submittedGuess, todaysChar, characters)
    setGuessResults(prev => [result, ...prev])
    setGuessHistory(prev => [...prev, submittedGuess])
    setGuess('')

    if (submittedGuess === todaysChar) {
      recordWin(guessHistory.length + 1)
      setGameOver(true)
      setShowVictoryModal(true)
    } 
  }

  //Set guess using input field's value
  function handleChange(e) {
    setGuess(e.target.value)
    setNotFound(false)
    setAlreadyGuessed(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 gap-6">
      <button
        onClick={() => navigate('/')}
        className="self-start text-zinc-400 hover:text-white text-sm transition"
      >
        ← Back
      </button>
      {/** Main title of the game mode displayed at the top of the page */}
      <h1 className="font-mountain-king text-5xl font-bold tracking-widest text-white uppercase">
        Classic
      </h1>
      {/* Information on how updated the information used in the game is */}
      <div className='flex flex-col items-center justify-center'>
        <p className="text-zinc-400 font-mountain-king text-centertext-sm tracking-wide">Guess today's Shadow Slave character</p>
      </div>
       <div className="flex flex-row items-center justify-between px-6 py-3 border border-zinc-700 bg-zinc-900/60">
      {/* Bar containing navigation between game modes */}
            <ModeSwitcher />
        <div className="w-px h-8 bg-zinc-600 mx-2" />
      {/* Bar containing stat information, patch notes, help notes, and current streak */}
        <TopBar
          statsContent={<StatsDisplay
                        gamesPlayed={gamesPlayed}
                        gamesWon={gamesWon}
                        avgGuesses={avgGuesses}
                        winRate={winRate}
                        currentStreak={currentStreak}
                        maxStreak={maxStreak}
                      />}
          currentStreak={currentStreak}
          patchContent={patchnotetext}
          helpContent={
            <ClassicHelp />
          }
        />
      </div>
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
      <div className="w-full max-w-5xl bg-black/20 backdrop-blur-3xl border border-zinc-700 rounded-none shadow-2xl p-6 flex flex-col gap-4">
      <p className="text-zinc-400 font-mountain-king text-sm text-center italic tracking-wide">Data up until Volume 11/Chapter 3000</p>
        {!gameOver && (
          <div className="flex flex-col gap-2">
            {/*Display the input field and the auto-complete suggestions once a user has inputted text */}
            <InputField guess={guess} handleChange={handleChange} />
            {notFound && (
              <div className="w-full bg-red-900/80 border border-red-700 px-3 py-2 text-white text-sm text-center">
                No character found.
              </div>
            )}
            {alreadyGuessed && (
              <div className="w-full bg-yellow-900/80 border border-yellow-700 px-3 py-2 text-white text-sm text-center">
                You've already guessed that character.
              </div>
            )}
            {guess !== '' && !hasSelectedCharacter && suggestions.length > 0 && (
              <Suggestions
                suggestions={suggestions}
                setGuess={setGuess}
                checkGuess={checkGuess}
              />
            )}
            {/* Button to submit an answer */}
            <button
              onClick={() => checkGuess()}
              className="w-full py-2 rounded-none bg-zinc-900 hover:bg-zinc-700 text-white font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        )}
        
        {/* Display all previous guesses the user has chosen */}
        {guessResults.length > 0 && (
          <ClassicGrid guessResults={guessResults} />
        )}
        {/* Conditionally display winner card once the user found the correct character if the victory modal is not displayed */}
        {gameOver && !showVictoryModal && (
          <WinnerCard
            speaker={todaysChar}
            speakerImage={characters[todaysChar]?.image}
            totalGuesses={guessHistory.length}
            mode={MODE}
          />
        )}
      </div>
      {/* Display victory modal after the user guessed the correct character */}
      {showVictoryModal && (
        <VictoryModal
          speaker={todaysChar}
          speakerImage={characters[todaysChar]?.image}
          totalGuesses={guessHistory.length}
          onClose={() => setShowVictoryModal(false)}
          mode={MODE}
        />
      )}
    </div>
  )
}
export default ClassicPage