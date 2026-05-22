import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import Home from './pages/home/index.jsx'
import Cadastro from './pages/cadastro/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrouserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrouserRouter>
  </StrictMode>,
)
