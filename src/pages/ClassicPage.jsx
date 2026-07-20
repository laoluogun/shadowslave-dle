import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { characters } from '../data/characters'
import { compareCharacters } from '../utils/classicUtils'
import ClassicGrid from '../components/ClassicGrid'
import InputField from '../components/InputField'
import Suggestions from '../components/Suggestions'
import Feedback from '../components/Feedback'
import VictoryModal from '../components/VictoryModal'
import WinnerCard from '../components/WinnerCard'
import TopBar from '../components/TopBar'
import patchnotetext from '../data/classicPatchNote'
import ClassicHelp from '../components/ClassicHelp'
import { useStats } from '../hooks/useStats'
import StatsDisplay from '../components/StatsDisplay'



//Function for choosing a new character daily
function getDailyIndex(arrayLength) {
  const start = new Date('2026-01-01').getTime() //Epoch
  const today = new Date(new Date().toISOString().slice(0, 10)).getTime()
  const dayNumber = Math.floor((today - start) / 86400000)

  let hash = dayNumber
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b
  hash = (hash >> 16) ^ hash

  return Math.abs(hash) % arrayLength
}

function ClassicPage() {
  //Reset `local` storage every day when a new character is selected
  const today = new Date().toISOString().slice(0, 10)
  const savedDate = localStorage.getItem('classic-date')

  if (savedDate !== null && savedDate !== today) {
    const wasWon = localStorage.getItem('classic-gameOver') === 'true'
    const guesses = JSON.parse(localStorage.getItem('classic-guessHistory') || '[]')

    if (!wasWon && guesses.length > 0) {
      const played = JSON.parse(localStorage.getItem('classic-gamesPlayed') || '0')
      localStorage.setItem('classic-currentStreak', '0')
      localStorage.setItem('classic-gamesPlayed', JSON.stringify(played + 1))
    }

    localStorage.removeItem('classic-guessResults')
    localStorage.removeItem('classic-guessHistory')
    localStorage.removeItem('classic-feedback')
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

  const [answer] = useState(() => characterNames[getDailyIndex(characterNames.length)])
  const [guess, setGuess] = useState('')

  //Add local storage to guess results, guess history, feedback message, and game over state so user can swap between pages.

  const [guessResults, setGuessResults] = useState(() => {
    const saved = localStorage.getItem('classic-guessResults')
    return saved ? JSON.parse(saved) : []
  })

  const [guessHistory, setGuessHistory] = useState(() => {
    const saved = localStorage.getItem('classic-guessHistory')
    return saved ? JSON.parse(saved) : []
  })

  const [feedback, setFeedback] = useState(() => {
    return localStorage.getItem('classic-feedback') || ''
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
    localStorage.setItem('classic-feedback', feedback)
  }, [feedback])

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
      setFeedback('Not found. Try again.')
      return
    }

    const result = compareCharacters(submittedGuess, answer, characters)
    setGuessResults(prev => [result, ...prev])
    setGuessHistory(prev => [...prev, submittedGuess])
    setGuess('')

    if (submittedGuess === answer) {
      recordWin(guessHistory.length + 1)
      setFeedback(`Correct! You found ${answer} in ${guessHistory.length + 1} guess${guessHistory.length !== 0 ? 'es' : ''}!`)
      setGameOver(true)
      setShowVictoryModal(true)
    } else {
      setFeedback('Try again!')
    }
  }

  //Set guess using input field's value
  function handleChange(e) {
    setGuess(e.target.value)
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
      <h1 className="font-mountain-king text-3xl font-bold tracking-widest text-white uppercase">
        Classic
      </h1>
      {/* Information on how updated the information used in the game is */}
      <div className='flex flex-col items-center justify-center'>
        <p className="text-zinc-400 font-mountain-king text-sm tracking-wide">Guess today's Shadow Slave character</p>
        <p className="text-zinc-400 font-mountain-king text-sm italic tracking-wide">Data up until Chapter 3005</p>
      </div>
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
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
      <div className="w-full max-w-5xl bg-black/20 backdrop-blur-3xl border border-zinc-700 rounded-none shadow-2xl p-6 flex flex-col gap-4">
        {!gameOver && (
          <div className="flex flex-col gap-2">
            {/*Display the input field and the auto-complete suggestions once a user has inputted text */}
            <InputField guess={guess} handleChange={handleChange} />
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
            speaker={answer}
            speakerImage={characters[answer]?.image}
            totalGuesses={guessHistory.length}
            mode={MODE}
          />
        )}
      </div>
      {/* Display victory modal after the user guessed the correct character */}
      {showVictoryModal && (
        <VictoryModal
          speaker={answer}
          speakerImage={characters[answer]?.image}
          totalGuesses={guessHistory.length}
          onClose={() => setShowVictoryModal(false)}
          mode={MODE}
        />
      )}
    </div>
  )
}
export default ClassicPage