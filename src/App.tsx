import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Page } from './components/Sections'
import { ScrollManager } from './components/ScrollManager'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
