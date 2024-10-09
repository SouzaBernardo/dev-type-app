import { useState } from 'react'
import { Select, Words } from './components'

import './App.css'

function App() {  

  const [language, setLanguage] = useState("JavaScript")
  const [showSelect, setShowSelect] = useState(false)


  function handleLanguage(lang) {
    setLanguage(lang)
    setShowSelect(false)
  }

  return (
    <div className='background'>
      <header>
        <h1>DevType</h1>
        <div>
          <button>color</button>
          <button>seconds</button>
        </div>
      </header>
      <h2>
        <button onClick={() => setShowSelect(true)}>{language}</button>
      </h2>
      <Select visible={showSelect} onChange={handleLanguage}/>
      <Words language={language}/>
    </div>
  )
}

export default App
