function ClueButtons({totalGuesses, setActiveClue, activeClue}) {
    return (
              <div className="flex gap-3">
                {/* Recipient clue button, only enabled after 2 guesses */}
                <button
                  onClick={() => totalGuesses >= 2 && setActiveClue(activeClue === 'recipient' ? null : 'recipient')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors
                    ${totalGuesses >= 2 
                      ? 'border-gray-500 bg-gray-800/80 hover:bg-gray-700 cursor-pointer text-white' 
                      : 'border-gray-700 bg-gray-900/50 cursor-not-allowed text-gray-600'}`}
                >
                  <span className="text-2xl">💬</span>
                  <span className="text-xs font-bold tracking-widest uppercase">Recipient Clue</span>
                  <span className="text-xs text-gray-400">
                    {totalGuesses >= 2 ? '' : `Unlocks in ${2 - totalGuesses} guess`}
                  </span>
                </button>

                 {/* Display the chapter clue button, which becomes available after 3 guesses */}
                <button
                  onClick={() => totalGuesses >= 3 && setActiveClue(activeClue === 'chapter' ? null : 'chapter')}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors
                    ${totalGuesses >= 3 
                      ? 'border-gray-500 bg-gray-800/80 hover:bg-gray-700 cursor-pointer text-white' 
                      : 'border-gray-700 bg-gray-900/50 cursor-not-allowed text-gray-600'}`}
                >
                  <span className="text-2xl">📖</span>
                  <span className="text-xs font-bold tracking-widest uppercase">Chapter Clue</span>
                  <span className="text-xs text-gray-400">
                    {totalGuesses >= 3 ? '' : `Unlocks in ${3 - totalGuesses} guess${3 - totalGuesses !== 1 ? 'es' : ''}`}
                  </span>
                </button>
              </div>
        )
}

export default ClueButtons