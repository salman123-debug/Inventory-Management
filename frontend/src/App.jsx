
import './App.css'
import Home from './Components/Home'
import { useState } from 'react'
function App() {
const  [theme,setTheme]=useState("light")
  return (
    <div className="container">
      <Home theme={theme} setTheme={setTheme} />
      </div>
  )
}

export default App
