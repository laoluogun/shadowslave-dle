import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import {quotes} from '../data/quotes'
import {quoteCharacters} from '../data/quoteCharacters'

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

  //Create navigation to home page
  const navigate = useNavigate()

  //Find the quote of the day based on the daily index
  const [currentQuote] = useState(() => quotes[getDailyIndex(quotes.length)])
  

  //Extract the relevant information from the current quote
  const quote = currentQuote.quote
  const recipientName = currentQuote.recipient
  const recipientImage = quoteCharacters[currentQuote.recipient].image
  const volume = currentQuote.volume
  const chapter = currentQuote.chapter
  const speaker = currentQuote.speaker
  const quoteCharactersList = Object.keys(quoteCharacters)
  
  //State variables for the game logic
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [totalGuesses, setGuesses] = useState(0)
  const [guessHistory, setGuessHistory] = useState([])
  const [gameOver, setGameOver] = useState(false)

  // State variables to control the visibility of recipient and chapter clues
  const [activeClue, setActiveClue] = useState(null) // null | 'recipient' | 'chapter'
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  

  function handleChange(e) {
    setGuess(e.target.value);
  }

  // Filter the character names based on the current guess for suggestions
  const suggestions = Object.keys(quoteCharacters).filter(name =>
   name.toLowerCase().startsWith(guess.toLowerCase()) &&
   !guessHistory.includes(name)
  )

  // Check if the current guess matches any character name (case-insensitive)
  const hasSelectedCharacter = Object.keys(quoteCharacters).some(name =>
    name.toLowerCase() === guess.toLowerCase()
  )

  // Function to check the user's guess against the speaker of the quote
  function checkGuess(nameOverride) {
    const submittedGuess = nameOverride ?? guess
    if (!quoteCharactersList.includes(submittedGuess)) {
      setFeedback('Not found. Try again.')
      return
    }
    const newTotal = totalGuesses + 1
    setGuesses(newTotal)
    setGuessHistory([...guessHistory, submittedGuess ])
    if (submittedGuess === speaker){
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
      {/** Main title of the game displayed at the top of the page */}
     <h1 className="text-center text-3xl font-bold tracking-widest text-white">
        QUOTES
      </h1>
       <div className='flex flex-col items-center justify-center'>
        <p className="text-zinc-400 text-sm tracking-wide">Guess today's Shadow Slave character</p>
        <p className="text-zinc-400 text-sm italic tracking-wide">Data up until Chapter 3005</p>
      </div>
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
      <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-black/20 backdrop-blur-sm border border-zinc-700 rounded-none shadow-2xl p-8 flex flex-col gap-6">
        <div>
              {/*Display the quote */}
              <QuoteCard quote={quote} />

              {/*Display the recipient's name and image after 2 guesses, and the volume and chapter after 3 guesses */}
              <ClueButtons 
                totalGuesses={totalGuesses} 
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
            speakerImage={quoteCharacters[speaker]?.image}
            totalGuesses={totalGuesses}
          />
        )}
      </div>
    </div>
    {showVictoryModal && (
        <VictoryModal
          speaker={speaker}
          speakerImage={quoteCharacters[speaker]?.image}
          totalGuesses={totalGuesses}
          onClose={() => setShowVictoryModal(false)}
        />
      )}
   </div> 
  )
}


export default QuotePage
