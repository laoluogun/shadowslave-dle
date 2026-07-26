function TrueNameCard({ trueName }) {
  return (
    <div className="bg-transparent rounded-none shadow-md p-6 mb-6 text-center">
        <h2 className="text-md uppercase text-white mb-2">Which character has this true name?</h2>
        <p className="text-lg text-white italic">❝ {trueName}❞</p>
    </div>
  )
}

export default TrueNameCard