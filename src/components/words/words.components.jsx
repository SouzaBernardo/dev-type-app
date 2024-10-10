import { useState, useEffect } from "react"
import { MOCK_DATA } from "../../util/constant"
import "./style.css"


export function Words({ language }) {
    const { words } = MOCK_DATA
    const [current, setCurrent] = useState(0)
    const [currentWord, setCurrentWord] = useState(words[current])
    const [userWord, setUserWord] = useState("")

    const operations = {
        ' ': nextWord,
        undefined: (key) => console.log('oi'),
        'Backspace': deleteWord,
        'regex': handleUserWord,
    }
    
    useEffect(() => {
        function handleKeyDown({key}) {
            if('Backspace' === key) operations[key]()
            else if(/[a-zA-Z]/g.test(key) && 'Backspace' !== key) operations['regex'](key)
            else operations[key](key)
        }

        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [current, userWord])
    
    function nextWord() {
        if (current + 1 < words.length) {
            const next = words[current + 1]
            setCurrent(current + 1)
            setCurrentWord(next)
        }
    }

    function deleteWord() {
        console.log(userWord)
        if(userWord === "") {
            const previous = current !== 0 ? current - 1 : current
            setCurrent(previous)
            setCurrentWord(words[previous])
        } else {
            setUserWord(old => old.slice(0, -1))
        }
    }

    function handleUserWord(key) {
        setUserWord(old => `${old}${key}`)
    }

    function isCurrentWord(word) {
        return word.toLowerCase() === currentWord.toLowerCase()
    }

    return ( 
        <section>
            {userWord}
            <ul className="words">
            {
                words.map((word, index) => 
                    <li key={index} className={`word current-${isCurrentWord(word)}`}>
                        {word}
                    </li>
                )     
            }
            </ul>
        </section>
    )
}