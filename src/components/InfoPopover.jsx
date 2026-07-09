import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function InfoPopover({text}) {
    const [showModal, setShowModal] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0 })
    const ref = useRef(null);

    function handleOpen() {
        const rect = ref.current.getBoundingClientRect()
        setCoords({
            top: rect.top,               // top of the icon
            left: rect.left + rect.width / 2, // horizontal center of the icon
        })
        if (showModal){
            setShowModal(false)
        }
        else{
            setShowModal(true)
        }
    }

    useEffect(() => {
        if (!showModal) return

        function updateCoords(){
         const rect = ref.current.getBoundingClientRect()
        setCoords({
            top: rect.top,               // top of the icon
            left: rect.left + rect.width / 2, // horizontal center of the icon
        })
    }

    updateCoords();

    window.addEventListener('scroll', updateCoords, true) // `true` = capture phase, so it also catches scroll on inner containers like your overflow-x-auto grid
    window.addEventListener('resize', updateCoords)

    return () => {
        window.removeEventListener('scroll', updateCoords, true)
        window.removeEventListener('resize', updateCoords)
    }
    
    }, [showModal])

    return (
        <>
            <button ref={ref} onClick={handleOpen} className='text-zinc-400 hover:text-white cursor-pointer'>
                 <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-4 h-4 transition-transform duration-150 hover:scale-125"
                >
                    <path d="M11.188 4.781c6.188 0 11.219 5.031 11.219 11.219s-5.031 11.188-11.219 11.188-11.188-5-11.188-11.188 5-11.219 11.188-11.219zM11.063 8.906c-0.313 0.375-0.469 0.813-0.469 1.281 0 0.375 0.125 0.688 0.313 0.906 0.219 0.219 0.531 0.344 0.844 0.344 0.438 0 0.844-0.188 1.156-0.563 0.281-0.344 0.438-0.844 0.438-1.375 0-0.313-0.094-0.594-0.313-0.813s-0.531-0.344-0.844-0.344c-0.406 0-0.813 0.188-1.125 0.563zM8.219 15.375l0.375 0.406c0.281-0.313 0.563-0.563 0.75-0.719 0.188-0.125 0.344-0.188 0.469-0.188 0.094 0 0.188 0.031 0.25 0.094 0.031 0.094 0.063 0.188 0.063 0.344 0 0.781-0.094 1.281-0.5 3.156s-0.625 3.25-0.625 4.156c0 0.344 0.063 0.594 0.188 0.75 0.094 0.156 0.281 0.281 0.531 0.281 0.406 0 1-0.313 1.688-0.844 0.688-0.563 1.375-1.344 2.125-2.344l-0.406-0.344c-0.25 0.313-0.5 0.531-0.688 0.688-0.188 0.125-0.344 0.25-0.469 0.25-0.094 0-0.188-0.094-0.25-0.156-0.031-0.094-0.063-0.219-0.063-0.406 0-0.125 0.031-0.531 0.156-1.25 0.094-0.719 0.063-0.719 0.25-1.781 0.031-0.313 0.125-0.75 0.219-1.281 0.25-1.594 0.406-2.563 0.406-2.875 0-0.281-0.094-0.531-0.188-0.688-0.125-0.156-0.313-0.219-0.531-0.219-0.375 0-0.875 0.281-1.563 0.781-0.688 0.531-1.375 1.25-2.188 2.188z" />
                </svg>
            </button>

            {showModal && createPortal(
                <div
                    style={{
                        position: 'fixed',
                        top: coords.top,
                        left: coords.left,
                        transform: 'translate(-50%, -100%)', // shift up by its own height, center horizontally
                        marginTop: '-8px', // small gap between popover and icon
                    }}
                    className="w-64 bg-zinc-900 text-zinc-100 text-xs rounded-none p-3 shadow-2xl z-[999] border border-zinc-700"
                >
                    <button
                        onClick={() => setShowModal(false)}
                        className="float-right text-zinc-400 hover:text-white transition -mt-1 -mr-1"
                    >
                        ✕
                    </button>
                    <text className="whitespace-pre-line">{text}</text>
                </div>,
                document.body
            )}
        </>
    );
}