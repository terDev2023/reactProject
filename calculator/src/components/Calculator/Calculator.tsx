import styles from './Calculator.module.css';
import { ModalActivator } from '@/atoms/ModalActivator';
import { CalculatorButton } from '@/atoms/calculatorsAtoms/CalculatorButton';
import { CalculatorInput } from '@/atoms/calculatorsAtoms/CalculatorInput';
import { useCalculaytorContext } from '@/context/CalculatorContext';

const Calculator = () => {
  const { onSetValueCalculator, calculator } = useCalculaytorContext();

  const {
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
  } = calculator;

  const newHandlerEqualClick = handlerEqualClick(onSetValueCalculator);

  return (
    <div>
      {!calculatorActive.state && (
        <ModalActivator
          buttonText='Open calculator'
          onClick={handlerOpenCalculatorClick}
          className={`${styles.glowOnHover} ${styles.active}`}
        />
      )}
      {calculatorActive.state && (
        <div className={styles.calculator}>
          <CalculatorInput value={String(value)} onChange={handlerChange} />
          <div className={styles.calculatorsButtons}>
            <div className={styles.calculatorsButtonsRow}>
              <CalculatorButton text='C' onClick={handlerCClick} />
              <CalculatorButton text='%' onClick={handlerClick} />
              <CalculatorButton text='reset' onClick={handlerResetClick} />
              <CalculatorButton text='/' onClick={handlerClick} />
            </div>
            <div className={styles.calculatorsButtonsRow}>
              <CalculatorButton text='7' onClick={handlerClick} />
              <CalculatorButton text='8' onClick={handlerClick} />
              <CalculatorButton text='9' onClick={handlerClick} />
              <CalculatorButton text='*' onClick={handlerClick} />
            </div>
            <div className={styles.calculatorsButtonsRow}>
              <CalculatorButton text='4' onClick={handlerClick} />
              <CalculatorButton text='5' onClick={handlerClick} />
              <CalculatorButton text='6' onClick={handlerClick} />
              <CalculatorButton text='-' onClick={handlerClick} />
            </div>
            <div className={styles.calculatorsButtonsRow}>
              <CalculatorButton text='1' onClick={handlerClick} />
              <CalculatorButton text='2' onClick={handlerClick} />
              <CalculatorButton text='3' onClick={handlerClick} />
              <CalculatorButton text='+' onClick={handlerClick} />
            </div>
            <div className={styles.calculatorsButtonsRow}>
              <CalculatorButton text='00' onClick={handlerClick} />
              <CalculatorButton text='0' onClick={handlerClick} />
              <CalculatorButton text='.' onClick={handlerPointClick} />
              <CalculatorButton text='=' onClick={newHandlerEqualClick} disabled={isEqualDisabled} />
            </div>
          </div>
          <ModalActivator
            buttonText='Close calculator'
            onClick={handlerOpenCalculatorClick}
            className={`${styles.glowOnHover} ${styles.active}`}
          />
          {isMoreThenMillion.state && <p> The number in calculator is more, then 1 000 000</p>}
        </div>
      )}
    </div>
  );
};

export default Calculator;
