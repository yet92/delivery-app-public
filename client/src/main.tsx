import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ShopsContextWrapper } from './contexts/ShopsContext.tsx'
import { CartContextWrapper } from './contexts/CartContext.tsx'
import { MapsContextWrapper } from './contexts/MapsContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ShopsContextWrapper>
      <CartContextWrapper>
        <MapsContextWrapper>
          <App />
        </MapsContextWrapper>
      </CartContextWrapper>
    </ShopsContextWrapper>
  </React.StrictMode>
)
