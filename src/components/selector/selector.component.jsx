import { useState } from 'react'
import './style.css'


export function Selector({ content, children }) {

    const [show, setShow] = useState(false)

    return (
        <div className='selector' onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)}>
            <div className={`options show-${show}`} >
                {children}
            </div>
            {content && <button>{content}</button>}
        </div>
    )
}