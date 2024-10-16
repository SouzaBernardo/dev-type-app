import { useState } from 'react'
import { Select, SelectorSeconds, Words } from './components'

import './App.css'
import { useEffect } from 'react'
import { MOCK_DATA } from './util/constant'

function App() {

  const [language, setLanguage] = useState("JavaScript")
  const [words, setWords] = useState(MOCK_DATA.words)
  const [showSelect, setShowSelect] = useState(false)
  const [seconds, setSeconds] = useState(30)
  const [isTyping, setIsTyping] = useState(false)
  const [maxTimeToType, setMaxTimeToType] = useState(30)
  const [endGame, setEndGame] = useState(false)
  const [canType, setCanType] = useState(true)

  const [current, setCurrent] = useState(0)
  const [currentWord, setCurrentWord] = useState(words[current])
  const [currentKey, setCurrentKey] = useState(0)
  const [userWord, setUserWord] = useState("")
  const [history, setHistory] = useState([])

  const operations = {
    undefined: (key) => console.log('oi'),
    'Backspace': deleteWord,
    'regex': handleUserWord,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping && seconds <= maxTimeToType && seconds >= 1) setSeconds(prevSeconds => prevSeconds - 1)
      else if (seconds <= 0 && isTyping) handleEndGame()
    }, 1000)

    return () => clearInterval(interval)
  }, [isTyping, seconds, maxTimeToType])

  function nextWord() {
    const next = words[current + 1]
    setCurrent(current + 1)
    setCurrentWord(next)
    setUserWord("")
    setHistory(old => ([...old, userWord]))
  }

  function deleteWord() {
    if (userWord === "") {
      const previous = current !== 0 ? current - 1 : current
      setCurrent(previous)
      setCurrentWord(words[previous])
      setCurrentKey(0)
      if (history.length > 0)
        setHistory(old => old.slice(0, -1))
    } else {
      const previous = currentKey !== 0 ? currentKey - 1 : currentKey
      setCurrentKey(previous)
      setUserWord(old => old.slice(0, -1))
    }
  }

  function handleUserWord(key) {
    if (userWord.length === currentWord.length) {
      nextWord()
      setCurrentKey(0)
    } else {
      setCurrentKey(old => old + 1)
      setUserWord(old => `${old}${key}`)
    }
  }

  function isCurrentWord(index) {
    return current === index
  }

  function checkAnswer(keyIndex, key, wordIndex, word) {
    if (isCurrentWord(wordIndex) && key === userWord[keyIndex]) return "ok"
    if (isCurrentWord(wordIndex) && key !== userWord[keyIndex] && userWord.length > keyIndex) return "wrong"
    if (current <= wordIndex) return ""
    if (word[keyIndex] === key) return "ok"
    return 'wrong'
  }

  function handleResetGame() {
    setHistory([])
    setUserWord("")
    setCurrent(0)
    setCurrentKey(0)
    setCurrentWord(words[0])
    setCanType(true)
    setEndGame(false)
    setIsTyping(false)
    setSeconds(maxTimeToType)
  }

  function handleLanguage(lang) {
    setLanguage(lang)
    setShowSelect(false)
  }

  function handleEndGame() {
    setEndGame(true)
    setCanType(false)
    setIsTyping(false)
  }

  function handleSeconds(value) {
    setMaxTimeToType(value)
    setSeconds(value)
    setCanType(true)
    setEndGame(false)
    setIsTyping(false)
    setSeconds(value)
    setCurrent(0)
    setHistory([])
    setUserWord("")
    setCurrentKey(0)
    setCurrentWord(words[0])
    setSeconds(value)
  }

  return (
    <div className='background container'>
      <header>
        <h1>DevType</h1>
        <div>
          <button>color</button>
          <SelectorSeconds seconds={seconds} setMax={handleSeconds} />
        </div>
      </header>
      <h2>
        <button onClick={() => setShowSelect(true)}>{language}</button>
      </h2>
      <Select visible={showSelect} onChange={handleLanguage} />
      <Words
        words={words}
        isCurrentWord={isCurrentWord}
        checkAnswer={checkAnswer}
        userWord={userWord}
        history={history}
        canType={canType}
        isTyping={isTyping}
        operations={operations}
        current={current}
        setIsTyping={() => setIsTyping(true)}
      />

      <button onClick={handleResetGame}>refresh</button>
      {endGame && <p>fim</p>}
    </div>
  )
}

export default App
