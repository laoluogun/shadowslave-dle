import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import QuotePage from './pages/QuotePage'

function App() {

  //Preload images for all characters to ensure they display quickly when needed
  useEffect(() => {
    Object.values(characters).forEach(character => {
      const img = new Image()
      img.src = character.image
    })
  }, [])



  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quote" element={<QuotePage />} />
    </Routes>
  )
}
export default App