function Cell({ result, value }) {
  const baseClasses = "flex flex-col items-center justify-center p-2 border rounded-none text-white text-center text-xs font-semibold min-h-16 transition-all"
  
  const colorClasses = {
    correct: 'bg-green-800/80 border-green-600',
    partial: 'bg-yellow-700/80 border-yellow-500',
    incorrect: 'bg-red-900/80 border-red-700',
    higher: 'bg-red-900/80 border-red-700',
    lower: 'bg-red-900/80 border-red-700',
  }

  const arrow = result === 'higher' ? '⬆️' : result === 'lower' ? '⬇️' : null

  const displayValue = Array.isArray(value) ? value.join(', ') : 
    typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value

  return (
    <div className={`${baseClasses} ${colorClasses[result]}`}>
      {arrow && <span className="text-base">{arrow}</span>}
      <span>{displayValue}</span>
    </div>
  )
}

function ClassicGrid({ guessResults }) {
  const columns = ['name', 'gender', 'affiliations', 'currentRank', 'hasTrueName', 'debutVolume']
  const headers = ['Character', 'Gender', 'Affiliations', 'Rank', 'True Name', 'Debut']

  return (
    <div className="w-full overflow-x-auto">
      {/* Header row */}
      <div className="grid grid-cols-6 gap-1 mb-1 min-w-[600px]">
        {headers.map(header => (
          <div key={header} className="text-center text-xs uppercase tracking-widest text-zinc-400 py-1">
            {header}
          </div>
        ))}
      </div>

      {/* Guess rows */}
      <div className="flex flex-col gap-1 min-w-[600px]">
        {guessResults.map((result, index) => (
          <div key={index} className="grid grid-cols-6 gap-1">
            {/* Character cell — always show image + name, no color */}
            <div className="flex flex-col items-center justify-center bg-zinc-800/80 border border-zinc-600 rounded-none p-2 min-h-16">
              <img src={result.image} alt={result.name} className="w-10 h-10 object-cover rounded-sm mb-1"/>
              <span className="text-white text-xs font-semibold text-center">{result.name}</span>
            </div>

            <Cell result={result.gender} value={result.genderValue} />
            <Cell result={result.affiliations} value={result.affiliationsValue} />
            <Cell result={result.currentRank} value={result.currentRankValue} />
            <Cell result={result.hasTrueName} value={result.hasTrueNameValue} />
            <Cell result={result.debutVolume} value={result.debutVolumeValue} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default ClassicGrid