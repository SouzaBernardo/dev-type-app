import { useState, useEffect } from "react"
import "./style.css"


export function Words({
    words = [],
    isCurrentWord,
    checkAnswer,
    userWord,
    history,
    canType,
    isTyping,
    operations,
    current,
    setIsTyping
}) {

    useEffect(() => {
        function handleKeyDown(event) {
            event.preventDefault()
            const { key } = event
            if (!canType) return
            if (!isTyping) setIsTyping()
            if ('Backspace' === key) operations[key]()
            else if ((/[a-zA-Z]/g.test(key) || ' ' === key || '-' === key) && key.length === 1) operations['regex'](key)
            else operations[key](key)
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [current, userWord])

    return (
        <>
            <section>
                <ul className="words">
                    {
                        words?.map((word, index) => {
                            if (history[index]) {
                                return <li key={index} className="word">
                                    {
                                        word.split("")
                                            .map((key, keyIndex) => {
                                                if (isCurrentWord(index)) return <span key={keyIndex} className={`key-${checkAnswer(keyIndex, key, index, history[index])}`}>{key}</span>
                                                return <span key={keyIndex} className={`key-${checkAnswer(keyIndex, key, index, history[index])}`}>{key}</span>
                                            })
                                    }
                                </li>
                            }

                            return <li key={index} className={`word current-${isCurrentWord(index)}`}>
                                {
                                    word.split("")
                                        .map((key, keyIndex) => {
                                            if (isCurrentWord(index)) return <span key={keyIndex} className={`key-${checkAnswer(keyIndex, key, index, userWord)}`}>{key}</span>
                                            return <span key={keyIndex} className={`key-${checkAnswer(keyIndex, key, index, userWord)}`}>{key}</span>
                                        })
                                }
                            </li>
                        })
                    }</ul>
            </section>
        </>
    )
}