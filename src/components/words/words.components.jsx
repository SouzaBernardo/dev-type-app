import { MOCK_DATA } from "../../util/constant"


export function Words() {
    const { words } = MOCK_DATA
    return ( 
        <section>
            <ul>
            {
                words.map(word => 
                    <li>
                        {word}
                    </li>
                )     
            }
            </ul>
        </section>
    )
}