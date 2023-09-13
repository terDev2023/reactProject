import React, { useState, useEffect, useRef} from "react";
import { Input } from "@/atoms/Inputs/baseInput";
import styles from '../../atoms/Inputs/baseInput/input.module.css'
import useDebouns from "@/hooks/useDebouns";

interface IProps {
    placeholder?: string | number
}

const PageInput = (props: IProps) => {
    const {placeholder} = props
    
    const [isActive, setIsActive] = useState(false)

    const [value, setValue] = useState('');

    let buttonStyle = isActive ? `${styles.inputButton} ${styles.active}` : `${styles.inputButton}`;

    const handlerFocus =() => {
        setIsActive(true)
    }
    const handlerBlur =() => {
        setIsActive(false)
    }
    const handlerChange = (element: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = element.target.value
        setValue(inputValue)
    }
    const handlerClick = () => {
        setValue('')
    }

    useDebouns(value)

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (inputRef.current) inputRef.current.style.backgroundColor = 'white'
    }, [])
    

    return <Input type='text' onFocus={handlerFocus} onBlur={handlerBlur} onClick={handlerClick}
    onChange={handlerChange} buttonStyle={buttonStyle} value={value} placeholder={String(placeholder)} text='Reset'
    ref={inputRef}/>
}

export default PageInput