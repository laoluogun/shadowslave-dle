import { useState } from 'react'
import stats from '../assets/images/graph.png'
import fire from '../assets/images/fire.png'
import notes from  '../assets/images/notes.png'
import question  from '../assets/images/question.png'

function TopBar({ statsContent, currentStreak, patchContent, helpContent }) {
  const [openModal, setOpenModal] = useState(null) // null | 'stats' | 'patch' | 'help'

  const buttons = [
    { id: 'stats', icon: stats, alt: 'Stats' },
    { id: 'streak', icon: fire, alt: 'Streak', noModal: true},
    { id: 'patch', icon: notes, alt: 'Patch Notes' },
    { id: 'help', icon: question, alt: 'Help' },
  ]

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        {buttons.map(button => (
        <button
          key={button.id}
          onClick={() => !button.noModal && setOpenModal(button.id)}
          className={` group relative px-1 py-1 rounded-none
            ${button.noModal 
              ? 'border-transparent cursor-default' 
              : 'transition hover:bg-zinc-600 cursor-pointer hover:scale-105 duration-150'}`}
        >
         
            <img src={button.icon} alt={button.alt} className="w-8 h-8 object-contain brightness-0 invert" />
    
         { /* Tooltip */}
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-600 text-white text-[10px] uppercase tracking-widest px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {button.alt}
        </span>
        </button>
      ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-700 border border-zinc-500 rounded-none shadow-2xl p-6 max-w-md w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold tracking-widest uppercase text-sm">
                {openModal === 'stats' ? 'Stats' : openModal === 'streak' ? 'Current Streak' : openModal === 'patch' ? 'Patch Notes' : 'How to Play'}
              </h2>
              <button onClick={() => setOpenModal(null)} className="text-zinc-400 hover:text-white transition">✕</button>
            </div>
            <div className="text-zinc-100 ">
              {openModal === 'stats' && statsContent}
              {openModal === 'patch' && patchContent}
              {openModal === 'help' && helpContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default TopBar