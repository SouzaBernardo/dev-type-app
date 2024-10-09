import { useState } from 'react'
import { Select, Words } from './components'

import './App.css'

function App() {  

  const [language, setLanguage] = useState("JavaScript")


  return (
    <>
      <p>{language}</p>
      <Select onChange={setLanguage}/>
      <Words language={language}/>
    </>
  )
}

export default App
