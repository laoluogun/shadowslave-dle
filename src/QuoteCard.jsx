function QuoteCard({ quote }) {
  return (
    <div className="quote-card">
      <h2>Which character said this quote?</h2>
      <p>"{quote}"</p>
    </div>
  )
}

export default QuoteCard