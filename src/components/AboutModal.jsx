import { useState } from 'react'

export default function AboutModal() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                aria-label="About"
                className="w-12 h-12 rounded-full flex items-center justify-center
                         bg-zinc-900 border border-zinc-700 text-zinc-400 hover:border-zinc-500
                          transition-all duration-150 hover:scale-110 cursor-pointer"
            >
                <img src='src/assets/images/info.png'  className='w-6 h-6 invert' />
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

                                    Also! Please let me know about any quotes you'd want introduced because it is very tedious hand picking them out. 
                                    And let me know about any characters you want introduced! I tried to add any character that had fan art created for them, rather than every character listed in the Wiki, so if you find anything missing and feel like it'd be a good addition, let me know!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}