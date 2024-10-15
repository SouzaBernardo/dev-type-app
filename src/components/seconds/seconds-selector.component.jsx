import { useState } from 'react'
import './style.css'

const TIMES = [15, 30, 45, 60]

export function SelectorSeconds({seconds, setMax}) {
    
    const [show, setShow] = useState(false)

    function handleSeconds({target}) {
        const {value} = target
        setMax(parseInt(value))
        setShow(false)
    }

    return (
        <div className='selector-seconds'>
            <div className={`options show-${show}`}>
                {
                    TIMES.map(value => <button key={value} value={value} onClick={handleSeconds}>{value}</button>)
                }
            </div>
            <button onClick={() => setShow(old => !old)}> {seconds} seconds</button>
      </div>
    )
}