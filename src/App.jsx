import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { quoteCharacters } from './data/quoteCharacters'
import './App.css'
import HomePage from './pages/HomePage'
import QuotePage from './pages/QuotePage'
import ClassicPage from './pages/ClassicPage'
import { characters } from './data/characters'
import ArtistCredits from './components/ArtistCredits'


function App() {

  //Preload images for all characters to ensure they display quickly when needed
  useEffect(() => {
    Object.values(quoteCharacters).forEach(character => {
      const img = new Image()
      img.src = character.image
    })

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
    </Routes>
    <ArtistCredits/>
    </>
  )
}
export default App