import React, { useState, useEffect } from 'react'

function VictoryModal({ speaker, speakerImage, totalGuesses, onClose }) {
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
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-600 rounded-none shadow-2xl p-8 max-w-sm w-full mx-4 text-center flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold tracking-widest text-white uppercase">Victory!</h2>
        <img 
          src={speakerImage} 
          alt={speaker}
          className="w-28 h-28 object-cover rounded-none border border-zinc-600"
        />
        <div>
          <p className="text-zinc-400 text-sm">You guessed</p>
          <p className="text-white font-bold text-xl">{speaker}</p>
        </div>
        <p className="text-zinc-400 text-sm">Number of tries: <span className="text-white font-semibold">{totalGuesses}</span></p>
        <div>
          <p className="text-zinc-400 text-sm">Next quote in</p>
          <p className="text-white font-mono text-3xl font-bold">{timeLeft}</p>
        </div>
        <button 
          onClick={onClose}
          className="mt-2 w-full py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white font-semibold transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
export default VictoryModal