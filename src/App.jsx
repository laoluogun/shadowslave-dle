import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { characters } from './data/characters'
import './App.css'
import HomePage from './pages/HomePage'
import QuotePage from './pages/QuotePage'
import ClassicPage from './pages/ClassicPage'
import FlawsPage from './pages/FlawsPage'
import ArtistCredits from './components/ArtistCredits'


function App() {

  //Preload images for all characters to ensure they display quickly when needed
  useEffect(() => {
    Object.values(characters).forEach(character => {
      const img = new Image()
      img.src = character.image
    })
  }, [])



  return (
    <><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quote" element={<QuotePage />} />
      <Route path="/classic" element={<ClassicPage />} />
      <Route path='/flaw' element={<FlawsPage  />} />
    </Routes>
    <ArtistCredits/>
    </>
  )
}
export default App