import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {quotes} from './data/quotes'
import {characters} from './data/characters'

import QuoteCard from './QuoteCard'
import RecipientClue from './RecipientClue'
import VolumeClue from './VolumeClue'

function App() {

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
  
  //State variables for the game logic
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [totalGuesses, setGuesses] = useState(0)
  const [guessHistory, setGuessHistory] = useState([])
  const [gameOver, setGameOver] = useState(false)
  

  function handleChange(e) {
    setGuess(e.target.value);
  }

  // Filter the character names based on the current guess for suggestions
  const suggestions = Object.keys(characters).filter(name =>
   name.toLowerCase().startsWith(guess.toLowerCase())
  )

  // Check if the current guess matches any character name (case-insensitive)
  const hasSelectedCharacter = Object.keys(characters).some(name =>
    name.toLowerCase() === guess.toLowerCase()
  )

  // Function to check the user's guess against the speaker of the quote
  function checkGuess() {
    const newTotal = totalGuesses + 1
    setGuesses(newTotal)
    setGuessHistory([...guessHistory, guess ])
    if (guess === speaker){
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

     <h1 className="text-center text-3xl font-bold tracking-widest text-white uppercase">
        Shadow Slave Dle
      </h1>
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-black/75 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
      <>
        <div>
              {/*Display the quote */}
              <div className="bg-transparent rounded-lg shadow-md p-6 mb-6 text-center">
                <h2 className="text-sm uppercase text-gray-500 mb-2">Which character said this?</h2>
                <p className="text-lg text-white italic">❝ {quote} ❞</p>
              </div>

              {/*Display the recipient's name and image after 2 guesses, and the volume and chapter after 3 guesses */}
              {totalGuesses >= 2 && <div className="bg-gray-800/80 border border-gray-600 rounded-xl p-4 text-center text-white">
                
                {totalGuesses >= 2 && (
                  <>
                    <p className="text-lg">{recipientName}</p>
                    <img src={recipientImage} alt={recipientName} className="w-24 h-24 object-cover rounded-md mx-auto" />
                  </>

                )}
                {totalGuesses >= 3 &&
                  <p className="text-md">{volume} - {chapter}</p>
                }
              </div>}
            </div>
            {/*Input field for the user to type their guess, with styling for focus and placeholder text */}
                <input 
                  value={guess} 
                  onChange={handleChange}
                  className="w-full bg-gray-800/80 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition"
                  placeholder="Type your guess here..."
                />
            </>
            {/* Display suggestions only if the guess is not empty and no character has been selected yet */}
        {
          guess !== '' && !hasSelectedCharacter && 
          <ul className="border border-gray-600 rounded-lg bg-gray-800 mt-1 max-h-40 overflow-y-auto">
              {
                suggestions.map((name, index) => (
                <li key={index} onClick={() => setGuess(name)} className="px-3 py-2 cursor-pointer hover:bg-gray-700 text-white">
                  {name}
                </li>
              )
            ) 
          }
        </ul>
        }
        {/* Submit button to check the user's guess, only displayed if the game is not over */}
      {gameOver == false && 
        <button onClick={ () => checkGuess()} className="w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-700 text-white font-semibold tracking-wide transition-colors">
          Submit
        </button>}
        {/* Display feedback to the user based on their guess, with color indicating correctness */}
      <p className={`text-center font-semibold mt-4 ${
          feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
        }`}>
          {feedback}
        </p>
        <ol className="mt-4 space-y-1">
          {guessHistory.map((pastGuess, index) => (
            <li
              key={index}
              className="px-3 py-2 bg-gray-800/80 border border-gray-600 rounded-lg flex justify-between items-center text-white">
              <span>{pastGuess}</span>
              <span>{pastGuess === speaker ? '✅' : '❌'}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
    </>
    
  )
}

export default App
