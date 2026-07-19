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
import Feedback from '../components/Feedback'
import VictoryModal from '../components/VictoryModal'
import WinnerCard from '../components/WinnerCard'
import TopBar from '../components/TopBar'
import patchnotetext from '../data/quotePatchNote'
import QuoteHelp from '../components/QuoteHelp'
import { useStats } from '../hooks/useStats'
import StatsDisplay from '../components/StatsDisplay'


//Daily index logic to select a quote based on the current date

    function getDailyIndex(arrayLength) {
    const today = new Date().toISOString().slice(0, 10) // "2026-06-30"
    let hash = 0
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash) % arrayLength
  }

function QuotePage() {

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
    localStorage.removeItem('quote-feedback')
    localStorage.removeItem('quote-gameOver')
  }
  localStorage.setItem('quote-date', today)  
  
  //Initialize user stats that should not be reset each day.
  const { gamesPlayed, gamesWon, avgGuesses, winRate, currentStreak, maxStreak, recordWin } = useStats('quote')

  //Create navigation to home page
  const navigate = useNavigate()

  //Find the quote of the day based on the daily index
  const [currentQuote] = useState(() => quotes[getDailyIndex(quotes.length)])
  

  //Extract the relevant information from the current quote
  const quote = currentQuote.quote
  const recipientName = currentQuote.recipient
  const recipientImage = characters[recipientName].image
  const volume = currentQuote.volume
  const chapter = currentQuote.chapter
  const speaker = currentQuote.speaker
  const quoteCharactersList = Object.keys(characters)
  
  //State variables for the game logic
  
  const [guess, setGuess] = useState('')

  //Add local storage to guess history, total guesses, feedback message, and game over state so user can swap between pages without losing progress.

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

    const [feedback, setFeedback] = useState(() => {
    return localStorage.getItem('quote-feedback') || ''
  })

  //Sync effects
  useEffect(() => {
    localStorage.setItem('quote-guessHistory', JSON.stringify(guessHistory))
  }, [guessHistory])

  useEffect(() => {
  localStorage.setItem('quote-guessCount', JSON.stringify(guessCount))
  }, [guessCount])

  useEffect(() => {
    localStorage.setItem('quote-feedback', feedback)
  }, [feedback])

  useEffect(() => {
    localStorage.setItem('quote-gameOver', gameOver)
  }, [gameOver])


  // State variables to control the visibility of recipient and chapter clues
  const [activeClue, setActiveClue] = useState(null) // null | 'recipient' | 'chapter'
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  

  function handleChange(e) {
    setGuess(e.target.value);
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
      setFeedback('Not found. Try again.')
      return
    }
    const newTotal = guessCount + 1
    setGuessCount(newTotal)
    setGuessHistory([...guessHistory, submittedGuess ])
    if (submittedGuess === speaker){
      recordWin(newTotal)
      setFeedback('Correct! Total Guesses: ' + newTotal)
      setGameOver(true)
      setShowVictoryModal(true)
    }
    else {
      setFeedback('Try Again! Current Guesses: ' + newTotal)
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
     <h1 className="font-mountain-king text-center text-3xl font-bold tracking-widest text-white">
        QUOTES
      </h1>
       <div className='flex flex-col items-center justify-center'>
        <p className="font-mountain-king text-zinc-400 text-sm tracking-wide">Guess today's Shadow Slave character</p>
        <p className="font-mountain-king text-zinc-400 text-sm italic tracking-wide">Data up until Chapter 3005</p>
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
        helpContent={<QuoteHelp />}/>
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
      <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-black/20 backdrop-blur-sm border border-zinc-700 rounded-none shadow-2xl p-8 flex flex-col gap-6">
        <div>
              {/*Display the quote */}
              <QuoteCard quote={quote} />

              {/*Display the recipient's name and image after 2 guesses, and the volume and chapter after 3 guesses */}
              <ClueButtons 
                totalGuesses={guessCount} 
                setActiveClue={setActiveClue} 
                activeClue={activeClue} 
              />

              {/* Conditionally render the recipient clue and chapter clue based on the activeClue state */}
              {activeClue === 'recipient' && (
                <RecipientClue recipientName={recipientName} recipientImage={recipientImage} />
              )}

              {activeClue === 'chapter' && (
                <VolumeClue volume={volume} chapter={chapter} />
              )}
        </div>
        <div className="flex flex-col gap-2">
            {/*Input field for the user to type their guess, with styling for focus and placeholder text */}
              {gameOver == false && 
              <InputField guess={guess} handleChange={handleChange} />}
    
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
        {/* Display feedback to the user based on their guess, with color indicating correctness */}
          <Feedback feedback={feedback} />
          {/* Display the history of guesses in reverse order, with styling based on correctness */}
        <GuessHistory guessHistory={guessHistory} speaker={speaker} />
        {gameOver && !showVictoryModal && (
          <WinnerCard
            speaker={speaker}
            speakerImage={characters[speaker]?.image}
            totalGuesses={guessCount}
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
        />
      )}
   </div> 
  )
}


export default QuotePage
