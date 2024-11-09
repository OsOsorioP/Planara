import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './assets/css/aside.css'
import './assets/css/dashboard.css'
import './assets/css/footer.css'
import './assets/css/forms.css'
import './assets/css/navbar.css'
import './assets/css/hero.css'
import './assets/css/notfount.css'
import './assets/css/task.css'

// Librerias importadas
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
