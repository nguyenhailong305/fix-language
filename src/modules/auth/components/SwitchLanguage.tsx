import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLocale } from '../../intl/redux/intlReducer'

const lang = [
    {
        title: "Tiếng Việt",
        value: "vi"
    },
    {
        title: "English",
        value: "en"
    },
]



const SwitchLanguage = () => {
    const dispatch = useDispatch()
    
    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLocale(e.target.value));

    }

    // const currentLang = localStorage.getItem()
    return (
        <div>
            <select
                className='form-control'
                style={{
                    position: "fixed",
                    top: 10,
                    right: 10,
                    maxWidth: "200px"
                }}
                value={localStorage.getItem('lang') || "en"}
                onChange={changeLanguage}
            >
                {lang.map((value, index: number) => (
                    <option key={index} value={value.value}>{value.title}</option>
                ))}
            </select>
        </div>
    )
}

export default SwitchLanguage