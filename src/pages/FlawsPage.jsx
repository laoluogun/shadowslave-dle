import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import {flaws} from '../data/flaws'
import {characters} from '../data/characters'
import FlawCard from '../components/FlawCard'
import ClueButtons from '../components/ClueButtons'
import RankClue from '../components/RankClue'
import TrueNameClue from '../components/TrueNameClue'
import InputField from '../components/InputField'
import Suggestions from '../components/Suggestions'
import GuessHistory from '../components/GuessHistory'
import Feedback from '../components/Feedback'
import VictoryModal from '../components/VictoryModal'
import WinnerCard from '../components/WinnerCard'
import TopBar from '../components/TopBar'
import patchnotetext from '../data/flawPatchNote'
import FlawHelp from '../components/FlawHelp'
import { useStats } from '../hooks/useStats'
import StatsDisplay from '../components/StatsDisplay'


import signatureIcon from '../assets/images/signature.png'
import rankIcon from '../assets/images/ranking.png'


//Daily index logic to select a flaw based on the current date

function getDailyIndex(arrayLength) {
  const start = new Date('2026-01-01').getTime()
  const today = new Date(new Date().toISOString().slice(0, 10)).getTime()
  const dayNumber = Math.floor((today - start) / 86400000)

  let hash = dayNumber
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b
  hash = (hash >> 16) ^ hash

  return Math.abs(hash) % arrayLength
}

function FlawsPage() {

    //Reset local storage every day when a new character is selected
   const today = new Date().toISOString().slice(0, 10)
   const savedDate = localStorage.getItem('flaw-date')

  if (savedDate !== null && savedDate !== today) {
    const wasWon = localStorage.getItem('flaw-gameOver') === 'true'
    const guesses = JSON.parse(localStorage.getItem('flaw-guessHistory') || '[]')

    if (!wasWon && guesses.length > 0) {
      const played = JSON.parse(localStorage.getItem('flaw-gamesPlayed') || '0')
      localStorage.setItem('flaw-currentStreak', '0')
      localStorage.setItem('flaw-gamesPlayed', JSON.stringify(played + 1))
    }

    localStorage.removeItem('flaw-guessCount')
    localStorage.removeItem('flaw-guessHistory')
    localStorage.removeItem('flaw-feedback')
    localStorage.removeItem('flaw-gameOver')
  }
  localStorage.setItem('flaw-date', today)  

  //Initialize user stats that should not be reset each day.
  const { gamesPlayed, gamesWon, avgGuesses, winRate, currentStreak, maxStreak, recordWin } = useStats('flaw')
  
  //Create mode constant that will be used to change page dependent content
  const MODE  = 'FLAW'

  const navigate = useNavigate()

  //Find the flaw of the day based on the daily index
  const [currentFlaw] = useState(() => flaws[getDailyIndex(flaws.length)])
  
  //Extract the relevant information from the current flaw
  const flaw = currentFlaw.flaw
  const character = currentFlaw.character
  const characterImage = characters[character].image
  const flawCharacterList = Object.keys(characters)
  const flawClues = [
  { id: 'trueName', label: 'True Name Clue', icon: signatureIcon, unlockAt: 3 },
  { id: 'rank', label: 'Rank Clue', icon: rankIcon, unlockAt: 5 },
]
  //State variables for the game logic
  
  const [guess, setGuess] = useState('')

  //Add local storage to guess history, total guesses, feedback message, and game over state so user can swap between pages without losing progress.

  const [guessHistory, setGuessHistory] = useState(() => {
    const saved = localStorage.getItem('flaw-guessHistory')
    return saved ? JSON.parse(saved) : []
  })

    const [guessCount, setGuessCount] = useState(() => {
  return parseInt(localStorage.getItem('flaw-guessCount') || '0')
  })
  

  const [gameOver, setGameOver] = useState(() => {
    return localStorage.getItem('flaw-gameOver') === 'true'
  })

  const [feedback, setFeedback] = useState(() => {
    return localStorage.getItem('flaw-feedback') || ''
  })

  //Sync effects
  useEffect(() => {
    localStorage.setItem('flaw-guessHistory', JSON.stringify(guessHistory))
  }, [guessHistory])

  useEffect(() => {
  localStorage.setItem('flaw-guessCount', JSON.stringify(guessCount))
  }, [guessCount])

  useEffect(() => {
    localStorage.setItem('flaw-gameOver', gameOver)
  }, [gameOver])

    useEffect(() => {
    localStorage.setItem('flaw-feedback', feedback)
  }, [feedback])


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

  // Function to check the user's guess against the current flaw's holder
  function checkGuess(nameOverride) {
    const submittedGuess = nameOverride ?? guess
    if (!flawCharacterList.includes(submittedGuess)) {
      setFeedback('Not found. Try again.')
      return
    }
    const newTotal = guessCount + 1
    setGuessCount(newTotal)
    setGuessHistory([...guessHistory, submittedGuess ])
    if (submittedGuess === character){
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
        FLAWS
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
        helpContent={<FlawHelp />}/>
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
      <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-xl min-w-80 sm:min-w-120 bg-black/20 backdrop-blur-sm border border-zinc-700 rounded-none shadow-2xl p-8 flex flex-col gap-6">
        <div>
              {/*Display the flaw */}
              <FlawCard flaw={flaw} />

              {/*Display the character's true name status after 3 images and rank after 5 guesses */}
              <ClueButtons 
                totalGuesses={guessCount} 
                setActiveClue={setActiveClue} 
                activeClue={activeClue}
                gameOver={gameOver}
                clues={flawClues}
              />    
              
              {/* Conditionally render the recipient clue and chapter clue based on the activeClue state */}
              {activeClue === 'trueName' && (
                <TrueNameClue  hasTrueName={characters[character].hasTrueName}/>
              )}

              {activeClue === 'rank' && (
                <RankClue rank={characters[character].currentRank} />
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
          {/* Display the history of guesses in reverse order, with styling based on correctness */}
        <GuessHistory guessHistory={guessHistory} speaker={character} />
        {gameOver && !showVictoryModal && (
          <WinnerCard
            speaker={character}
            speakerImage={characters[character]?.image}
            totalGuesses={guessCount}
            mode={MODE}
          />
        )}
      </div>
    </div>
    {/** Display victory modal after successfully guessing flaw's character*/}
    {showVictoryModal && (
        <VictoryModal
          speaker={character}
          speakerImage={characters[character]?.image}
          totalGuesses={guessCount}
          onClose={() => setShowVictoryModal(false)}
          mode={MODE}
        />
      )}
   </div> 
  )

}

export default FlawsPage