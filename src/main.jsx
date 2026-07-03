import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DemoProvider } from './store/DemoContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DemoProvider>
        <App />
      </DemoProvider>
    </BrowserRouter>
  </StrictMode>,
)
