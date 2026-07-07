import {quoteCharacters} from '../data/quoteCharacters'

function GuessHistory({ guessHistory, speaker }) {
    return (
      <ol className="mt-4 space-y-2">
                {/* Display the history of guesses in reverse order, with styling based on correctness */}
                {[...guessHistory].reverse().map((pastGuess, index) => (
                      <li
                        key={index}
                        className={`px-3 py-2 border rounded-none flex flex-col items-center justify-between text-white
                          ${pastGuess === speaker 
                            ? 'bg-green-950/90 border-green-800' 
                            : 'bg-red-950/90 border-red-800'}`}
                      >  
                      <div className="flex gap-2 ">
                        <img src={quoteCharacters[pastGuess]?.image} 
                        alt={pastGuess} 
                        className="w-20 h-20 object-cover rounded-none border border-zinc-600" />
                      </div>
                    <span className='text-md'>{pastGuess}</span>
                  </li>
                ))}
              </ol>
            )
        }

export default GuessHistory