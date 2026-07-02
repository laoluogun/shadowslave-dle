import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {quotes} from './data/quotes'
import {characters} from './data/characters'

import QuoteCard from './QuoteCard'
import RecipientClue from './RecipientClue'
import VolumeClue from './VolumeClue'
import ClueButtons from './ClueButtons'
import InputField from './InputField'
import Suggestions from './Suggestions'

function App() {

  //Preload images for all characters to ensure they display quickly when needed
  useEffect(() => {
    Object.values(characters).forEach(character => {
      const img = new Image()
      img.src = character.image
    })
  }, [])

  //Daily index logic to select a quote based on the current date

    function getDailyIndex(arrayLength) {
    const today = new Date().toISOString().slice(0, 10) // "2026-06-30"
    let hash = 0
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash) % arrayLength
  }

  //Find the quote of the day based on the daily index
  const [currentQuote] = useState(() => quotes[getDailyIndex(quotes.length)])
  

  //Extract the relevant information from the current quote
  const quote = currentQuote.quote
  const recipientName = currentQuote.recipient
  const recipientImage = characters[currentQuote.recipient].image
  const volume = currentQuote.volume
  const chapter = currentQuote.chapter
  const speaker = currentQuote.speaker
  const charactersList = Object.keys(characters)
  
  //State variables for the game logic
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [totalGuesses, setGuesses] = useState(0)
  const [guessHistory, setGuessHistory] = useState([])
  const [gameOver, setGameOver] = useState(false)

  // State variables to control the visibility of recipient and chapter clues
  const [recipientRevealed, setRecipientRevealed] = useState(false)
  const [chapterRevealed, setChapterRevealed] = useState(false)
  const [activeClue, setActiveClue] = useState(null) // null | 'recipient' | 'chapter'
  

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
    if (!charactersList.includes(submittedGuess)) {
      setFeedback('Not found. Try again.')
      return
    }
    const newTotal = totalGuesses + 1
    setGuesses(newTotal)
    setGuessHistory([...guessHistory, submittedGuess ])
    if (submittedGuess === speaker){
      setFeedback('Correct! Total Guesses: ' + newTotal)
      setGameOver(true)
    }
    else {
      setFeedback('Try Again! Current Guesses: ' + newTotal)
      setGuess('')

    }
  }


  return (
    <> 
      {/** Main title of the game displayed at the top of the page */}
     <h1 className="text-center text-3xl font-bold tracking-widest text-white">
        Shadow Slave-dle
      </h1>
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
      <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-black/20 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
      <>
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
            {/*Input field for the user to type their guess, with styling for focus and placeholder text */}
              <InputField guess={guess} handleChange={handleChange} />
            </>
            {/* Display suggestions only if the guess is not empty and no character has been selected yet */}
        {
          guess !== '' && !hasSelectedCharacter && suggestions.length > 0 && 
          <Suggestions suggestions={suggestions} setGuess={setGuess} checkGuess={checkGuess} />
        }
        {/* Submit button to check the user's guess, only displayed if the game is not over */}
      {gameOver == false && 
        <button onClick={ () => checkGuess()} className="w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-700 text-white font-semibold tracking-wide transition-colors">
          Submit
        </button>}
        {/* Display feedback to the user based on their guess, with color indicating correctness */}
          {feedback && (
            <p className={`text-center font-semibold ${
              feedback.includes('Correct') ? 'text-green-700' : 'text-red-700'
            }`}>
              {feedback}
            </p>
          )}
        <ol className="mt-4 space-y-2 ">
          {/* Display the history of guesses in reverse order, with styling based on correctness */}
          {[...guessHistory].reverse().map((pastGuess, index) => (
                <li
                  key={index}
                  className={`px-3 py-2 border rounded-lg flex flex-col items-center justify-between text-white
                    ${pastGuess === speaker 
                      ? 'bg-green-800/80 border-green-600' 
                      : 'bg-red-900/80 border-red-700'}`}
                >  
                <div className="flex gap-2 ">
                  <img src={characters[pastGuess]?.image} 
                  alt={pastGuess} 
                  className="w-14 h-14 object-cover rounded-xs" />
                </div>
              <span>{pastGuess}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
    </>
    
  )
}


export default App
