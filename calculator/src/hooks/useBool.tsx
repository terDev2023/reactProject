import React, { useState, useCallback } from "react";

const useBool = (val: boolean = false) => {

    const [state, setState] = useState(val)

    const onTrue = useCallback(() => {
        setState(true)
    }, [])
    const onFalse = useCallback(() => {
        setState(false)
    }, [])
    const onToggle = useCallback(() => {
        setState((prev) => !prev)
    }, [])
    
    return {
        state,
        onTrue,
        onFalse,
        onToggle,
    }
}    

export default useBool