import { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export default function InfoPopover({text}) {
    const [showModal, setShowModal] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0 })
    const ref = useRef(null);
    const popoverRef = useRef(null)

    function computeCoords() {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight
        const margin = 12

        const popEl = popoverRef.current
        const popW = popEl ? popEl.offsetWidth : 256
        const popH = popEl ? popEl.offsetHeight : 200

        let left = rect.left + rect.width / 2
        let top = rect.top - margin
        let placement = 'above'

        // Flip below the icon if there isn't enough room above it
        if (top - popH < margin) {
            top = rect.bottom + margin
            placement = 'below'
        }

        // Clamp horizontally so it never runs off either edge (keeps it "centered enough" on narrow screens)
        const halfW = popW / 2
        left = Math.min(Math.max(left, halfW + margin), vw - halfW - margin)

        // Clamp vertically so it's always fully on-screen
        if (placement === 'below') {
            top = Math.min(top, vh - popH - margin)
        } else {
            top = Math.max(top, popH + margin)
        }

        setCoords({ top, left, placement })
    }

    function handleToggle() {
        if (showModal) {
            setShowModal(false)
                } 
        else {
            setShowModal(true)
         }
    }
    

    useLayoutEffect(() => {
        if (!showModal) return

        computeCoords()

    window.addEventListener('scroll', computeCoords, true) // `true` = capture phase, so it also catches scroll on inner containers like your overflow-x-auto grid
    window.addEventListener('resize', computeCoords)

    //Catch layout shifts
    const observer = new ResizeObserver(computeCoords)
    observer.observe(document.body)

    return () => {
        window.removeEventListener('scroll', computeCoords, true)
        window.removeEventListener('resize', computeCoords)
        observer.disconnect()
    }
    
    }, [showModal])

    return (
        <>
            <button ref={ref} onClick={handleToggle} className='text-zinc-400 hover:text-white cursor-pointer'>
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
                    ref={popoverRef}
                    style={{
                        position: 'fixed',
                        top: coords.top,
                        left: coords.left,
                         transform: coords.placement === 'below'
                            ? 'translate(-50%, 0)'
                            : 'translate(-50%, -100%)',
                    }}
                    className="w-64 bg-zinc-900/95 text-zinc-100 text-xs rounded-none p-3 shadow-2xl z-999 border border-zinc-700"
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