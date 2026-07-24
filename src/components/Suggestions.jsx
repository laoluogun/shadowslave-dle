function Suggestions({suggestions, setGuess, checkGuess}) {
    return (
        <ul className="border border-zinc-400 bg-zinc-900/80 rounded-none max-h-40 overflow-y-auto">
              {
                suggestions.map((name, index) => (
                <li key={index} onClick={() => { setGuess(name); checkGuess(name)}} className="px-3 py-2 cursor-pointer hover:bg-zinc-700 text-white border-b border-zinc-600 last:border-b-0">
                  {name}
                </li>
              )
            ) 
          }
        </ul>
    )
}

export default Suggestions