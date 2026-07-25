import { useNavigate, useLocation } from 'react-router-dom'

const modes = [
    {    label: 'classic',  path: '/classic', icon: "src/assets/images/question-sign.png"  }, 
    {    label: 'quote', path: '/quote', icon: "src/assets/images/quote.png"  },
    {    label: 'flaw', path: '/flaw', icon: "src/assets/images/broken-plate.png"  }
] 

function ModeSwitcher() {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center gap-1 px-2"> 
            {modes.map(mode => (
                <button
                key={mode.mode}
                 onClick={() => navigate(mode.path)}
                className={'group relative p-2 rounded-none transition hover:bg-zinc-600 cursor-pointer hover:scale-105 duration-150'} 
                >
                    <img
                     src={mode.icon}
                     alt={mode.label} 
                     className={`w-8 h-8 brightness-0 invert transition-opacity ${location.pathname === mode.path ? 'opacity-100' : 'opacity-50'}`}   
                    />
                {/* Tooltip */}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-600 text-white text-[10px] uppercase tracking-widest px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {mode.label}
                </span>
                </button>
            ))}
        </div>
    )
}

export default ModeSwitcher