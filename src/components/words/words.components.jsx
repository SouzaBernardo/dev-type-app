import { useState, useEffect } from "react"
import { MOCK_DATA } from "../../util/constant"
import "./style.css"

export function Words({ language }) {
    const { words } = MOCK_DATA
    const [current, setCurrent] = useState(0)
    const [currentWord, setCurrentWord] = useState(words[current])


    useEffect(() => {
        function handleKeyDown({key}) {
            if (key === ' ') console.log("next word? yes update current word, or else check error" + key)
            else console.log("oi" + key)
        }
        
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [current])

    return ( 
        <section>
            <ul className="words">
            {
                words.map((word, index) => 
                    <li key={index} className="word">
                        {word}
                    </li>
                )     
            }
            </ul>
        </section>
    )
}