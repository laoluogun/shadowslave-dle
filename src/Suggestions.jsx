function Suggestions({suggestions, setGuess, checkGuess}) {
    return (
        <ul className="border border-gray-600 rounded-lg bg-gray-800 mt-1 max-h-40 overflow-y-auto">
              {
                suggestions.map((name, index) => (
                <li key={index} onClick={() => { setGuess(name); checkGuess(name)}} className="px-3 py-2 cursor-pointer hover:bg-gray-700 text-white">
                  {name}
                </li>
              )
            ) 
          }
        </ul>
    )
}

export default Suggestions