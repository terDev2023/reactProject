import React, { createContext, useContext, ReactElement, useState, useCallback } from 'react';
import styles from './AppContext.module.css'

interface IProps {
  children: ReactElement | ReactElement[];
}

interface IContext {
    onChangeCalculatorValue: (e: string) => void
    lastValueOfCalculator: string
}

const AppContext = createContext({} as IContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props: IProps) => {
    const { children } = props;
  
    const [lastValueOfCalculator, setlastValueOfCalculator] = useState('');
  
    const handlerChangelastValueOfCalculator = useCallback((e: string) => {
        setlastValueOfCalculator(e);
    }, []);
  
    return (
     <AppContext.Provider value={{
        onChangeCalculatorValue: handlerChangelastValueOfCalculator,
        lastValueOfCalculator: lastValueOfCalculator
     }}>
        <div className={styles.lastValueOfCalculator}>
            {lastValueOfCalculator}
        </div>
        {children}
     </AppContext.Provider>
    )
  }