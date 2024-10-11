import { useState, useEffect } from "react"
import { MOCK_DATA } from "../../util/constant"
import "./style.css"


export function Words({ language }) {
    const { words } = MOCK_DATA
    const [current, setCurrent] = useState(0)
    const [currentWord, setCurrentWord] = useState(words[current])
    const [currentKey, setCurrentKey] = useState(0)
    const [userWord, setUserWord] = useState("")
    const [history, setHistory] = useState({})

    const operations = {
        undefined: (key) => console.log('oi'),
        'Backspace': deleteWord,
        'regex': handleUserWord,
    }
    
    useEffect(() => {
        function handleKeyDown({key}) {
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
        setHistory(old => ({...old, [current]: userWord}))
    }

    function deleteWord() {
        if(userWord === "") {
            const previous = current !== 0 ? current - 1 : current
            setCurrent(previous)
            setCurrentWord(words[previous])
            setCurrentKey(0)
        } else {
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
        if (current <= wordIndex) return ""
        if (word[keyIndex] === key) return "ok"
        return 'wrong'
    }

    return ( 
        <section>
            {userWord}
            {currentKey}
            <ul className="words">
            {
                // current + userWord.lenght => current lettle
                words.map((word, index) => 
                    {
                        if(history[index]) {
                            return <li key={index} className="word">
                            {
                                word.split("")
                                    .map((key, keyIndex) => {
                                        if(isCurrentWord(index)) {
                                            return <span key={keyIndex}
                                                className={`key-${checkAnswer(keyIndex, key, index, history[index])}`}>{key}</span>
                                        }
                                        return <span 
                                                    key={keyIndex} 
                                                    className={`key-${checkAnswer(keyIndex, key, index, history[index])}`}>
                                                    {key}
                                                </span>
                                    })
                            }
                            </li>
                        }

                        return <li key={index} className={`word current-${isCurrentWord(index)}`}>
                        {
                            word.split("")
                                .map((key, keyIndex) => {
                                    if(isCurrentWord(index)) {
                                        return <span key={keyIndex}
                                            className={`key-${checkAnswer(keyIndex, key, index, userWord)}`}>{key}</span>
                                    }
                                    return <span 
                                                key={keyIndex} 
                                                className={`key-${checkAnswer(keyIndex, key, index, userWord)}`}>
                                                {key}
                                            </span>
                                })
                        }
                        </li>
                    }
                )     
            }
            </ul>
        </section>
    )
}