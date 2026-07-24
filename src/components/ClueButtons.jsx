import talkIcon from "../assets/images/talk.png"
import bookIcon from "../assets/images/book.png"

function ClueButtons({ totalGuesses, setActiveClue, activeClue, gameOver, clues }) {
  return (
    <div className="flex gap-3">
      {clues.map(clue => (
        <button
          key={clue.id}
          onClick={() => (gameOver || totalGuesses >= clue.unlockAt) && 
            setActiveClue(activeClue === clue.id ? null : clue.id)}
          className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-none border transition-colors
            ${gameOver || totalGuesses >= clue.unlockAt
              ? 'border-zinc-400 bg-zinc-900/80 hover:bg-zinc-700 cursor-pointer' 
              : 'border-zinc-500 bg-zinc-900/80 cursor-default'}`}
        >
          <img src={clue.icon} alt={clue.label} className="w-6 h-6 invert brightness-0"/>
          <span className="text-xs font-bold text-white tracking-widest uppercase">{clue.label}</span>
          <span className="text-xs text-white">
            {gameOver || totalGuesses >= clue.unlockAt
              ? ''
              : `Unlocks in ${clue.unlockAt - totalGuesses} guess${clue.unlockAt - totalGuesses !== 1 ? 'es' : ''}`}
          </span>
        </button>
      ))}
    </div>
  )
}

export default ClueButtons