import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import {trueNames} from '../data/trueNames'
import {characters} from '../data/characters'
import TrueNameCard from '../components/TrueNameCard'
import RankClue from '../components/RankClue'
import VolumeNoChapterClue from '../components/VolumeNoChapterClue'
import ClueButtons from '../components/ClueButtons'
import InputField from '../components/InputField'
import Suggestions from '../components/Suggestions'
import GuessHistory from '../components/GuessHistory'
import VictoryModal from '../components/VictoryModal'
import WinnerCard from '../components/WinnerCard'
import TopBar from '../components/TopBar'
import patchnotetext from '../data/trueNamePatchNote'
import TrueNameHelp from '../components/TrueNameHelp'
import { useStats } from '../hooks/useStats'
import StatsDisplay from '../components/StatsDisplay'
import ModeSwitcher from '../components/ModeSwitcher'
import bookIcon from '../assets/images/book.png'
import rankIcon from '../assets/images/ranking.png'
import { trueNameSchedule } from '../data/trueNameSchedule'
import ArtistCredits from '../components/ArtistCredits'

  const trueNameClues = [
  { id: 'debut', label: 'Debut Clue', icon: bookIcon, unlockAt: 3 },
  { id: 'rank', label: 'Rank Clue', icon: rankIcon, unlockAt: 5 },
]

const START_DATE = new Date('2026-07-25').getTime()

