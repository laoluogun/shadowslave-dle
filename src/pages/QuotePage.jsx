import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import {quotes} from '../data/quotes'
import {characters} from '../data/characters'
import QuoteCard from '../components/QuoteCard'
import RecipientClue from '../components/RecipientClue'
import VolumeClue from '../components/VolumeClue'
import ClueButtons from '../components/ClueButtons'
import InputField from '../components/InputField'
import Suggestions from '../components/Suggestions'
import GuessHistory from '../components/GuessHistory'
import VictoryModal from '../components/VictoryModal'
import WinnerCard from '../components/WinnerCard'
import TopBar from '../components/TopBar'
import patchnotetext from '../data/quotePatchNote'
import QuoteHelp from '../components/QuoteHelp'
import { useStats } from '../hooks/useStats'
import StatsDisplay from '../components/StatsDisplay'
import ModeSwitcher from '../components/ModeSwitcher'
import {quoteSchedule} from '../data/quoteSchedule'

import talkIcon from '../assets/images/talk.png'
import bookIcon from '../assets/images/book.png'

function QuotePage() {
    //Set title
  useEffect(() => {
    document.title = 'Shadow Slave Dle | Quote'
  }, [])
    //Reset local storage every day when a new character is selected
   const today = new Date().toISOString().slice(0, 10)
   const savedDate = localStorage.getItem('quote-date')

  if (savedDate !== null && savedDate !== today) {
    const wasWon = localStorage.getItem('quote-gameOver') === 'true'
    const guesses = JSON.parse(localStorage.getItem('quote-guessHistory') || '[]')

    if (!wasWon && guesses.length > 0) {
      const played = JSON.parse(localStorage.getItem('quote-gamesPlayed') || '0')
      localStorage.setItem('quote-currentStreak', '0')
      localStorage.setItem('quote-gamesPlayed', JSON.stringify(played + 1))
    }

    localStorage.removeItem('quote-guessCount')
    localStorage.removeItem('quote-guessHistory')
    localStorage.removeItem('quote-gameOver')
  }
  localStorage.setItem('quote-date', today)  

  //Initialize user stats that should not be reset each day.
  const { gamesPlayed, gamesWon, avgGuesses, winRate, currentStreak, maxStreak, recordWin } = useStats('quote')
  
  //Create mode constant that will be used to change page dependent content
  const MODE  = 'QUOTE'
  //Create navigation to home page
  const navigate = useNavigate()

    //Find the quote of the day 
    const START_DATE = new Date('2026-07-25').getTime()
    const [currentQuote] = useState(() => {
      const today = new Date(new Date().toISOString().slice(0, 10)).getTime()
      const dayNumber = Math.floor((today - START_DATE) / 86400000)
      const todaysId = quoteSchedule[dayNumber % quoteSchedule.length]
      return quotes.find(f => f.id === todaysId)
    })
  

  //Extract the relevant information from the current quote
  const quote = currentQuote.quote
  const recipientName = currentQuote.recipient
  const recipientImage = characters[recipientName].image
  const volume = currentQuote.volume
  const chapter = currentQuote.chapter
  const speaker = currentQuote.speaker
  const quoteCharactersList = Object.keys(characters)
  const quoteClues = [
  { id: 'recipient', label: 'Recipient Clue', icon: talkIcon, unlockAt: 3 },
  { id: 'chapter', label: 'Chapter Clue', icon: bookIcon, unlockAt: 5 },
]

  //State variables for the game logic
  
  const [guess, setGuess] = useState('')
  const [notFound, setNotFound] = useState(false)

  //Add local storage to guess history, total guesses, and game over state so user can swap between pages without losing progress.

  const [guessHistory, setGuessHistory] = useState(() => {
    const saved = localStorage.getItem('quote-guessHistory')
    return saved ? JSON.parse(saved) : []
  })

    const [guessCount, setGuessCount] = useState(() => {
  return parseInt(localStorage.getItem('quote-guessCount') || '0')
  })

  const [gameOver, setGameOver] = useState(() => {
    return localStorage.getItem('quote-gameOver') === 'true'
  })

  //Sync effects
  useEffect(() => {
    localStorage.setItem('quote-guessHistory', JSON.stringify(guessHistory))
  }, [guessHistory])

  useEffect(() => {
  localStorage.setItem('quote-guessCount', JSON.stringify(guessCount))
  }, [guessCount])

  useEffect(() => {
    localStorage.setItem('quote-gameOver', gameOver)
  }, [gameOver])


  // State variables to control the visibility of recipient and chapter clues
  const [activeClue, setActiveClue] = useState(null) // null | 'recipient' | 'chapter'
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  

  function handleChange(e) {
    setGuess(e.target.value);
    setNotFound(false)
  }

  // Filter the character names based on the current guess for suggestions
  const suggestions = Object.keys(characters).filter(name =>
   name.toLowerCase().startsWith(guess.toLowerCase()) &&
   !guessHistory.includes(name)
  )

  // Check if the current guess matches any character name (case-insensitive)
  const hasSelectedCharacter = Object.keys(characters).some(name =>
    name.toLowerCase() === guess.toLowerCase()
  )

  // Function to check the user's guess against the speaker of the quote
  function checkGuess(nameOverride) {
    const submittedGuess = nameOverride ?? guess
    if (!quoteCharactersList.includes(submittedGuess)) {
      setNotFound(true)
      return
    }
    setNotFound(false)
    const newTotal = guessCount + 1
    setGuessCount(newTotal)
    setGuessHistory([...guessHistory, submittedGuess ])
    if (submittedGuess === speaker){
      recordWin(newTotal)
      setGameOver(true)
      setShowVictoryModal(true)
    }
    else {
      setGuess('')
    }
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
     <h1 className="font-mountain-king text-center text-5xl font-bold tracking-widest text-white">
        QUOTES
      </h1>
       <div className='flex flex-col items-center justify-center'>
        <p className="font-mountain-king text-zinc-400 text-sm tracking-wide">Guess today's Shadow Slave character</p>
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
          <QuoteHelp />
        }
      />
      </div>
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
      <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-xl min-w-md sm:min-w-lg bg-black/20 backdrop-blur-sm border border-zinc-700 rounded-none shadow-2xl p-8 flex flex-col gap-6">
        <div>
              <p className="text-zinc-400 font-mountain-king text-sm text-center italic tracking-wide">Data up until Chapter 3005</p>
              {/*Display the quote */}
              <QuoteCard quote={quote} />

              {/*Display the recipient's name and image after 2 guesses, and the volume and chapter after 3 guesses */}
              <ClueButtons 
                totalGuesses={guessCount} 
                setActiveClue={setActiveClue} 
                activeClue={activeClue}
                gameOver={gameOver}
                clues={quoteClues}
              />

              {/* Conditionally render the recipient clue and chapter clue based on the activeClue state */}
              
                <RecipientClue recipientName={recipientName} recipientImage={recipientImage} isActive={activeClue === 'recipient'} />

                <VolumeClue volume={volume} chapter={chapter} isActive={activeClue === 'chapter'} />
        </div>
        <div className="flex flex-col gap-2">
            {/*Input field for the user to type their guess, with styling for focus and placeholder text */}
              {gameOver == false && 
              <InputField guess={guess} handleChange={handleChange} />}
              {notFound && (
                <div className="w-full bg-red-900/80 border border-red-700 px-3 py-2 text-white text-sm text-center">
                  No character found.
                </div>
              )}
            {/* Display suggestions only if the guess is not empty and no character has been selected yet */}
            {
              guess !== '' && !hasSelectedCharacter && suggestions.length > 0 && 
              <Suggestions suggestions={suggestions} setGuess={setGuess} checkGuess={checkGuess} />
            }
            {/* Submit button to check the user's guess, only displayed if the game is not over */}
          </div>
            {gameOver == false && 
            <button onClick={ () => checkGuess()} className="w-full py-2 rounded-none bg-zinc-900 hover:bg-zinc-700 text-white font-semibold tracking-wide transition-colors cursor-pointer">
              Submit
            </button>}
          {/* Display the history of guesses in reverse order, with styling based on correctness */}
        <GuessHistory guessHistory={guessHistory} speaker={speaker} />
        {gameOver && !showVictoryModal && (
          <WinnerCard
            speaker={speaker}
            speakerImage={characters[speaker]?.image}
            totalGuesses={guessCount}
            mode={MODE}
          />
        )}
      </div>
    </div>
    {/** Display victory modal after successfully guessing quote speaker*/}
    {showVictoryModal && (
        <VictoryModal
          speaker={speaker}
          speakerImage={characters[speaker]?.image}
          totalGuesses={guessCount}
          onClose={() => setShowVictoryModal(false)}
          mode={MODE}
        />
      )}
   </div> 
  )
}


export default QuotePage
