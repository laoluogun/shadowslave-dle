import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function InfoPopover({text}) {
    const [showModal, setShowModal] = useState(false)
    const ref = useRef(0);
    return (
        <>
        <button ref={ref} onClick={() => {
            setShowModal(true)
             ref.current.getBoundingClientRect()
            }
        }>
            <img src='/images/info.svg'/>
        </button>
        {showModal && createPortal(
             <div className="flex">
                <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white transition">✕</button>
                <div>If a character has appeared in the story, then their volume debut will be when that appearance is. 
                    If a character has not appeared in the story but has been mentioned, their first mention will be their volume debut.
                    For example, Asterion was first mentioned in Chapter 367, but his first appearence was chapter 1840 therefore his debut volume will be Volume 8.
                    Whereas Broken Sword has not appeared outside of anyone's memories or conversations, therefore his first mention in Chapter 27 will dictate his volume.</div>
                </div>,
                document.body   
        )}
        </>
    );
}