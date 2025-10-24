import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Importamos los estilos
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Envolvemos App con el Router */}
    <Router>
      <App />
    </Router>
  </StrictMode>,
)