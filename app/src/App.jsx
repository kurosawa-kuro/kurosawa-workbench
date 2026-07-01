import { MotionConfig } from 'motion/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Top from './pages/Top'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Top />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MotionConfig>
  )
}
