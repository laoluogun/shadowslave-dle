import talkIcon from "../assets/images/talk.png"
import bookIcon from "../assets/images/book.png"

function ClueButtons({totalGuesses, setActiveClue, activeClue}) {
    return (
              <div className="flex gap-3">
                {/* Recipient clue button, only enabled after 2 guesses */}
                <button
                  onClick={() => totalGuesses >= 2 && setActiveClue(activeClue === 'recipient' ? null : 'recipient')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-none border transition-colors
                    ${totalGuesses >= 2 
                      ? 'border-zinc-400 bg-zinc-700/80 hover:bg-zinc-700 cursor-pointer text-white' 
                      : 'border-zinc-500 bg-zinc-800/80 cursor-default text-zinc-600'}`}
                >
                  <img src={talkIcon} alt="talk" className="w-6 h-6"/>
                  <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Recipient Clue</span>
                  <span className="text-xs text-zinc-400">
                    {totalGuesses >= 2 ? '' : `Unlocks in ${2 - totalGuesses} guess`}
                  </span>
                </button>

                 {/* Display the chapter clue button, which becomes available after 3 guesses */}
                <button
                  onClick={() => totalGuesses >= 3 && setActiveClue(activeClue === 'chapter' ? null : 'chapter')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-none border transition-colors
                    ${totalGuesses >= 3 
                      ? 'border-zinc-400 bg-zinc-700/80 hover:bg-zinc-700 cursor-pointer text-white' 
                      : 'border-zinc-500 bg-zinc-800/80 cursor-default text-zinc-600'}`}
                >
                  <img src={bookIcon} alt="open book" className="w-6 h-6"/>
                  <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Chapter Clue</span>
                  <span className="text-xs text-zinc-400">
                    {totalGuesses >= 3 ? '' : `Unlocks in ${3 - totalGuesses} guess${3 - totalGuesses !== 1 ? 'es' : ''}`}
                  </span>
                </button>
              </div>
        )
}

export default ClueButtons