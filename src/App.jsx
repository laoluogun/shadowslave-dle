import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import QuotePage from './pages/QuotePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quote" element={<QuotePage />} />
    </Routes>
  )
}
export default App