import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {quotes} from './data/quotes'

import QuoteCard from './QuoteCard'
import RecipientClue from './RecipientClue'
import VolumeClue from './VolumeClue'

function App() {

  const characterList = ["Sunless", "Nephis", "Cassie", "Jet", "Kai", "Effie"]

  const [currentQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])

  const todaysQuote = currentQuote.quote
  const todaysRecipientName = currentQuote.recipient
  const todaysVolume = currentQuote.chapter
  const todaysChar = currentQuote.speaker
  
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [totalGuesses, setGuesses] = useState(0)
  const [guessHistory, setGuessHistory] = useState([])
  const [gameOver, setGameOver] = useState(false)
  

  function handleChange(e) {
    setGuess(e.target.value);
  }

  const suggestions = characterList.filter(name =>
    name.toLowerCase().includes(guess.toLowerCase())
  )

  const hasSelectedCharacter = characterList.some(name =>
    name.toLowerCase() === guess.toLowerCase()
  )

  function checkGuess() {
    const newTotal = totalGuesses + 1
    setGuesses(newTotal)
    setGuessHistory([...guessHistory, guess ])
    if (guess === todaysChar){
      setFeedback('Correct! Total Guesses: ' + newTotal)
      setGameOver(true)
    }
    else {
      setFeedback('Try Again! Current Guesses: ' + newTotal)
      SetGuess('')

    }
  }


  return (
    <><div>
      <QuoteCard quote={todaysQuote} />
    </div>
    <div>
      {totalGuesses >= 1 && <RecipientClue recipientName={todaysRecipientName} recipientImg={heroImg} />}
      {totalGuesses >= 2 && <VolumeClue volume={todaysVolume} />}
    </div>
    <input value={guess} onChange={handleChange}/>
    <ul>
      {guess !== '' && !hasSelectedCharacter && suggestions.map((name, index) => (
        <li key={index} onClick={() => setGuess(name)}>{name}</li>
      ))}
    </ul>
    {gameOver == false && <button onClick={ () => checkGuess()}> Submit</button>}
    <p>{feedback}</p>
    <ol>
    {guessHistory.map(
      (pastGuess, index) => (
          <li key={index}>{pastGuess}</li>
        )
      )
    }
    </ol>
    </>
    
  )
}

export default App
