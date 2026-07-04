import { useState, useEffect } from 'react'

function WinnerCard({ speaker, speakerImage, totalGuesses }) {
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
    <div className="bg-gray-900 border border-green-600 rounded-none p-6 text-center flex flex-col items-center gap-3">
      <h2 className="text-xl font-bold tracking-widest text-white uppercase">Victory!</h2>
      <img src={speakerImage} alt={speaker} className="w-24 h-24 object-cover rounded-none border border-gray-600"/>
      <div>
        <p className="text-gray-400 text-sm">You guessed</p>
        <p className="text-white font-bold text-lg">{speaker}</p>
      </div>
      <p className="text-gray-400 text-sm">Number of tries: <span className="text-white font-semibold">{totalGuesses}</span></p>
      <div>
        <p className="text-gray-400 text-sm">Next quote in</p>
        <p className="text-white font-mono text-2xl font-bold">{timeLeft}</p>
      </div>
    </div>
  )
}
export default WinnerCard