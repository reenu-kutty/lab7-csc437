import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const DATA = [
    { id: "todo-0", name: "Eat" },
    { id: "todo-1", name: "Sleep" },
    { id: "todo-2", name: "Repeat" },
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA}/>
  </StrictMode>,
)
