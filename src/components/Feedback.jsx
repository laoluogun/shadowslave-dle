function Feedback({feedback}) {
    return (
        <div className="flex w-xs self-center bg-zinc-700/70 justify-center items-center border border-zinc-950 py-1">
            <p className={`text-center font-semibold ${
                  feedback.includes('Correct') ? 'text-green-300' : 'text-zinc-100'
                }`}>
                  {feedback}
            </p>
        </div>
        )
    }

export default Feedback