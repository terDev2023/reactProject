import React, { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler } from 'react'
import styles from './CalculatorButton.module.css'

interface IProps {
   onClick?: (element: React.MouseEvent<HTMLButtonElement>) => void;
   text?: string;
   disabled?: boolean;
   class?: string
}

const CalculatorButton = (props: IProps) => {
    const {onClick, text, disabled} = props

    let style = disabled ? `${styles.calculatorButton} ${styles.disabled}` : `${styles.calculatorButton}`

    return (
        <button type="button" className={style} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default CalculatorButton