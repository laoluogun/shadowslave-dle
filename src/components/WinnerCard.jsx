import { useState, useEffect } from 'react'

function WinnerCard({ speaker, speakerImage, totalGuesses, mode }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    function getTimeUntilMidnight() {
      const now = new Date()
      const midnight = new Date()
      midnight.setUTCHours(24, 0, 0, 0)
      const diff = midnight - now
      const hours = String(Math.floor(diff / 3600000)).padStart(2, '0')
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      return `${hours}:${minutes}:${seconds}`
    }

    setTimeLeft(getTimeUntilMidnight())
    const timer = setInterval(() => setTimeLeft(getTimeUntilMidnight()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-zinc-900 border-3 border-green-700 rounded-none p-6 text-center flex flex-col items-center gap-3">
      <h2 className="text-xl font-bold tracking-widest text-white uppercase">Victory!</h2>
      <img src={speakerImage} alt={speaker} className="w-24 h-30 object-cover rounded-none"/>
      <div>
        <p className="text-white text-sm">You guessed</p>
        <p className="text-white font-bold text-lg">{speaker}</p>
      </div>
      <p className="text-white text-sm">Number of guesses: <span className="text-white font-semibold text-base">{totalGuesses}</span></p>
      <div>
        <p className="text-white text-sm">{`Next ${mode === 'QUOTE' ?  'quote' : 'character'} in`}</p>
        <p className="text-white font-mono text-2xl font-bold">{timeLeft}</p>
      </div>
    </div>
  )
}
export default WinnerCard