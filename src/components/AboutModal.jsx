import { useState } from 'react'

export default function AboutModal() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                aria-label="About"
                className="w-12 h-12 rounded-full flex items-center justify-center
                          bg-zinc-900 border border-zinc-700 text-zinc-400
                          hover:text-white hover:border-zinc-500
                          transition-all duration-150 hover:scale-110 cursor-pointer"
            >
                {/* Must use DevTools to find sizing for SVGs. Avoid in the future in possible*/}
                <svg viewBox="0 4.781 22.407 22.407" fill="currentColor" className="w-8 h-8">
                    <path d="M11.188 4.781c6.188 0 11.219 5.031 11.219 11.219s-5.031 11.188-11.219 11.188-11.188-5-11.188-11.188 5-11.219 11.188-11.219zM11.063 8.906c-0.313 0.375-0.469 0.813-0.469 1.281 0 0.375 0.125 0.688 0.313 0.906 0.219 0.219 0.531 0.344 0.844 0.344 0.438 0 0.844-0.188 1.156-0.563 0.281-0.344 0.438-0.844 0.438-1.375 0-0.313-0.094-0.594-0.313-0.813s-0.531-0.344-0.844-0.344c-0.406 0-0.813 0.188-1.125 0.563zM8.219 15.375l0.375 0.406c0.281-0.313 0.563-0.563 0.75-0.719 0.188-0.125 0.344-0.188 0.469-0.188 0.094 0 0.188 0.031 0.25 0.094 0.031 0.094 0.063 0.188 0.063 0.344 0 0.781-0.094 1.281-0.5 3.156s-0.625 3.25-0.625 4.156c0 0.344 0.063 0.594 0.188 0.75 0.094 0.156 0.281 0.281 0.531 0.281 0.406 0 1-0.313 1.688-0.844 0.688-0.563 1.375-1.344 2.125-2.344l-0.406-0.344c-0.25 0.313-0.5 0.531-0.688 0.688-0.188 0.125-0.344 0.25-0.469 0.25-0.094 0-0.188-0.094-0.25-0.156-0.031-0.094-0.063-0.219-0.063-0.406 0-0.125 0.031-0.531 0.156-1.25 0.094-0.719 0.063-0.719 0.25-1.781 0.031-0.313 0.125-0.75 0.219-1.281 0.25-1.594 0.406-2.563 0.406-2.875 0-0.281-0.094-0.531-0.188-0.688-0.125-0.156-0.313-0.219-0.531-0.219-0.375 0-0.875 0.281-1.563 0.781-0.688 0.531-1.375 1.25-2.188 2.188z" />
                </svg>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-zinc/70 backdrop-blur-xs"
                    onClick={() => setOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md max-h-[80vh] overflow-y-auto
                                   bg-zinc-900 border border-zinc-700 rounded-none"
                    >
                        <div className="flex items-center justify-between bg-zinc-900/80 border-b border-zinc-700 px-5 py-3">
                            <h2 className="text-white font-mountain-king font-bold tracking-widest uppercase">About</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-zinc-300 hover:text-white transition text-xl leading-none cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-5 flex flex-col gap-2 text-sm text-zinc-300">
                            <p>
                                Hey! This is Shadow Slave-dle, a game heavily inspired by Narutodle and Wordle that revolves around
                                characters from the webnovel series 'Shadow Slave', created by Guiltythree.
                            </p>
                            <h3 className="text-white font-bold tracking-wide uppercase text-xs">
                                Disclaimer!
                            </h3>
                            <p>
                               Shadow Slave is the property of its original owner, Guiltythree, who does not endorse nor sponsor this personal project!
                            </p>
                            <p>
                                  The <a href='https://shadowslave.fandom.com/wiki/Shadow_Slave_Wiki'>Shadow Slave Wiki</a> helped me a ton with finding 
                                  information necessary for this project. Massive thanks to the contributors there for their hard work. 
                            </p>

                            <div>
                                <h3 className="text-white font-bold tracking-wide uppercase text-xs mb-2">
                                    Feedback / Questions
                                </h3>
                                <p>
                                    This is an attempt of creating a personal project so I can improve my web design abilities.
                                    If there are any bugs or suggestions you have, please reach out to my discord! You can send messages to ._laolu_. on discord.

                                    Also! Please let me know about any quotes you'd want introduced because it is very difficult hand picking them out. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}