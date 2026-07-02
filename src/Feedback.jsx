function Feedback({feedback}) {
    return (
        <p className={`text-center font-semibold ${
              feedback.includes('Correct') ? 'text-green-700' : 'text-red-700'
            }`}>
              {feedback}
            </p>
        )
    }

export default Feedback