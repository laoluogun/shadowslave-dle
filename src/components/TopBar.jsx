import { useState } from 'react'

function TopBar({ statsContent, patchContent, helpContent }) {
  const [openModal, setOpenModal] = useState(null) // null | 'stats' | 'patch' | 'help'

  const buttons = [
    { id: 'stats', icon: 'src/assets/images/graph.png', alt: 'Stats' },
    { id: 'streak', icon: 'src/assets/images/fire.png', alt: 'Streak',},
    { id: 'patch', icon: 'src/assets/images/notes.png', alt: 'Patch Notes' },
    { id: 'help', icon: 'src/assets/images/question.png', alt: 'Help' },
  ]

  return (
    <>
      <div className="flex items-center justify-center gap-1 border border-zinc-400 bg-zinc-700/80 px-4 py-2">
        {buttons.map(button => (
          <button
            key={button.id}
            onClick={() => !button.noModal && setOpenModal(button.id)}
            className={`p-2 rounded-none border transition
              ${button.noModal 
                ? 'border-transparent cursor-default' 
                : 'border-zinc-500 hover:bg-zinc-600 cursor-pointer'}`}
          >
            <img src={button.icon} alt={button.alt} className="w-6 h-6 object-contain" />
          </button>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-700 border border-zinc-500 rounded-none shadow-2xl p-6 max-w-md w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold tracking-widest uppercase text-sm">
                {openModal === 'stats' ? 'Stats' : openModal === 'patch' ? 'Patch Notes' : 'How to Play'}
              </h2>
              <button onClick={() => setOpenModal(null)} className="text-zinc-400 hover:text-white transition">✕</button>
            </div>
            <div className="text-zinc-300 text-sm">
              {openModal === 'stats' && statsContent}
              {openModal === 'streaks' && streakContent}
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