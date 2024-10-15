import { useState, useEffect } from "react"
import "./style.css"


export function Words({words = [], language, isTyping, setIsTyping, canType, resetGame }) {
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
        function handleKeyDown({key}) {
            if (!canType) return
            if(!isTyping) setIsTyping()
            if('Backspace' === key) operations[key]()
            else if((/[a-zA-Z]/g.test(key) || ' ' === key || '-' === key) && key.length === 1) operations['regex'](key)
            else operations[key](key)
        }

        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [current, userWord])
    
    function nextWord() {
        const next = words[current + 1]
        setCurrent(current + 1)
        setCurrentWord(next)
        setUserWord("")
        setHistory(old => ([...old, userWord]))
    }

    function deleteWord() {
        if(userWord === "") {
            const previous = current !== 0 ? current - 1 : current
            setCurrent(previous)
            setCurrentWord(words[previous])
            setCurrentKey(0)
            if(history.length > 0)
                setHistory(old => old.slice(0, -1))
        } else {
            const previous = currentKey !== 0 ? currentKey - 1 : currentKey
            setCurrentKey(previous)
            setUserWord(old => old.slice(0, -1))
        }
    }

    function handleUserWord(key) {
        if(userWord.length === currentWord.length) {
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
        if(!canType) {
            resetGame()
            setHistory([])
            setUserWord("")
            setCurrent(0)
            setCurrentKey(0)
            setCurrentWord(words[0])
        }
    }

    return ( 
        <>
            <section>
                <ul className="words">
                {
                    words?.map((word, index) => 
                        {
                            if(history[index]) {
                                return <li key={index} className="word">
                                {
                                    word.split("")
                                        .map((key, keyIndex) => {
                                            if(isCurrentWord(index)) return <span key={keyIndex} className={`key-${checkAnswer(keyIndex, key, index, history[index])}`}>{key}</span>
                                            return <span key={keyIndex} className={`key-${checkAnswer(keyIndex, key, index, history[index])}`}>{key}</span>
                                        })
                                }
                                </li>
                            }

                            return <li key={index} className={`word current-${isCurrentWord(index)}`}>
                            {
                                word.split("")
                                    .map((key, keyIndex) => {
                                        if(isCurrentWord(index)) return <span key={keyIndex} className={`key-${checkAnswer(keyIndex, key, index, userWord)}`}>{key}</span>
                                        return <span key={keyIndex} className={`key-${checkAnswer(keyIndex, key, index, userWord)}`}>{key}</span>
                                    })
                            }
                            </li>
                        })     
                }</ul>
            </section>
            <button onClick={handleResetGame}>refresh</button>
        </>
    )
}