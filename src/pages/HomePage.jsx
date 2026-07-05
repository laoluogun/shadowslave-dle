function HomePage({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white tracking-widest mb-8">
        ShadowSlave-dle
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button onClick={() => onSelect('quote')}
          className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-none text-white text-left hover:bg-zinc-800 transition">
          <p className="font-bold text-lg">Quote</p>
          <p className="text-zinc-400 text-sm">Guess the character from a quote</p>
        </button>
        <button onClick={() => onSelect('classic')}
          className="w-full p-4 bg-zinc-900 border border-zinc-700 rounded-none text-white text-left hover:bg-zinc-800 transition">
          <p className="font-bold text-lg">Classic</p>
          <p className="text-zinc-400 text-sm">Get clues on every try</p>
        </button>
      </div>
    </div>
  )
}
export default HomePage