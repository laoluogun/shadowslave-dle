import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { characters } from './data/characters'
import './App.css'
import HomePage from './pages/HomePage'
import QuotePage from './pages/QuotePage'
import ClassicPage from './pages/ClassicPage'
import FlawsPage from './pages/FlawsPage'
import ArtistCredits from './components/ArtistCredits'
import fireIcon from './assets/images/fire.png'
import notesIcon from './assets/images/notes.png'
import questionIcon from './assets/images/question.png'
import questionSignIcon from './assets/images/question-sign.png'
import quoteIcon from './assets/images/quote.png'
import brokenPlateIcon from './assets/images/broken-plate.png'
import infoIcon from './assets/images/info.png'
import talkIcon from './assets/images/talk.png'
import bookIcon from './assets/images/book.png'
import statsIcon from './assets/images/graph.png'

const UI_ICONS = [
  statsIcon, fireIcon, notesIcon, questionIcon,
  questionSignIcon, quoteIcon, brokenPlateIcon,
  infoIcon, talkIcon, bookIcon
]

function App() {


  useEffect(() => {
    //Preload images for all characters to ensure they display quickly when needed
    Object.values(characters).forEach(character => {
      const img = new Image()
      img.src = character.image
    })

     // Preload UI icons
      UI_ICONS.forEach(src => {
        const img = new Image()
        img.src = src
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