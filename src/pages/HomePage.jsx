import { useNavigate } from 'react-router-dom'
import quote from '../assets/images/quote.png'
import questionSign from  '../assets/images/question-sign.png'
import AboutModal from '../components/AboutModal'

const modes = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Guess the daily character',
    icon: questionSign,
    path: '/classic',
    available: true,
  },
  {
    id: 'quote',
    title: 'Quote',
    description: 'Guess the character from a daily quote',
    icon: quote,
    path: '/quote',
    available: true,
  },
]

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center">
        {/* Display main title and subtitle */}
        <h1 className="font-mountain-king text-5xl font-bold tracking-widest text-white uppercase">
          Shadow Slave dle
        </h1>
        <p className="font-mountain-king text-zinc-400 tracking-widest uppercase text-sm mt-2">
          Test Your Shadow Slave Knowledge
        </p>
      </div>

      {/* Display the two modes that ShadowSlaveDle currently has */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => mode.available && navigate(mode.path)}
            className={`w-full p-5 border rounded-none text-left transition flex items-center gap-4
                       duration-150 hover:scale-105 cursor-pointer
              ${mode.available
                ? 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800 cursor-pointer text-white'
                : 'bg-zinc-900/40 border-zinc-800 cursor-default text-zinc-600'
              }`}
          >
            <img src={mode.icon} alt={mode.title} className="w-12 h-12 invert" />
            <div>
              <p className="font-mountain-king font-bold text-lg tracking-wide uppercase">{mode.title}</p>
              <p className="text-sm mt-0.5 text-zinc-400">{mode.description}</p>
              {!mode.available && (
                <p className="text-xs text-zinc-600 mt-1">Coming soon</p>
              )}
            </div>
          </button>
        ))}
      </div>
      {/* Include an about button that opens up a modal with some additional information on the project for users */}
      <AboutModal />
    </div>
  )
}
export default HomePage