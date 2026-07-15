function StatCard({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl font-bold text-white">{value}</span>
      <span className="text-xs uppercase tracking-widest text-zinc-400 text-center">{label}</span>
    </div>
  )
}

function StatsDisplay({ gamesPlayed, gamesWon, avgGuesses, winRate, currentStreak, maxStreak }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4 border-b border-zinc-700 pb-6">
        <StatCard label="Games Played" value={gamesPlayed} />
        <StatCard label="Games Won" value={gamesWon} />
        <StatCard label="Win Rate" value={`${winRate}%`} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Avg Guesses" value={avgGuesses} />
        <StatCard label="Current Streak" value={currentStreak} />
        <StatCard label="Max Streak" value={maxStreak} />
      </div>
    </div>
  )
}
export default StatsDisplay