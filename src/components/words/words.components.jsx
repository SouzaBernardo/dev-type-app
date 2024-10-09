import { useState, useEffect } from "react"
import { MOCK_DATA } from "../../util/constant"
import "./style.css"

export function Words({ language }) {
    const { words } = MOCK_DATA
    const [current, setCurrent] = useState(0)
    const [currentWord, setCurrentWord] = useState(words[current])

    
    useEffect(() => {
        function handleKeyDown({key}) {
            if (key === ' ') nextWord()
            else console.log("oi" + key)
        }
        
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [current])
    
    function nextWord() {
        if (current + 1 < words.length) {
            const next = words[current + 1]
            setCurrent(current + 1)
            setCurrentWord(next)
        }
    }

    function isCurrentWord(word) {
        return word.toLowerCase() === currentWord.toLowerCase()
    }

    return ( 
        <section>
            {currentWord}
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