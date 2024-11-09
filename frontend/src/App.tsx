import { BrowserRouter } from 'react-router-dom';
import { RuteoCompleto } from './app/utils/routers/RuteoCompleto'
import { Suspense } from 'react';
import './App.css'

function App() {
  const cargando = (
    <div className="loader-background"><i className="loader fa-solid fa-spinner fa-spin-pulse"></i></div>
  )
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={cargando}>
          <RuteoCompleto />
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
