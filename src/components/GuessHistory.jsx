import {characters} from '../data/characters'

function GuessHistory({ guessHistory, speaker }) {
    return (
      <ol className="mt-4 space-y-2">
                {/* Display the history of guesses in reverse order, with styling based on correctness */}
                {[...guessHistory].reverse().map((pastGuess, index) => (
                      <li
                        key={index}
                        className={`px-3 py-2 border-3 rounded-none flex flex-col items-center justify-between text-white
                          ${pastGuess === speaker 
                            ? 'bg-green-900/80 border-green-800' 
                            : 'bg-red-900/80 border-red-800'}`}
                      >  
                      <div className="flex gap-2 ">
                        <img src={characters[pastGuess]?.image} 
                        alt={pastGuess} 
                        className="w-20 h-25 object-cover rounded-none" />
                      </div>
                    <span className='text-white font-semibold text-md'>{pastGuess}</span>
                  </li>
                ))}
              </ol>
            )
        }

export default GuessHistory