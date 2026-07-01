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
  const volume = currentQuote.volume
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
   name.toLowerCase().startsWith(guess.toLowerCase())
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
     <h1 className="text-center text-3xl font-bold tracking-widest text-white uppercase">
        Shadow Slave Dle
      </h1>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-black/75 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
      <>
      <div>
              <div className="bg-transparent rounded-lg shadow-md p-6 mb-6 text-center">
                <h2 className="text-sm uppercase text-gray-500 mb-2">Which character said this?</h2>
                <p className="text-lg text-white italic">❝ {quote} ❞</p>
              </div>
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
                <input 
                  value={guess} 
                  onChange={handleChange}
                  className="w-full bg-gray-800/80 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition"
                  placeholder="Type your guess here..."
                />
            </>
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
      {gameOver == false && 
        <button onClick={ () => checkGuess()} className="w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-700 text-white font-semibold tracking-wide transition-colors">
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
