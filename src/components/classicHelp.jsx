function classicHelp() {
    return (
    <div className="flex flex-col gap-1">
            <h1 className="underline font-mountain-king">Shadow Slave-Dle Classic Guide</h1>
            <p className="text-xs">In classic mode, type in the name of a character and it will reveal clues assosciated with today's character.
            The color of the tiles will change to show how close your guess was to the character to find.</p>
            <p className="text-xs"><span className="text-green-400">Green</span> tiles indicate an exact match.</p>
            <p className="text-xs"><span className="text-yellow-400">Yellow</span> tiles indicate a partial match, meaning some information within the tile matches with today's character.</p>
            <p className="text-xs"><span className="text-red-400">Red</span> tiles indicate that there are no shared properties.</p>
            <p className="text-xs"><span className="text-red-400">Red</span> tiles with arrows indicate that the correct property is either of a higher or lower value.</p>
            <h2 className="underline font-mountain-king">Properties</h2>
            <ol className="text-xs list-disc gap-1 pl-3">
                <li>Gender - Male, Female, None, Unknown</li>
                <li>Race - Human, Nightmare Creature, True Defiled, Daemon, Shadow</li>
                <li>Affiliations - Affiliations associated with a character</li>
                <li>Rank - The highest rank the character has achieved</li>
                <li>True Name - Whether the character possesses a true name</li>
                <li>Debut - When a character first appears/is mentioned within the story. More info on the information popup. </li>
            </ol>
     </div>
)}

export default classicHelp