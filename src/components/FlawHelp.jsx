function flawHelp() {
    return (
    <div className="flex flex-col gap-1">
            <h1 className="underline font-semibold">Shadow Slave-Dle Flaw Guide</h1>
            <p className="text-sm">In flaw mode, your goal is to find out who the flaw belongs to.</p>
            <p className="text-sm">After a certain number of guesses, clues will become available to you to help narrow down your choices.</p>
            <h2 className="underline font-semibold">Clues</h2>
            <ol className="text-sm gap-1">
                <li>Has True Name Clue - This states whether or not the character possesses a true name.</li>
                <li>Rank Clue - The most recent rank the character has achieved.</li>
            </ol>
            <h2 className="underline font-semibold">Important!</h2>
             <p className="text-sm">Not all characters have their flaws stated, therefore a select few characters are possible answers.</p>
             <p className="text-sm">Not all characters have an offiical rune for their flaw, therefore its description is written.</p>
     </div>
)}

export default flawHelp