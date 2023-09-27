import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useBool from '@/hooks/useBool';
import { Button } from '@/atoms/Button';
import { ModalActivator } from '@/atoms/ModalActivator';
import { Input } from '@/atoms/Inputs/baseInput';
import { ModalButton } from '@/atoms/ModalButton';
import styles from './NewModalWindow.module.css';

interface IProps {
  buttonText: string;
  firstRowText?: string;
  secondRowText?: string;
  firstRowPlaceholder?: string;
  secondRowPlaceholder?: string;
  onSubmit: (args: Record<string, string>) => void;
  onSubmitFirstRowChek?: (e: string) => boolean;
  onSubmitSecondRowChek?: (e: string) => boolean;
}

export const NewModalWindow = (props: IProps) => {
  const {
    buttonText,
    firstRowText = '',
    secondRowText = '',
    firstRowPlaceholder = '',
    secondRowPlaceholder = '',
    onSubmit,
    onSubmitFirstRowChek = () => false,
    onSubmitSecondRowChek = () => false,
  } = props;
  
  const isModalActive = useBool();
  const isRightFirstRow = useBool()
  const isRightSecondRow = useBool()

  const [firstRow, setFirstrow] = useState(firstRowText);
  const [secondRow, setSecondRow] = useState(secondRowText);

  const handlerActivatorClick = useCallback(() => {
    setFirstrow(firstRowText);
    setSecondRow(secondRowText);
    isModalActive.onTrue();
  }, [firstRowText, secondRowText]);

  const handlerSubmit = () => {
    isModalActive.onFalse();
    onSubmit({ firstRow, secondRow });
    setFirstrow('');
    setSecondRow('');
  };

  const handlerFirstRowChange = useCallback((element: React.ChangeEvent<HTMLInputElement>) => {
    const value = element.target.value;
    setFirstrow(value);
  }, []);
  
  const handlerSecondRowChange = useCallback((element: React.ChangeEvent<HTMLInputElement>) => {
    const value = element.target.value as string;
    setSecondRow(value);
  }, []);

  const handlerCrossClick = useCallback(() => {
    isModalActive.onFalse();
  }, []);

  useEffect( () => {
    if (onSubmitFirstRowChek(String(firstRow))) isRightFirstRow.onTrue()
    else isRightFirstRow.onFalse() 
    if (onSubmitSecondRowChek(String(secondRow))) isRightSecondRow.onTrue()
    else isRightSecondRow.onFalse() 
  }, [firstRow, secondRow])

  return (
    <div>
      {!isModalActive.state && (
        <ModalActivator
          buttonText={buttonText}
          onClick={handlerActivatorClick}
          className={styles.modalWindowActivator}
        />
      )}
      {isModalActive.state && (
        <div className={styles.modalWindow}>
          <ModalButton className={styles.cross} img='/cross.svg' alt='cross' onClick={handlerCrossClick} />
          <Input type='text' placeholder={firstRowPlaceholder} onChange={handlerFirstRowChange} value={firstRow} />
          <Input
            type='text'
            placeholder={secondRowPlaceholder}
            onChange={handlerSecondRowChange}
            value={String(secondRow)}
          />
          <Button text={buttonText} onClick={handlerSubmit} disabled={!(isRightFirstRow.state && isRightSecondRow.state)} />
        </div>
      )}
    </div>
  );
};
