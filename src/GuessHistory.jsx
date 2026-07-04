import {characters} from './data/characters'

function GuessHistory({ guessHistory, speaker }) {
    return (
      <ol className="mt-4 space-y-2 ">
                {/* Display the history of guesses in reverse order, with styling based on correctness */}
                {[...guessHistory].reverse().map((pastGuess, index) => (
                      <li
                        key={index}
                        className={`px-3 py-2 border rounded-none flex flex-col items-center justify-between text-white
                          ${pastGuess === speaker 
                            ? 'bg-green-800/80 border-green-600' 
                            : 'bg-red-900/80 border-red-700'}`}
                      >  
                      <div className="flex gap-2 ">
                        <img src={characters[pastGuess]?.image} 
                        alt={pastGuess} 
                        className="w-14 h-14 object-cover rounded-none" />
                      </div>
                    <span>{pastGuess}</span>
                  </li>
                ))}
              </ol>
            )
        }

export default GuessHistory