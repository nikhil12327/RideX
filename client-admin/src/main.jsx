import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster }
from "react-hot-toast";
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster

  position="top-center"

  toastOptions={{

    style: {

      background: "#18181b",

      color: "#fff",

      border:
        "1px solid #27272a",

      borderRadius: "16px"

    }

  }}

/>
  </StrictMode>,
)
