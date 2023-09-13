import React, { useState, useMemo } from "react";

interface IProps {
    type: string,
    className?: string
    pattern?: string,
    value?: string
    required?: boolean
    placeholder?: string
}

const ModalInput = (props: IProps) => {
    const {type, className, pattern, value, required, placeholder} = props


    return (
        <div>
            <input type={type} pattern={pattern} value={value} required={required} placeholder={placeholder} className={className}/>
        </div>
    )
}

export default ModalInput