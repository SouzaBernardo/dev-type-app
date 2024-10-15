import { useState } from 'react'
import { Select, SelectorSeconds, Words } from './components'

import './App.css'
import { useEffect } from 'react'
import { MOCK_DATA } from './util/constant'

function App() {  

  const [language, setLanguage] = useState("JavaScript")
  const [words, setWords] = useState(MOCK_DATA)
  const [showSelect, setShowSelect] = useState(false)
  const [seconds, setSeconds] = useState(30)
  const [isTyping, setIsTyping] = useState(false)
  const [maxTimeToType, setMaxTimeToType] = useState(30)
  const [endGame, setEndGame] = useState(false)
  const [canType, setCanType] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if(isTyping && seconds <= maxTimeToType && seconds > 0) setSeconds(prevSeconds => prevSeconds - 1)
      else if(seconds <= 0) handleEndGame()
    }, 1000)

    return () => clearInterval(interval)
  }, [isTyping, seconds, maxTimeToType]);


  function handleLanguage(lang) {
    setLanguage(lang)
    setShowSelect(false)
  }

  function handleEndGame() { 
    setEndGame(true)
    setCanType(false)
  }

  function handleResetGame() {
    setCanType(true)
    setEndGame(false)
    setIsTyping(false)
    setSeconds(maxTimeToType)
  }

  function handleSeconds(value){
    setMaxTimeToType(value)
    setSeconds(value)
    setCanType(true)
    setEndGame(false)
    setIsTyping(false)
    setSeconds(value)
  }

  return (
    <div className='background container'>
      <header>
        <h1>DevType</h1>
        <div>
          <button>color</button>
          <SelectorSeconds seconds={seconds} setMax={handleSeconds}/>
        </div>
      </header>
      <h2>
        <button onClick={() => setShowSelect(true)}>{language}</button>
      </h2>
      <Select visible={showSelect} onChange={handleLanguage}/>
      <Words words={words.words} language={language} isTyping={isTyping} setIsTyping={() => setIsTyping(true)} canType={canType} resetGame={handleResetGame}/>
      { endGame && <p>fim</p> }
    </div>
  )
}

export default App
