import { MotionConfig } from 'motion/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Top from './pages/Top'
import Services from './pages/Services'
import AiConsult from './pages/AiConsult'
import Career from './pages/Career'
import Cases from './pages/Cases'
import Contact from './pages/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ai-consult" element={<AiConsult />} />
          <Route path="/career" element={<Career />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MotionConfig>
  )
}
