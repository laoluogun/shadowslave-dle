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

    function getDailyIndex(arrayLength) {
    const today = new Date().toISOString().slice(0, 10) // "2026-06-30"
    let hash = 0
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash) % arrayLength
  }

  const [currentQuote] = useState(() => quotes[getDailyIndex(quotes.length)])

  const quote = currentQuote.quote
  const recipientName = currentQuote.recipient
  const recipientImage = characters[currentQuote.recipient].image
  const chapter = currentQuote.chapter
  const speaker = currentQuote.speaker
  
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [totalGuesses, setGuesses] = useState(0)
  const [guessHistory, setGuessHistory] = useState([])
  const [gameOver, setGameOver] = useState(false)
  

  function handleChange(e) {
    setGuess(e.target.value);
  }

  const suggestions = Object.keys(characters).filter(name =>
    name.toLowerCase().includes(guess.toLowerCase())
  )

  const hasSelectedCharacter = Object.keys(characters).some(name =>
    name.toLowerCase() === guess.toLowerCase()
  )

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
      SetGuess('')

    }
  }


  return (
    <>
    <div className="max-w-xl mx-auto p-6 font-sans">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
        <h2 className="text-sm uppercase text-gray-500 mb-2">Which character said this?</h2>
        <p className="text-lg italic">"{quote}"</p>
      </div>
      <div>
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-3 text-center">
          {totalGuesses >= 1 && (
            <>
              <p className="text-lg">{recipientName}</p> 
              <img src={recipientImage} alt={recipientName} className="w-24 h-24 object-cover rounded-md mx-auto"/>
            </>

            )
          }
          {
              totalGuesses >= 2 && 
              <p className="text-md">{chapter}</p>
            }
        </div>
      </div>
      <div class="w-full py-4 max-w-sm min-w-[200px]">
        <input value={guess} onChange={handleChange} class="p-4 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type your guess here..."/>
      </div>
        {guess !== '' && !hasSelectedCharacter && <ul className="border border-gray-200 rounded shadow-sm bg-white mt-1 max-h-40 overflow-y-auto">
        {suggestions.map((name, index) => (
          <li
            key={index}
            onClick={() => setGuess(name)}
            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
          >
            {name}
          </li>
             )
            )
          }
          </ul>
        }
      {gameOver == false && 
        <button onClick={ () => checkGuess()} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Submit
        </button>}
      <p className={`text-center font-semibold mt-4 ${
          feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
        }`}>
          {feedback}
        </p>
        <ol className="mt-4 space-y-1">
          {guessHistory.map((pastGuess, index) => (
            <li
              key={index}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded flex justify-between items-center"
            >
              <span>{pastGuess}</span>
              <span>{pastGuess === speaker ? '✅' : '❌'}</span>
            </li>
          ))}
        </ol>
    </div>
    </>
    
  )
}

export default App
