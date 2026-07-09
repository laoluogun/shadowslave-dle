function Feedback({feedback}) {
    return (
        <p className={`text-center font-semibold ${
              feedback.includes('Correct') ? 'text-green-700' : 'text-zinc-100'
            }`}>
              {feedback}
            </p>
        )
    }

export default Feedback