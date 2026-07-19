import talkIcon from "../assets/images/talk.png"
import bookIcon from "../assets/images/book.png"

function ClueButtons({totalGuesses, setActiveClue, activeClue, gameOver}) {
    return (
              <div className="flex gap-3">
                {/* Recipient clue button, only enabled after 3 guesses or after the user guesses correctly */}
                <button
                  onClick={() => (gameOver || totalGuesses >= 3) && setActiveClue(activeClue === 'recipient' ? null : 'recipient')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-none border transition-colors
                    ${(gameOver || totalGuesses >= 3)
                      ? 'border-zinc-400 bg-zinc-700/80 hover:bg-zinc-700 cursor-pointer text-white' 
                      : 'border-zinc-500 bg-zinc-800/80 cursor-default text-zinc-600'}`}
                >
                  <img src={talkIcon} alt="talk" className="w-6 h-6"/>
                  <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Recipient Clue</span>
                  <span className="text-xs text-zinc-400">
                    {(gameOver || totalGuesses >= 3) ? '' : `Unlocks in ${3 - totalGuesses} guess`}
                  </span>
                </button>

                 {/* Display the chapter clue button, which becomes available after 5 guesses or after the user guesses correctly */}
                <button
                  onClick={() => (gameOver || totalGuesses >= 5) && setActiveClue(activeClue === 'chapter' ? null : 'chapter')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-none border transition-colors
                    ${(gameOver || totalGuesses >= 5)
                      ? 'border-zinc-400 bg-zinc-700/80 hover:bg-zinc-700 cursor-pointer text-white' 
                      : 'border-zinc-500 bg-zinc-800/80 cursor-default text-zinc-600'}`}
                >
                  <img src={bookIcon} alt="open book" className="w-6 h-6"/>
                  <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Chapter Clue</span>
                  <span className="text-xs text-zinc-400">
                    {(gameOver || totalGuesses >= 5) ? '' : `Unlocks in ${5 - totalGuesses} guess${5 - totalGuesses !== 1 ? 'es' : ''}`}
                  </span>
                </button>
              </div>
        )
}

export default ClueButtons