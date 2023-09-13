import React, { createContext, useContext, ReactElement, useState, useCallback, Dispatch, SetStateAction, useEffect } from 'react';
import useCalculator from '@/hooks/useCalculator';
import { useAppContext } from './AppConext';

interface IProps {
    children: ReactElement | ReactElement[]; 
  }
  
  interface IContext {
    onChangeValueCalculator: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSetValueCalculator: (value: string) => void
    valueCalculator: string | number
    calculator: any
  }

  
  const CalculatorContext = createContext({} as IContext);

  export const useCalculaytorContext = () => useContext(CalculatorContext);

  export const CalculatorContextProvider = (props: IProps) => {
    const { children } = props;
   
    const {onChangeCalculatorValue} = useAppContext()
    const calculator  = useCalculator({getCalculatorValue: onChangeCalculatorValue});
    const [valueCalculator, setValueCalculator] = useState('');
  
    const handlerChangeValueCalculator = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setValueCalculator(e.target.value);
    }, []);

    const handlerSetValueCalculator = useCallback((value:string) => {
      setValueCalculator(value)
    }, []);

    useEffect(() => {
      console.log('HERE', calculator.value);
    }, [calculator.value])
  
    return (
     <CalculatorContext.Provider value={{
      onChangeValueCalculator: handlerChangeValueCalculator,
      onSetValueCalculator: handlerSetValueCalculator,
      valueCalculator: valueCalculator,
      calculator: calculator
     }}>
        {children}
     </CalculatorContext.Provider>
    )
  }