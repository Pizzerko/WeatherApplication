import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Search from './Search'
import SevenDay from './SevenDay'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/weather/" element={<Search /> } />
  </Routes>
  </BrowserRouter>
)
