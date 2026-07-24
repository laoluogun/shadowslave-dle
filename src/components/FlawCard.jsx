function FlawCard({ flaw }) {
  return (
    <div className="bg-transparent rounded-none shadow-md p-6 mb-6 text-center">
        <h2 className="text-md uppercase text-white mb-2">Which character has a flaw with this description?</h2>
        <p className="text-lg text-white italic">❝ {flaw}❞</p>
    </div>
  )
}

export default FlawCard