function TrueNamePage() {
    //Set title
  useEffect(() => {
    document.title = 'Shadow Slave Dle | True Name'
  }, [])
    //Reset local storage every day when a new character is selected
   const today = new Date().toISOString().slice(0, 10)
   const savedDate = localStorage.getItem('trueName-date')

   
  if (savedDate !== null && savedDate !== today) {
    const wasWon = localStorage.getItem('trueName-gameOver') === 'true'
    const guesses = JSON.parse(localStorage.getItem('trueName-guessHistory') || '[]')

   // Check if more than 1 day has passed (missed a day)
    const savedMs = new Date(savedDate).getTime()
    const todayMs = new Date(today).getTime()
    const daysMissed = Math.floor((todayMs - savedMs) / 86400000)
    if (daysMissed > 1) {
      localStorage.setItem('trueName-currentStreak', '0')
    } else if (!wasWon && guesses.length > 0) { 
     const played = JSON.parse(localStorage.getItem('trueName-gamesPlayed') || '0')
      const total = JSON.parse(localStorage.getItem('trueName-totalGuesses') || '0')
      const guessCount = JSON.parse(localStorage.getItem('trueName-guessCount') || '0')
      localStorage.setItem('trueName-gamesPlayed', JSON.stringify(played + 1))
      localStorage.setItem('trueName-totalGuesses', JSON.stringify(total + guessCount))
      localStorage.setItem('trueName-currentStreak', '0') 
    }
    
    localStorage.removeItem('trueName-guessCount')
    localStorage.removeItem('trueName-guessHistory')
    localStorage.removeItem('trueName-gameOver')
  }
  localStorage.setItem('trueName-date', today)  

  //Initialize user stats that should not be reset each day.
  const { gamesPlayed, gamesWon, avgGuesses, winRate, currentStreak, maxStreak, recordWin } = useStats('trueName')
  
  //Create mode constant that will be used to change page dependent content
  const MODE  = 'TRUENAME'
  //Create navigation to home page
  const navigate = useNavigate()

    //Find the true name of the day 
      const [currentTrueName] = useState(() => {
        const today = new Date().toISOString().slice(0, 10)
        const todaysId = trueNameSchedule[today]
      
        if (todaysId) {
          return trueNames.find(t => t.id === todaysId)
        }
      })
  

  //Extract the relevant information from the current trueName
  const trueName = currentTrueName.trueName
  const character = currentTrueName.character
  const characterImage = characters[character].image
  const trueNameCharacterList = Object.keys(characters)

  //State variables for the game logic
  
  const [guess, setGuess] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [alreadyGuessed, setAlreadyGuessed] = useState(false)

  //Add local storage to guess history, total guesses, and game over state so user can swap between pages without losing progress.

  const [guessHistory, setGuessHistory] = useState(() => {
    const saved = localStorage.getItem('trueName-guessHistory')
    return saved ? JSON.parse(saved) : []
  })

    const [guessCount, setGuessCount] = useState(() => {
  return parseInt(localStorage.getItem('trueName-guessCount') || '0')
  })

  const [gameOver, setGameOver] = useState(() => {
    return localStorage.getItem('trueName-gameOver') === 'true'
  })

  //Sync effects
  useEffect(() => {
    localStorage.setItem('trueName-guessHistory', JSON.stringify(guessHistory))
  }, [guessHistory])

  useEffect(() => {
  localStorage.setItem('trueName-guessCount', JSON.stringify(guessCount))
  }, [guessCount])

  useEffect(() => {
    localStorage.setItem('trueName-gameOver', gameOver)
  }, [gameOver])


  // State variables to control the visibility of recipient and chapter clues
  const [activeClue, setActiveClue] = useState(null) // null | 'volume' | 'rank'
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  

  function handleChange(e) {
    setGuess(e.target.value);
    setNotFound(false)
    setAlreadyGuessed(false)
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

  // Function to check the user's guess against the holder of the true name
  function checkGuess(nameOverride) {
    const submittedGuess = nameOverride ?? guess
    if (!trueNameCharacterList.includes(submittedGuess)) {
      setNotFound(true)
      return
    }
    if (guessHistory.includes(submittedGuess)) {
      setAlreadyGuessed(true)
      return
    }
    setNotFound(false)
    const newTotal = guessCount + 1
    setGuessCount(newTotal)
    setGuessHistory([...guessHistory, submittedGuess ])
    if (submittedGuess === character){
      recordWin(newTotal)
      setGameOver(true)
      setShowVictoryModal(true)
    }
    else {
      setGuess('')
      setAlreadyGuessed(false)
    }
  }


  return (
    <div className="min-h-screen flex flex-col">
    <div className="flex-1 flex flex-col items-center p-4 pb-0 gap-6">
      <button
        onClick={() => navigate('/')}
        className="self-start text-zinc-400 hover:text-white text-sm transition"
      >
        ← Back
      </button>
      {/** Main title of the game mode displayed at the top of the page */}
     <h1 className="font-mountain-king text-center text-5xl font-bold tracking-widest text-white">
        TRUE NAME
      </h1>
       <div className='flex flex-col items-center justify-center'>
        <p className="font-mountain-king  text-zinc-400 text-center text-sm tracking-wide">Guess today's Shadow Slave character</p>
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
          <TrueNameHelp />
        }
      />
      </div>
      {/*Main container for the game, centered on the page with a semi-transparent background and rounded corners */}
      <div className="w-full max-w-xl bg-black/20 backdrop-blur-sm border border-zinc-700 rounded-none shadow-2xl p-6 flex flex-col gap-6">
        <div>
              <p className="text-zinc-400 font-mountain-king text-sm text-center italic tracking-wide">Data up until Volume 11/Chapter 3000</p>
              {/*Display the true name */}
              <TrueNameCard trueName={trueName} />

              {/*Display the true name holder's volume debut after 3 guesses, and the rank after 5 guesses */}
              <ClueButtons 
                totalGuesses={guessCount} 
                setActiveClue={setActiveClue} 
                activeClue={activeClue}
                gameOver={gameOver}
                clues={trueNameClues}
              />

              {/* Conditionally render the recipient clue and chapter clue based on the activeClue state */}
              
                <VolumeNoChapterClue volume={characters[character].debutVolume} isActive={activeClue === 'debut'} />

                <RankClue rank={characters[character].currentRank} isActive={activeClue === 'rank'} />
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
              {alreadyGuessed && (
                <div className="w-full bg-yellow-900/80 border border-yellow-700 px-3 py-2 text-white text-sm text-center">
                  You've already guessed that character.
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
    {/** Display victory modal after successfully guessing the true name holder*/}
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
    <ArtistCredits />
    </div>
  )
}


export default TrueNamePage
