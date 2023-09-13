import React from 'react'
import styles from './CalculatorInput.module.css'

interface IProps {
    onChange?: (element: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    pattern?: string
 }
 
 const CalculatorButton = (props: IProps) => {
     const {onChange, value, pattern} = props
 
     return (
        <input className={styles.calculatorInput} onChange={onChange} value={value} pattern={pattern}/>
     )
 }
 
 export default CalculatorButton