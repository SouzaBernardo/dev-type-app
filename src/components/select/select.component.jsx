import { LANGUAGE_OPTIONS } from "../../util/constant"

export function Select({onChange}) {
    return (
        <select 
            name="languages"
            id="languages"
            onChange={({target}) => onChange(target.value)}>
                {
                    LANGUAGE_OPTIONS.map((lang, index) => 
                        <option key={index} value={lang}>
                            {lang}
                        </option>
                    )
                }
        </select>
    )
}