import React, { useState, useEffect, useMemo } from 'react';
import useBool from '@/hooks/useBool';
import { Button } from '@/atoms/Button';
import { ModalActivator } from '@/atoms/ModalActivator';
import { Input } from '@/atoms/Inputs/baseInput';
import { ModalButton } from '@/atoms/ModalButton';
import { useLoginFormContext } from '@/context/LoginFormContext';
import styles from './ModalWindow.module.css';

const ModalWindow = () => {
  const isModalActive = useBool();
  const isInCorrectPassword = useBool();
  const hasPasswordAndLogin = useBool();

  // const [value, setValue] = useState('');
  const [paswordValue, setPasswordValue] = useState('');

  const { handlerChangeLogin, loginValue, setLoginValue } = useLoginFormContext();

  let styleModal = isModalActive.state ? `${styles.modalWindow} ${styles.active}` : `${styles.modalWindow}`;
  let styleOfModalActivator = !isModalActive.state
    ? `${styles.modalWindowActivator} ${styles.active}`
    : `${styles.modalWindowActivator}`;

  

  const handleActivatorClick = () => {
    isModalActive.onTrue();
    setLoginValue('');
    setPasswordValue('');
    isInCorrectPassword.onFalse()
    hasPasswordAndLogin.onFalse()
  };

  const handleCrossClick = () => {
    isModalActive.onFalse();
  };

  const handlerLoginChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = element.target.value;
    const re = /^[a-z]+$/g;
    if (re.test(inputValue) || inputValue === '') {
      handlerChangeLogin(element)
    }
  };

  const handlerPasswordChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = element.target.value;
    setPasswordValue(inputValue);
  };

  const handlerSubmit = () => {
    isModalActive.onFalse();
    if (loginValue && paswordValue) {
      hasPasswordAndLogin.onTrue();
    }
  };

  const isCorrectLoginAndPassword = useMemo(() => {
    if (loginValue && !isInCorrectPassword.state){
        return false
    } else {
        return true
    }
  }, [loginValue, isInCorrectPassword.state])

  useEffect(() => {
    const re1 = /[A-Z]/g;
    const re2 = /[0-9]/g;
    if (paswordValue.match(re1) === null || paswordValue.match(re2) === null) {
      isInCorrectPassword.onTrue();
    } else {
      isInCorrectPassword.onFalse();
    }
  }, [paswordValue]);

  return (
    <div>
      <div className={styles.inputActivator}>
        <ModalActivator buttonText='Log in' onClick={handleActivatorClick} className={styleOfModalActivator} />
        {hasPasswordAndLogin.state && (
          <div>
                <p>{loginValue}</p>
                <p>{paswordValue}</p>
          </div>
        )}
      </div>
      <div className={styleModal}>
        <div className={styles.cross}>
          <ModalButton img='/cross.svg' alt='cross' onClick={handleCrossClick} />
        </div>
        <Input type='text' placeholder='login' onChange={handlerLoginChange} inputStyle={styles.login} value={loginValue} />
        <Input
          type='text'
          placeholder='password'
          value={paswordValue}
          inputStyle={styles.password}
          onChange={handlerPasswordChange}
        />
        {isInCorrectPassword.state && <p>Passwored has to have one Uppercase letter and one number</p>}
        <Button text='Log in' onClick={handlerSubmit} disabled={isCorrectLoginAndPassword}/>
      </div>
    </div>
  );
};

export default ModalWindow;
