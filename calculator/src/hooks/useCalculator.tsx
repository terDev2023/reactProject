import useBool from '@/hooks/useBool';
import React, { useEffect, useState, useMemo, useCallback } from 'react';

interface IArgs {
  getCalculatorValue: (e: string) => void;
}

const useCalculator = (args: IArgs) => {
  const { getCalculatorValue } = args;
  const isMoreThenMillion = useBool();
  const calculatorActive = useBool();

  const [value, setValue] = useState<string | number>('');

  const handlerClick = (element: React.MouseEvent<HTMLButtonElement>) => {
    const target = element.target as HTMLButtonElement;
    const buttonValue = target.innerHTML;

    if (value === '') {
      setValue(buttonValue);
    } else {
      if (Number(buttonValue) || buttonValue === ('%' || '.') || Number(buttonValue) === 0) {
        const lastNum = String(value).split(' ');
        if (lastNum[lastNum.length - 1].includes('%')) setValue(value);
        else setValue(value + buttonValue);
      } else setValue(value + ' ' + buttonValue + ' ');
    }
    if (String(value) === 'Infinity' || String(value) === '-Infinity') setValue('');
  };

  const handlerEqualClick = (onSetValueCalculator: (e: string) => void) => {
    return () => {
      const result = eval(String(value));

      setValue(result);

      onSetValueCalculator(String(result));
      getCalculatorValue(String(result))
    };
  };

  const handlerPointClick = (element: React.MouseEvent<HTMLButtonElement>) => {
    const target = element.target as HTMLButtonElement;
    const buttonValue = target.innerHTML;

    const lastNum = String(value).split(' ');

    lastNum[lastNum.length - 1].includes('.') || lastNum[lastNum.length - 1].includes('%')
      ? setValue(value)
      : setValue(value + buttonValue);
    if (String(value) === 'Infinity' || String(value) === '-Infinity') setValue('');
  };

  const handlerCClick = useCallback(() => {
    setValue('');
  }, []);

  const handlerResetClick = () => {
    if (typeof value === 'number' || String(value) === 'Infinity' || String(value) === '-Infinity') setValue('');
    else if (value[value.length - 1] !== ' ') setValue(value.slice(0, -1).trim());
    else setValue(value.slice(0, -3).trim());
  };

  const handlerChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = element.target.value;
    const re = /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/;
    if (re.test(inputValue)) setValue(inputValue);
  };

  const handlerOpenCalculatorClick = () => {
    calculatorActive.onToggle();
  };

  useEffect(() => {
    if (Number(value) > 1000000) isMoreThenMillion.onTrue();
    else isMoreThenMillion.onFalse();
  }, [value]);

  const isEqualDisabled = useMemo(() => {
    try {
      eval(String(value));
      return false;
    } catch {
      return true;
    }
  }, [value]);

  return {
    value,
    handlerClick,
    handlerEqualClick,
    isEqualDisabled,
    handlerPointClick,
    handlerCClick,
    handlerResetClick,
    handlerChange,
    handlerOpenCalculatorClick,
    isMoreThenMillion,
    calculatorActive,
  };
};

export default useCalculator;
