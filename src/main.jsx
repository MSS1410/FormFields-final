import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/Form.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
)
