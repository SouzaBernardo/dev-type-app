import { useState } from "react"
import { LANGUAGE_OPTIONS } from "../../util/constant"

import './style.css'

export function Select({ visible = false, onChange}) {
    const [textValue, setTextValue] = useState("")
    const [languages, setLanguages] = useState(LANGUAGE_OPTIONS)

    function handleInput({target}) {
        setTextValue(target.value)
        setLanguages(LANGUAGE_OPTIONS.filter( current => current.toLowerCase().includes(target.value)))
    }

    return (
        <div className={`modal-languages-${visible}`}>
            <input 
                type="text"
                value={textValue}
                placeholder="Search" 
                onChange={handleInput}/>
            <ul 
                className="language-list"
                name="languages"
                id="languages" >                
                    {
                        languages.map((lang, index) => 
                            <li key={index} value={lang}>
                                <button onClick={() => onChange(lang)}>
                                    {lang}
                                </button>
                                
                            </li>
                        )
                    }
            </ul>
        </div>
    )
}