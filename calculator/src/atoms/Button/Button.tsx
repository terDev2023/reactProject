import React, { useState, useMemo } from "react";
import styles from './button.module.css'

interface IProps {
   onClick?: () => void;
   disabled?: boolean;
   text?: string;
   textConsole?: string
}

const Button = (props: IProps) => {
    let {onClick, disabled, text, textConsole} = props;

    const handlerClick = () => {
        if (onClick) onClick()
        if (textConsole) console.log(textConsole)
        else return true
    }

    const buttonActiveClass = useMemo(() => {
        if (disabled) {
            return `${styles.glowOnHover}`
        }
        return  `${styles.glowOnHover} ${styles.active}`;
    }, [disabled])
    
    return(
        <div>
            <button disabled={disabled} onClick={handlerClick} className={buttonActiveClass}>
                {text}
            </button>
        </div>
    )
}

export default Button;
