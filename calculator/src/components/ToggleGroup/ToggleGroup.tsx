import React, { useState, useCallback } from "react";
import { Button } from "@/atoms/Button";
// Две кнпки, одна из которых по дефолту задизаблена.Они переключают состояние дизеблд у друг друга.
// изспользовать useState and useCallback
// свой хук useBool;


const ToggleGroup = () => {
    const [isOneButtonActive, setIsOneButtonActive] = useState(true)
    const [isSecondButtonActive, setIsSecondButtonActive] = useState(true)
    
    const toggleOneButtonActive = useCallback(()=> {
        isSecondButtonActive === true ? setIsOneButtonActive(false) : setIsOneButtonActive(true)
    }, [isSecondButtonActive])

    const toggleSecondButtonActive = useCallback(()=> {
        isOneButtonActive === true ? setIsSecondButtonActive(false) : setIsSecondButtonActive(true)
    }, [isOneButtonActive])

    return (
        <div className="buttons">
            <Button text='One' onClick={toggleOneButtonActive}/>
            <Button disabled={false} text='Two' onClick={toggleSecondButtonActive}/>            
        </div>
    )
}

export default ToggleGroup