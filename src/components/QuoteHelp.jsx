function classicHelp() {
    return (
    <div className="flex flex-col gap-1">
            <h1 className="underline font-semibold">Shadow Slave-Dle Quote Guide</h1>
            <p className="text-sm">In quote mode, your goal is to find out who is the speaker of the quote. </p>
            <p className="text-sm">After a certain number of guesses, clues will become available to you to help narrow down your choices.</p>
            <h2 className="underline font-semibold">Clues</h2>
            <ol className="text-sm gap-1">
                <li>Recipient Clue - This is the character to whom the speaker spoke to.</li>
                <li>Chapter Clue - The exact volume and chapter the quote was uttered.</li>
            </ol>
     </div>
)}

export default classicHelp