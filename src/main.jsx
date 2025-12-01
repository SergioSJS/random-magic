import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { registerSW } from './utils/registerSW'
import './index.css'

// Registrar Service Worker para PWA
registerSW()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

