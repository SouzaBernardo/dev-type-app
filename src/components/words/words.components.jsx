import { useState } from "react"
import { MOCK_DATA } from "../../util/constant"
import "./style.css"

export function Words() {
    const { words } = MOCK_DATA
    const [current, setCurrent] = useState(0)

    return ( 
        <section>
            <ul className="words">
            {
                words.map(word => 
                    <li className="word">
                        {word}
                    </li>
                )     
            }
            </ul>
        </section>
    )
}