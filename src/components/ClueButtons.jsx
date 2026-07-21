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
              ? 'border-zinc-400 bg-zinc-700/80 hover:bg-zinc-700 cursor-pointer text-white' 
              : 'border-zinc-500 bg-zinc-800/80 cursor-default text-zinc-600'}`}
        >
          <img src={clue.icon} alt={clue.label} className="w-6 h-6"/>
          <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">{clue.label}</span>
          <span className="text-xs text-zinc-400">
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