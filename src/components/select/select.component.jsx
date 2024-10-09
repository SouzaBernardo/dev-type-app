import { LANGUAGE_OPTIONS } from "../../util/constant"

export function Select() {
    return (
        <select name="languages" id="languages">
            {
                LANGUAGE_OPTIONS.map((lang, index) => 
                    <option key={index} value={lang}>{lang}</option>)
            }
        </select>
    )
}