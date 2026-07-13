import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { classicCharacters } from '../data/classicCharacters'
import { compareCharacters } from '../utils/classicUtils'
import ClassicGrid from '../components/ClassicGrid'
import InputField from '../components/InputField'
import Suggestions from '../components/Suggestions'
import Feedback from '../components/Feedback'
import VictoryModal from '../components/VictoryModal'
import WinnerCard from '../components/WinnerCard'

function getDailyIndex(arrayLength) {
  const today = new Date().toISOString().slice(0, 10)
  let hash = 0
  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % arrayLength
}

function ClassicPage() {
  const navigate = useNavigate()
  const characterNames = Object.keys(classicCharacters)

  const [answer] = useState(() => characterNames[getDailyIndex(characterNames.length)])
  const [guess, setGuess] = useState('')
  const [guessResults, setGuessResults] = useState([])
  const [guessHistory, setGuessHistory] = useState([])
  const [feedback, setFeedback] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [showVictoryModal, setShowVictoryModal] = useState(false)  

  const suggestions = characterNames.filter(name =>
    name.toLowerCase().startsWith(guess.toLowerCase()) &&
    !guessHistory.includes(name)
  )

  const hasSelectedCharacter = characterNames.some(name =>
    name.toLowerCase() === guess.toLowerCase()
  )

  function checkGuess(nameOverride) {
    const submittedGuess = nameOverride ?? guess
    if (!characterNames.includes(submittedGuess)) {
      setFeedback('Not found. Try again.')
      return
    }

    const result = compareCharacters(submittedGuess, answer, classicCharacters)
    setGuessResults(prev => [result, ...prev])
    setGuessHistory(prev => [...prev, submittedGuess])
    setGuess('')

    if (submittedGuess === answer) {
      setFeedback(`Correct! You found ${answer} in ${guessHistory.length + 1} guess${guessHistory.length !== 0 ? 'es' : ''}!`)
      setGameOver(true)
      setShowVictoryModal(true)
    } else {
      setFeedback('Try again!')
    }
  }

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

      <h1 className="font-mountain-king text-3xl font-bold tracking-widest text-white uppercase">
        Classic
      </h1>
      <div className='flex flex-col items-center justify-center'>
        <p className="text-zinc-400 font-mountain-king text-sm tracking-wide">Guess today's Shadow Slave character</p>
        <p className="text-zinc-400 font-mountain-king text-sm italic tracking-wide">Data up until Chapter 3005</p>
      </div>
      <div className="w-full max-w-4xl bg-black/20 backdrop-blur-sm border border-zinc-700 rounded-none shadow-2xl p-6 flex flex-col gap-4">
        {!gameOver && (
          <div className="flex flex-col gap-2">
            <InputField guess={guess} handleChange={handleChange} />
            {guess !== '' && !hasSelectedCharacter && suggestions.length > 0 && (
              <Suggestions
                suggestions={suggestions}
                setGuess={setGuess}
                checkGuess={checkGuess}
              />
            )}
            <button
              onClick={() => checkGuess()}
              className="w-full py-2 rounded-none bg-zinc-900 hover:bg-zinc-700 text-white font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        )}

        <Feedback feedback={feedback} />
        
        {guessResults.length > 0 && (
          <ClassicGrid guessResults={guessResults} />
        )}
        {gameOver && !showVictoryModal && (
          <WinnerCard
            speaker={answer}
            speakerImage={classicCharacters[answer]?.image}
            totalGuesses={guessHistory.length}
          />
        )}
      </div>
      {showVictoryModal && (
        <VictoryModal
          speaker={answer}
          speakerImage={classicCharacters[answer]?.image}
          totalGuesses={guessHistory.length}
          onClose={() => setShowVictoryModal(false)}
        />
      )}
    </div>
  )
}
export default ClassicPage