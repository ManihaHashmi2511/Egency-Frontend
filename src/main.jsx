import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './media.css'
import './Admin/Admin.css'
import App from './App.jsx'
import Aos from 'aos'
import 'aos/dist/aos.css'


Aos.init({
  duration: 800,
  once: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
